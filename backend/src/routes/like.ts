import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { Prisma } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate'
import { authMiddleware } from '../middlewares/auth';

export const likeRouter =  new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
    Variables:{
        userId: string,
    }
}>();

likeRouter.use('/*', authMiddleware);




// UUID validation regex
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Fetch total likes for a post
likeRouter.get('/:blogId', async (c) => {
    const blogId = c.req.param('blogId');
    
    const userId = c.get('userId'); // Get userId from the context if needed
 
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate());

    console.log("after connecting to db");
    try {
        if (!uuidRegex.test(blogId)) {
            return c.json({ error: "Invalid blog ID format" }, 400);
        }

        const postExists = await prisma.post.findUnique({
            where: { id: blogId },
            select: { id: true },
        });
        if (!postExists) {
            return c.json({ error: "Post not found" }, 404);
        }

        const totalLikes = await prisma.like.count({
            where: { postId: blogId },
        });
        let likedbyUser = false;
        const userLike = await prisma.like.findFirst({
            where :{
                postId: blogId,
                userId: userId,
            }
        })
        if(userLike) {
            likedbyUser = true;
        }
        return c.json({
            msg: "Total likes fetched successfully",
            totalLikes,
            likedbyUser
        });
    } catch (error) {
        console.error("Error fetching likes:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});


// POST: Update like (toggle like/unlike)
likeRouter.post('/updateLike/:blogId/:userId', async (c) => {
  const { blogId, userId } = c.req.param()

  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())

  try {
    //  Wrap everything inside a single transaction
    const result = await prisma.$transaction(async (tx) => {
      // Check if user already liked this blog
      const alreadyLiked = await tx.like.findUnique({
        where: { postId_userId: { postId: blogId, userId: userId } },
      })

      let likedbyUser = false

      if (alreadyLiked) {
        // If already liked → remove it (unlike)
        await tx.like.delete({
          where: { postId_userId: { postId: blogId, userId: userId } },
        })
      } else {
        // If not liked → add like
        try {
          await tx.like.create({
            data: { postId: blogId, userId: userId },
          })
          likedbyUser = true
        } catch (err) {
          // Handle unique constraint race condition inside transaction
          if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
            likedbyUser = true
          } else {
            throw err
          }
        }
      }

      // Count likes (still inside the same transaction → guaranteed fresh value)
      const totalLikes = await tx.like.count({
        where: { postId: blogId },
      })

      // Return combined result
      return { likedbyUser, totalLikes }
    })

    //  Send back response after transaction commits
    return c.json({
      msg: result.likedbyUser ? "Like added successfully" : "Like removed successfully",
      totalLikes: result.totalLikes,
      likedbyUser: result.likedbyUser,
    })
  } catch (error) {
    console.error("Error updating like:", error)
    return c.json({ error: "Internal server error" }, 500)
  }
})
