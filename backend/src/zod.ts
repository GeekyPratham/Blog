// import z from "zod";

// export const signupInputs = z.object({
//   username : z.string().email(),
//   password : z.string().min(3),
//   name : z.string().optional()
// })
// zod validation is done here but we know that this input come from frontend so why not the same validation used by frontend developer which make them easy to what are the fields exist in backend not to just open the backend code to see the required fields so we use  ->  type inference in zod      we define the zod in common filder and use them in both frontend and backend 
// in the common folder do npx tsc --init and make rootDri = ./src and outdir = ./dist and declaration = true