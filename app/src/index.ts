import { Elysia, t } from "elysia";
import { PrismaClient } from '@prisma/client'
import { jwt } from '@elysiajs/jwt'
import { accounts, auth, employee, loan, transaction, transfer } from "./routes/plugin";
import { customAlphabet } from "nanoid";
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
  .use(auth)
  .use(employee)
  .use(transfer)
  .use(accounts)
  .use(transaction)
  .use(loan)
//   .get('/test', ({set, store, jwt}) => {
//     jwt
//     //@ts-ignore
//     console.log(store)
//     set.status = 200;
//     return {
//       msg:"ok"
//     }
//   }, {
//     beforeHandle({ set, cookie: { session }, store, jwt }) {
//       // jwt.
//       // return store = "hello"
//       // return (set.status = 'Unauthorized')
//     }
// })
  .listen(3000)



// console.log(new Date().valueOf())
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} ${new Date()}`
);

