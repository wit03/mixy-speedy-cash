import type { Elysia } from "elysia";
import { jwtAccessSetup } from "../routes/setup";

export const isAuthenticated = (app: Elysia) =>
  app
    .use(jwtAccessSetup)
    .derive(async function handler({ jwtAccess, set,  cookie: {auth}, }) {

    const token:string | undefined = auth?.value || undefined
    if (!token) {
        set.status = 401;
        return {
          msg: "Unauthorized",
        };
    }
    const payload = await jwtAccess.verify(token);
        if (!payload) {
        set.status = 401;
        return {
            msg: "Unauthorized",
        };
    }
      return {
        customerDecrypt:payload,
      };
    });
