import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
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

// POST: Update like (like/unlike)
likeRouter.post('/updateLike/:blogId/:userId', async (c) => {
    const { blogId, userId } = c.req.param();
    console.log("blogId:", blogId, "userId:", userId);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate());

  console.log("after connecting to db");
    try {
        // Validate UUIDs
        if (!uuidRegex.test(blogId) || !uuidRegex.test(userId)) {
            return c.json({ error: "Invalid blog ID or user ID format" }, 400);
        }

        // Verify post and user exist
        const postExists = await prisma.post.findUnique({
            where: { id: blogId },
            select: { id: true },
        });
        if (!postExists) {
            return c.json({ error: "Post not found" }, 404);
        }
        const userExists = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!userExists) {
            return c.json({ error: "User not found" }, 404);
        }

        // Check authentication 
        const authHeader = c.req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        // Add JWT verification logic here
        

        const alreadyLiked = await prisma.like.findFirst({
            where: { postId: blogId, userId: userId },
        });
        let likedbyUser = false;
        if (alreadyLiked) {
            await prisma.like.delete({
                where: {
                    postId_userId: { postId: blogId, userId: userId },
                },
            });
            const totalLikes = await prisma.like.count({
                where: { postId: blogId },
            });
            return c.json({
                msg: "Like removed successfully",
                totalLikes,
                likedbyUser
            });
        }

        const newLike = await prisma.like.create({
            data: { postId: blogId, userId: userId },
        });
        
        const totalLikes = await prisma.like.count({
            where: { postId: blogId },
        });
        likedbyUser = true;
        return c.json({
            msg: "Like added successfully",
            totalLikes,
            likedbyUser
        });
    } catch (error) {
        console.error("Error updating like:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});