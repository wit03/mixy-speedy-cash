import { Elysia } from "elysia";
import { login } from "./auth/login";
import { register } from "./auth/register";
import { currentCustomer } from "./customer/current-customer";

export const auth = new Elysia({
  prefix: "/auth",
})
  .use(login)
  .use(register)
  .use(currentCustomer)