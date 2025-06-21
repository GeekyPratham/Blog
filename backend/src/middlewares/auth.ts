import { Hono } from 'hono';
import { MiddlewareHandler } from "hono";
import { verify } from 'hono/jwt';

const app = new Hono<{
  Bindings:{
    JWT_SECRET: string,
  }
  Variables:{
    userId: string,
  }
}>()

export const authMiddleware : MiddlewareHandler = async (c,next) => {
    // extract the userId 
    // pass it to the down to the next route

    const authHeader = c.req.header('Authorization') || "";

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return c.json({
            error: 'Unauthorized',
            message: 'No valid autherization header provided.',
        },401)
    }

    const token = authHeader.split (' ')[1];
    console.log(token)
    try{
        const user = await verify(token, c.env.JWT_SECRET);
        console.log("user",user);
        
        if(!user || !user.id) {
            return c.json({
                error: 'Unauthorized',
                message: 'Invalid token provided.',
            }, 401);
        }
        c.set("userId", user.id);
     
        return await next();
    }
    catch (error) {
        console.error('Token verification failed:', error);
        return c.json({
            error: 'Unauthorized',
            message: 'Invalid token provided.',
        }, 401);
    }
    
}