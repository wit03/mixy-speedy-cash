import { Elysia, t } from "elysia";
import { PrismaClient } from '@prisma/client'
import { jwt } from '@elysiajs/jwt'
import { verifyJwt } from "./utils/jwt";
import { auth } from "./routes/plugin";

export const db = new PrismaClient({
  log:["info", "query"],
})



const app = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET as string
    })
  )
  // .post('/sign-up', userHttp.SignUpMethod.func, userHttp.SignUpMethod.validate)
  // .post('/sign-in', userHttp.SignInMethod.func, userHttp.SignInMethod.validate)
  .use(auth)
  // .get('/current-user', userHttp.CurrentCustomer.func)
  .get('/', ({store, jwt}) => {
    jwt
    //@ts-ignore
    console.log(store)
  }, {
    beforeHandle({ set, cookie: { session }, store, jwt }) {
      // jwt.
      return store = "hello"
      // return (set.status = 'Unauthorized')
    }
})
  .listen(3000)

  // console.log(new Date().valueOf())
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} ${new Date("2024-04-29T18:49:21.000Z").toISOString()}`
);

