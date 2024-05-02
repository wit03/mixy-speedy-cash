import { Elysia } from "elysia";
import { login } from "./customer/login";
import { register } from "./customer/register";
import { currentCustomer } from "./customer/current-customer";
import { EmployeeLogin } from "./employee/employeeLogin";
import { transferBalance } from "./transfer/transferBalance";
import { listAccounts } from "./account/list-accounts";
import { listTransactions } from "./transaction/list-transactions";

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


export const transaction = new Elysia({
  prefix:"/transaction",
})
.use(listTransactions)
