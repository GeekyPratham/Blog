import { Hono } from 'hono';
import { MiddlewareHandler } from "hono";

const app = new Hono<{
  Bindings:{
    JWT_SECRET: string,
  }
}>()

export const authMiddleware : MiddlewareHandler = async (c,next) => {
    const authHeader = c.req.header('Authorization');

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return c.json({
            error: 'Unauthorized',
            message: 'No valid autherization header provided.',
        },401)
    }

    const token = authHeader.split (' ')[1];

    try{
        const user = await c.env.JWT_SECRET.verify(token);
        if(!user || !user.email) {
            return c.json({
                error: 'Unauthorized',
                message: 'Invalid token provided.',
            }, 401);
        }
        c.set('user', user);
        return next();
    }
    catch (error) {
        console.error('Token verification failed:', error);
        return c.json({
            error: 'Unauthorized',
            message: 'Invalid token provided.',
        }, 401);
    }
    
}