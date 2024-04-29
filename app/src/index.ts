import { Elysia } from "elysia";
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient() 
const app = new Elysia()
    .post( 
        '/sign-up', 
        async ({ body }) => console.log(body) 
    ) 
    .listen(3000)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

