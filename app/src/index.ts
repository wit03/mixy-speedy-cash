import { Elysia, t } from "elysia";
import { PrismaClient } from '@prisma/client'
import { jwt } from '@elysiajs/jwt'
import { accounts, auth, employee, loan, transaction, transfer } from "./routes/plugin";
import { cors } from '@elysiajs/cors'

export const db = new PrismaClient({
  log:["info", "query", "warn"],
})


const app = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET as string
    })
  )
  .use(cors({
    origin: "localhost:8080",
    credentials: true,
    methods:["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ['Content-Type'],
    
  }))
  .use(auth)
  .use(employee)
  .use(transfer)
  .use(accounts)
  .use(transaction)
  .use(loan)
  .listen(3000)



// console.log(new Date().valueOf())
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} ${new Date()}`
);

