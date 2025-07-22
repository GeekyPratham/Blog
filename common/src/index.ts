import z from "zod";

export const signupInputs = z.object({
  email : z.string().email(),
  password : z.string().min(3),
  name : z.string().optional(),
  profileImg : z.string().optional()
})



export const signinInputs = z.object({
    email : z.string().email(),
    password : z.string().min(3),
    
})

export const updateUserDetails = z.object({
    name : z.string().optional(),
    password : z.string().min(3).optional(),
    profileImg : z.string().optional()
})


export const createBlogInputs = z.object({
    title : z.string(),
    content : z.string(),
    tag : z.string().optional(),
    authorId : z.string().optional(),
    published : z.boolean().optional().default(true),
    id : z.string().optional(),
    createdAt : z.string().optional(),
    // New field: array of image URLs
    images: z.array(z.string()).optional(), 
})

export const updateBlogInputs = z.object({
    title : z.string(),
    content : z.string(),
    tag : z.string().optional(),
    authorId : z.string().optional(),
    published : z.boolean().optional().default(true),
    id : z.string(),
    createdAt : z.string().optional(),
    images: z.array(z.string()).optional(), 
})

// type inference in zod

export type SignupInput = z.infer<typeof signupInputs>

export type SigninInput = z.infer<typeof signinInputs>

export type UpdateUserDetails = z.infer<typeof updateUserDetails>

export type CreateBlogInputs = z.infer<typeof createBlogInputs>

export type UpdateBlogInputs = z.infer<typeof updateBlogInputs>