import { Elysia, t } from "elysia";
import { PrismaClient } from '@prisma/client'
import { jwt } from '@elysiajs/jwt'
import userHttp from "./user/user.HttpHandler";

export const db = new PrismaClient() 



const app = new Elysia()  
    .use(
      jwt({
          name: 'jwt',
          secret: process.env.JWT_SECRET as string
      })
  )
    .post('/sign-up', userHttp.SignUpMethod.func, userHttp.SignUpMethod.validate) 
    .post('/sign-in', userHttp.SignInMethod.func, userHttp.SignInMethod.validate) 
    .get('/current-user', userHttp.CurrentCustomer.func) 
    .get("/fdlp", (jwt) => {jwt})
  .listen(3000)


console.log(
  
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} ${new Date("2024-04-29T18:49:21.000Z").toISOString()}`
);

