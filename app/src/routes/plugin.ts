import { Elysia } from "elysia";
import { login } from "./auth/login";
import { register } from "./auth/register";
import { currentCustomer } from "./auth/current-customer";
import { EmployeeLogin } from "./employee/employeeLogin";
import { transferBalance } from "./transfer/transferBalance";
import { listAccounts } from "./account/list-accounts";

export const auth = new Elysia({
  prefix: "/auth",
})
  .use(login)
  .use(register)
  .use(currentCustomer)

export const employee = new Elysia({
  prefix: "/employee",
})
  .use(EmployeeLogin)


  export const transfer = new Elysia({
    prefix:"/transfer",
  })
  .use(transferBalance)

  export const accounts = new Elysia({
    prefix:"/account",
  })
  .use(listAccounts)