import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { authMiddleware } from '../middlewares/auth';

export const commentRouter =  new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
    Variables:{
        userId: string,
    }
}>();

commentRouter.use('/*', authMiddleware);

commentRouter.get('/:blogId', async(c)=>{
    const postId = c.req.param('blogId');
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate());

    console.log("connected to db for comments");

    try{
        if(!postId){
            return c.json({
                msg:"Blog ID is required",
            })
        }
        const postExists = await prisma.post.findUnique({
            where:{
                id:postId,

            },
            select:{
                id:true,
            }
        })

        if(!postExists){
            return c.json({
                msg:"Post not found",
            },404)
        }
        const totalComments = await prisma.comment.count({
            where: { postId: postId },
        });
        console.log("Total comments for post:", totalComments);
        const comments = await prisma.comment.findMany(
            {
                where : {
                    postId: postId,
                },
                select:{
                    id:true,
                    content:true,
                    createdAt:true,
                    user:{
                        select:{
                            id:true,
                            name: true,
                            profileImg: true,
                        }
                    }
                }
            }
        )
        console.log(comments);
        return c.json({
            comments: comments,
            msg: "Comments fetched successfully",
            totalComments
        })
    }
    catch(error){
        console.error("Error fetching comments:", error);
        return c.json({ error: "Failed to fetch comments" }, 500);
    }
})

commentRouter.post('/:blogId',async(c)=>{
    const postId = c.req.param('blogId');
    const userId = c.get('userId');
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate());

    console.log("connected to db for comments");

    try{
        if(!postId){
            return c.json({
                msg:"Blog ID is required",
            })
        }
        const postExists = await prisma.post.findUnique({
            where:{
                id:postId,
            },
            select:{
                id:true,
            }
        })

        if(!postExists){
            return c.json({
                msg:"Post not found",
            },404)
        }

        if(!body.content || body.content.trim() === ''){
            return c.json({
                msg:"Content is required",
            },400)
        }

        const comment = await prisma.comment.create({
            data:{
                content: body.content,
                postId: postId,
                userId: userId,
            
            }
        })

        return c.json({
            comment: comment,
            msg: "Comment added successfully"
        })
    }
    catch(error){
        console.error("Error adding comment:", error);
        return c.json({ error: "Failed to add comment" }, 500);
    }

})