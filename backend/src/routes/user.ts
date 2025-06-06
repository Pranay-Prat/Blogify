import { Hono } from "hono";
import { sign } from 'hono/jwt';
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupInput, signinInput } from "@pranay.pratap15/blogging-common";
type Env = {
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
};
export const userRouter = new Hono<Env>();
userRouter.post('/signup',async(c)=>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
        const body = await c.req.json();
        const {success} = signupInput.safeParse(body)
        if(!success){
            c.status(411);
            return c.json({
                message:"Inputs not correct"
            })
        }
        try {
            const user = await prisma.user.create({
            data:{
                email:body.email,
                password:body.password,
                name:body.name
            }
            })
            const token = await sign({id:user.id},c.env.JWT_SECRET)
            return c.json({jwt:token,name:user.name})
        } catch (e) {
            c.status(403)
            return c.json({error:"error while signing up"})
        }
})

userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
            c.status(411);
            return c.json({
                message:"Inputs not correct"
            })
        }
    const user = await prisma.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        }
    })
    if(!user){
        c.status(403)
        return c.json({error:"user not found"});
    }
    const token = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({jwt:token,name:user.name})
})