import { Hono } from "hono";
import { decode, verify, sign } from 'hono/jwt';
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, CreateBlogInput, updatePostInput } from "@pranay.pratap15/blogging-common";
type JwtPayload = {
  id: string; 
  [key: string]: any;
};
type Env = {
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
};
export const blogRouter = new Hono<Env>();
blogRouter.use('/*',async(c,next)=>{
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1]
    const payload = await verify(token, c.env.JWT_SECRET) as JwtPayload
    if(payload){
        c.set('userId',payload.id)
        await next()
    }else{
        c.status(403)
        return c.json({error:"unauthorized"})
    }
})
blogRouter.post('/',async(c)=>{
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body)
    if(!success){
            c.status(411);
            return c.json({
                message:"Inputs not correct"
            })
        }
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }
    })

    return c.json({
        success:true,
        id:blog.id
    })
})
blogRouter.put('/',async(c)=>{
    const body = await c.req.json();
    const {success} = updatePostInput.safeParse(body) 
    if(!success){
            c.status(411);
            return c.json({
                message:"Inputs not correct"
            })
        }
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.post.update({
        where:{
            id:body.id,
            authorId:userId
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })

    return c.json({
        success:true,
        id:blog.id
    })
})
blogRouter.get('/bulk',async (c)=>{
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        select:{
            title:true,
            content:true,
            id:true,
            publishedAt:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true }
    });
    return c.json({
        blogs,user: user?.name
    },);
})
blogRouter.get('/:id',async(c)=>{
    const id = c.req.param('id')
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.findUnique({

        where:{
            id
        },
        select:{
            title:true,
            content:true,
            publishedAt:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })
    if (!blog) {
        c.status(404);
        return c.json({ message: "Blog not found" });
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true }
    });
    return c.json({ blog, user: user?.name });
    } catch (error) {
        c.status(411)
        return c.json({message:"error while fetching blog post"})
    }
    
})
