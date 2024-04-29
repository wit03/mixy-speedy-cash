import { Elysia, t } from "elysia";
import { PrismaClient } from '@prisma/client'
import { swagger } from '@elysiajs/swagger'
import userHttp from "./user/user.httpHandler";
import { jwt } from '@elysiajs/jwt'

export const db = new PrismaClient() 



const app = new Elysia()  
    .use(swagger())
    .use(
      jwt({
          name: 'jwt',
          secret: process.env.JWT_SECRET as string
      })
  )
    .post('/sign-up', userHttp.SignUpMethod.func, userHttp.SignUpMethod.validate) 

  .listen(3000)


console.log(
  
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} ${new Date("2024-04-29T18:49:21.000Z").toISOString()}`
);

