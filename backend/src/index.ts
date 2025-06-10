import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()


/** 
 * This is a simple blog API
 * It is built using Hono framework
 * It is a RESTful API
 * To begin with, our backend will have 4 routes
 
  POST /api/v1/user/signup
  POST /api/v1/user/signin
  POST /api/v1/blog
  PUT /api/v1/blog
  GET /api/v1/blog/:id
  GET /api/v1/blog/bulk

*/

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);


export default app