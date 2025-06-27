import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify,decode } from 'hono/jwt';
import { authMiddleware } from '../middlewares/auth';
import { createBlogInputs , updateBlogInputs } from '@geekypratham/blog-common';

export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
  Variables:{
    userId : string,
  }
}>();

// Middleware to check if the user is authenticated

// blogRouter.use('/*', async (c, next) => {
//   // get the Authorization header
//   // verify the header
//   // if header is pesent we will decode the token and get the user email
//   // if the header is not present we will return 403 Unauthorized
//   const authHeader = c.req.header('Authorization');
//   console.log("authHeader",authHeader);

//    if(!authHeader || !authHeader.startsWith('Bearer ')){
//         return c.json({
//             error: 'Unauthorized',
//             message: 'No valid autherization header provided.',
//         },403)
//     }

//     const token = authHeader.split (' ')[1];

//     try{
//         const user = await verify(token, c.env.JWT_SECRET);
//         if(!user || !user.email) {
//             return c.json({
//                 error: 'Unauthorized',
//                 message: 'Invalid token provided.',
//             }, 403);
//         }
//         return next();
//     }
//     catch (error) {
//         console.error('Token verification failed:', error);
//         return c.json({
//             error: 'Unauthorized',
//             message: 'Invalid token provided.',
//         }, 403);
//     }
// });

blogRouter.use('/*', authMiddleware);


blogRouter.post('/',async (c) => {
  console.log("inside blog post route");
  const body = await c.req.json();
  console.log("body", body);
  const {success} = createBlogInputs.safeParse(body);
  
  if(!success){
      c.status(411);
      return c.json({
        message : "invalid blog details"
      })
  }
  const userId = c.get("userId")
  console.log(userId);
  

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      
  }).$extends(withAccelerate());
  console.log("after connecting to db");
  // console.log(prisma);

  try{
    console.log("creating blog post");
    const blog = await prisma.post.create({
      data: {
    
        title : body.title,
        content : body.content,
        tag : body.tag,
        images : body.images || [], // assuming images is an array of strings (URLs)
        published : true,
        createdAt : new Date().toISOString(), // setting the current date as createdAt
        authorId : userId,
      }
    })
    console.log("blog created", blog);

    return c.json({
      id: blog.id,
      userId: userId,

    })
  }
  catch(e){
    c.status(411);
    return c.json({
      msg: "error while creating blog post"
    })
  }
})


blogRouter.put('/', async(c) => {
  const body = await c.req.json();
  const {success} = updateBlogInputs.safeParse(body);
  
  if(!success){
      c.status(411);
      return c.json({
        message : "invalid blog details"
      })
  }
  console.log("body", body);

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      
  }).$extends(withAccelerate());
  console.log("after connecting to db");
  // console.log(prisma);

  try{
    
    const blog = await prisma.post.update({
      where : {
        id : body.id
      },
      data: {
        title : body.title,
        content : body.content,
        tag : body.tag,
        images : body.images || [],
        published : true,
        createdAt : new Date().toISOString(), 
        authorId : c.get("userId"), // assuming the userId is set in the middleware


      }
    })

    return c.json({
      id: blog.id,
      
    })
  }
  catch(e){
    console.log(e);
    c.status(411);
    return c.json({
      msg: "error while updating blog post"
    })
  }
  
})
// delete blog post
blogRouter.delete('/delete/:blogid',async(c)=>{
  const body = c.req.param('blogid');
  console.log("body", body);

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      
  }).$extends(withAccelerate());
  console.log("after connecting to db");
  // console.log(prisma);

  try{
    const blog = await prisma.post.delete({
      where: {
        id : body
      }
    })
    return c.json({
      msg: "blog post deleted successfully"
    })
  }catch(e){
    c.status(411);
    return c.json({
      msg: "error while deleting blog post"
    })
  }
})

// pagination ->in landing page only shows 10 blogs only after scroll or clicking on button then show next 10 

blogRouter.get('/bulk', async(c) => {
  console.log("inside blog bulk route");
  
  // console.log("token", c.req.header('Authorization'));

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany(
    {
      select: {
        title: true,
        content: true,
        published: true,
        tag: true,
        images: true,
        createdAt: true,
        id: true,
        author:{
          select:{
            name: true,
            id: true,

          }
        }
      }
    }
  );

  return c.json({
    posts
  })
})

blogRouter.get('/:id',async (c) => {
  const body =  c.req.param('id');
  console.log("body", body);

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      
  }).$extends(withAccelerate());
  console.log("after connecting to db");
  // console.log(prisma);

  try{
    const blog = await prisma.post.findFirst({
      where: {
        id : body
      },
      select:{
        title: true,
        content: true,
        published: true,
        tag: true,
        images: true,
        createdAt: true,
        id: true,
        author:{
          select:{
            name:true,
            
          }
        }
      }
    })
    return c.json({
      blog
    })
  }catch(e){
    c.status(411);
    return c.json({
      msg: "error while fetching blog post"
    })
  }
  
})






