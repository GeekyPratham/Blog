import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify,decode } from 'hono/jwt';
import { authMiddleware } from '../middlewares/auth';

export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string,
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


blogRouter.post('/', (c) => {
  return c.text('Hello Hono!')
})


blogRouter.put('/', (c) => {
  return c.text('Hello Hono!')
})


blogRouter.get('/:id', (c) => {
  return c.text('Hello Hono!')
})


blogRouter.get('/bulk', (c) => {
  return c.text('Hello Hono!')
})



