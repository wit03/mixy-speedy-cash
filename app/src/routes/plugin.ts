import { Elysia } from "elysia";
import { login } from "./customer/login";
import { register } from "./customer/register";
import { currentCustomer } from "./customer/current-customer";
import { transferBalance } from "./transfer/transferBalance";
import { listAccounts } from "./account/list-accounts";
import { listTransactions } from "./transaction/customer-list-transactions";
import { addAccount } from "./account/add-account";
import { report } from "./customer/report";
import { employeeLogin } from "./employee/employee-login";
import { CreateLoan } from "./loan/create-loan";
import { ListsLoan } from "./loan/list-loan";
import { ListLoanPayments } from "./loan/list-loan-payment";
import { CustomerPayLoan } from "./loan/customer-pay-loan";
import { employeeRegister } from "./employee/employee-register";
import { currentEmployee } from "./employee/current-employee";
import { managerReport } from "./employee/manager-report";
import { countAndSumTransaction } from "./employee/count-sum-transaction";
import { listTransactionWithCondition } from "./employee/employee-list-transaction";
import { employeeSearchCustomer } from "./employee/employee-search-customer";
import { listLoan } from "./employee/employee-list-loan";
import { approveLoan } from "./employee/patch-status-loan";
import { ListEmployee } from "./employee/list-employee";
import { AssignEmployee } from "./employee/assign-employee";
import { listLoanPayment } from "./employee/employee-list-loan-payment";

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
  .use(currentEmployee)
  .use(managerReport)
  .use(countAndSumTransaction)
  .use(listTransactionWithCondition)
  .use(employeeSearchCustomer)
  .use(listLoan)
  .use(approveLoan)
  .use(ListEmployee)
  .use(AssignEmployee)
  .use(listLoanPayment)


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
.use(CustomerPayLoan)

