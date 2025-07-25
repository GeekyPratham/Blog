import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify,decode } from 'hono/jwt';
import { signupInputs, signinInputs, updateUserDetails } from '@geekypratham/blog-common';
import { authMiddleware } from '../middlewares/auth';

export const userRouter =  new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>();
userRouter.use('/updateProfile/*', authMiddleware);



userRouter.post('/signup',async (c) => {

  console.log("user signup");
  console.log(c.env.DATABASE_URL);
  console.log(c.env.JWT_SECRET);
  // connect to the database using Prisma
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      
  }).$extends(withAccelerate());

  console.log("after connecting to db");
  // console.log(prisma);
  const userDetails = await c.req.json();
  const {success} = signupInputs.safeParse(userDetails);

  if(!success){
    c.status(411);
    return c.json({
      message : "invalid user details"
    })
  }
  console.log(userDetails);

  // check if the request body has email and password
  if (!userDetails.email || !userDetails.password) {
    return c.text('Email and password are required', 403);// 403 for unauthorized access
  }

  // check if the email is already in use

  const alreadyExists = await prisma.user.findUnique({
    where: {
      email: userDetails.email,
    },
  });
  console.log(alreadyExists);

  // if the email is already in use, return an error
  if(alreadyExists) {
    return c.text('Email already in use', 403); // 403 for unauthorized access
  }
 
  // create a new user

  // important notes in above where i have check in database for user belogs to this email is exist or not 
  // if we dont do this check above then also it will below code detect error as in my structured databse (postgresql) there is unique constraint on email field so if we try to create a user with same email it will throw an error
  console.log("creating user");
  const user = await prisma.user.create({
    data:{
      email: userDetails.email,
      password: userDetails.password,
      name: userDetails.name,
    }
  })
  
  // create a JWT token and return it
  console.log(user)
  console.log(user.id)
  const token = await sign({
    id : user.id
    
  },c.env.JWT_SECRET,);

  console.log(token);

  // return the token
  return c.json({
    token,
    userId:user.id,
    name:user.name,
    msg: "User created successfully",
    
  })
})


userRouter.post('/signin',async (c) => {


  console.log("user signin");

  // connect to the database using Prisma
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      
  }).$extends(withAccelerate());

  console.log("after connecting to db");
  // console.log(prisma);

  const userDetails = await c.req.json();

  console.log(userDetails);

  const {success} = signinInputs.safeParse(userDetails);
 
  if(!success){
    c.status(411);
    return c.json({
      message : "invalid user details"
    })
  }

  // check if the request body has email and password
  if (!userDetails.email || !userDetails.password) {
    console.log("Email and password not exits");
    return c.text('Email and password are required', 400);
  }

  // check if the user is exist or not

  const alreadyExists = await prisma.user.findUnique({
    where: {
      email: userDetails.email,
      password: userDetails.password,
    },
  });

  console.log(alreadyExists);

  if(!alreadyExists) {
    // if the user is not exist, return an error
    return c.text('Invalid email or password', 403); // 403 for unauthorized access
  }
  // create a JWT token and return it
  console.log(alreadyExists.id)
  console.log(alreadyExists.email)
  // console.log(`${userDetails.id} is user ID`)
  const token = await sign({
     id : alreadyExists.id
  },c.env.JWT_SECRET,);

  console.log(token);

  // return the token
  return c.json({
    token,
    userId: alreadyExists.id,
    name:alreadyExists.name,
    msg: "User signin successfully",
  })
})


userRouter.get('/:id',async(c)=>{
  
  const userId = c.req.param('id');

  console.log(userId);
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      
  }).$extends(withAccelerate());
  console.log("after connecting to db");



  try {
    const updatedUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select:{
        name: true,
        password : true,
        profileImg : true
      }
    });

    return c.json({
      message: 'Getting user successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return c.json({ message: 'Error in getting user' }, 500);
  }
})

userRouter.patch('/updateProfile/:id',async(c)=>{
  const userDetails = await c.req.json();
  const userId = c.req.param('id');
  console.log(userDetails);
  console.log(userId);
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      
  }).$extends(withAccelerate());
  console.log("after connecting to db");

  console.log(userDetails);

  const {success} = updateUserDetails.safeParse(userDetails);
 
  if(!success){
    c.status(411);
    return c.json({
      message : "invalid user details"
    })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: userDetails,
    });

    return c.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return c.json({ message: 'User update failed' }, 500);
  }
})