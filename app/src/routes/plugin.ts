import { Elysia } from "elysia";
import { login } from "./customer/login";
import { register } from "./customer/register";
import { currentCustomer } from "./customer/current-customer";
import { transferBalance } from "./transfer/transferBalance";
import { listAccounts } from "./account/list-accounts";
import { listTransactions } from "./transaction/list-transactions";
import { addAccount } from "./account/add-account";
import { employeeRegister } from "./employee/employeeRegister";
import { report } from "./customer/report";
import { employeeLogin } from "./employee/employeeLogin";
import { CreateLoan } from "./loan/create-loan";
import { ListsLoan } from "./loan/list-loan";
import { ListLoanPayments } from "./loan/list-loan-payment";

export const auth = new Elysia({
  prefix: "/customer",
})
  .use(login)
  .use(register)
  .use(currentCustomer)
  .use(report)

export const employee = new Elysia({
  prefix: "/employee",
})
  .use(employeeRegister)
  .use(employeeLogin)


export const transfer = new Elysia({
  prefix:"/transfer",
})
.use(transferBalance)

export const accounts = new Elysia({
  prefix:"/account",
})
  .use(listAccounts)
  .use(addAccount)


export const transaction = new Elysia({
  prefix:"/transaction",
})
.use(listTransactions)


export const loan = new Elysia({
  prefix:"/loan",
})
.use(CreateLoan)
.use(ListsLoan)
.use(ListLoanPayments)

