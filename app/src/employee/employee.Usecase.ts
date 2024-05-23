import { $Enums, LoanPayment, LoanType } from "@prisma/client";
import { DeleteLoanPaymentRepo, FindLoanDataWithLoanIdRepo, FindProfitLoanRepo, InsertManyLoanPayment, ListLoanByTypeRepo, UpdateLoanStatusRepo } from "../loan/loan.repository";
import { CountAndSumTransactionRepo, FindTransactionByConditionRepo } from "../transaction/transaction.Repository";
import { CountCustomerAndAccount, FindEmployeeByEmailRepo, FindEmployeeByIdRepo, ListAllEmployeeRepo} from "./employee.Repository";
import { InsertEmployeeRepo } from "./employee.Repository";
import { EmployeeRegisterReq , EmployeeSigninReq, TransactionSearchCondition} from "./employee.type";
import { DepositBalanceRepo, FindManyAccountDataByCustomerId } from "../account/account.Repository";
import { FindCustomerBySearch } from "../customer/customer.Repository";
import { SearchLoanStatus } from "../loan/loan.type";

export async function EmployeeSignUp(body:EmployeeRegisterReq) {

    body.password = await Bun.password.hash(body.password, {
        algorithm:"bcrypt",
        cost: 4
    })

    const resEmployee = await InsertEmployeeRepo(body)
    
    if(!resEmployee || !resEmployee.employeeId){
        return {employee:undefined, error:"Register employee failed"}
    }
    
    return {employee:resEmployee, error:undefined}
}

export async function EmployeeSignIn(body:EmployeeSigninReq) {
    
    const checkedEmployee = await FindEmployeeByEmailRepo(body.email)
    if(!checkedEmployee || checkedEmployee.email !== body.email) {
        return {error: "Email or password is incorrect", employee:undefined}
    }
    
    const correct = await Bun.password.verify(body.password, checkedEmployee.password)
    if(!correct) {
        return {error: "Email or password is incorrect", employee:undefined}
    }
    
    const employee = await FindEmployeeByIdRepo(checkedEmployee.employeeId)

    return {error: undefined, employee:employee}

}



export async function ManagerReport() {
    
    const resultCount = await CountCustomerAndAccount()
    if(!resultCount){
        return {
            error:"Failed to count customer and account number",
            totalAccounts: null,
            totalCustomers: null,
            loanPaymentProfit: null,
        }
    }

    const {totalAccounts, totalCustomers} = resultCount

    // for calculating last 6 month
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    const resLoanPaymentProfit = await FindProfitLoanRepo(startDate)
    if(!resLoanPaymentProfit){
        return {
            error: "Failed to find profit loan",
            totalAccounts: null,
            totalCustomers: null,
            loanPaymentProfit: null,
        }
    }

    const loanPaymentProfit = helperCalculateLoanPayment(resLoanPaymentProfit)

    return {
        error: undefined,
        totalAccounts: totalAccounts, 
        totalCustomers: totalCustomers,
        loanPaymentProfit: loanPaymentProfit
    }

}

export async function ListAllEmployeeUsecase() {
    const resEmployees = await ListAllEmployeeRepo()
    if(!resEmployees){
        return {
            error:"Failed to list all employees",
            employees: undefined
        }
    }
    return {
        error: undefined,
        employees: resEmployees
    }
}


export async function CountAndSumTransactions() {
    const resultCountAndSum = await CountAndSumTransactionRepo()
    if(!resultCountAndSum){
        return {
            error:"Failed to count and sum transaction",
            countAndSumTransactions: undefined
        }
    }
    return {
        error: undefined,
        countAndSumTransactions: resultCountAndSum
    }
}



export async function ListTransactionByCondition(search:string, type:TransactionSearchCondition) {
    
    const resTransaction = await FindTransactionByConditionRepo(search, type)

    if(resTransaction === undefined){
        return {
            error: "Failed to find transaction with condition",
            transactions: undefined
        }
    }
    return {
        error: undefined,
        transactions: resTransaction
    }
    
}

export async function EmployeeSearchCustomerDetail(search:string) {
    
    const resCustomer = await FindCustomerBySearch(search)
    if(!resCustomer){
        return {
            error: "Can't find customer with this search",
            customer: undefined,
            accounts: undefined,
        }
    }
    
    const resAccounts = await FindManyAccountDataByCustomerId(resCustomer.customerId) 
    if(!resAccounts){
        return {
            error:"Can't find accounts with this search",
            customer: undefined,
            accounts: undefined,
        }
    }

    return {
        error: undefined,
        customer: resCustomer,
        accounts: resAccounts,
    }
}


// for employee to list the loans to make an improvement
export async function EmployeeListLoanUsecase(status:SearchLoanStatus) {

    const resLoans = await ListLoanByTypeRepo(status)
    if(!resLoans){
        return {
            error:"List loans by type failed",
            loans: null
        }
    }


    const loanMap: {
        [loanType:string]:{
            createdAt: Date;
            account: {
                customer: {
                    firstName: string;
                    lastName: string;
                };
                accountId: string;
            };
            loanId: string;
            loanAmount: number;
            loanStatus: $Enums.LoanStatus;
            loanType:string;
            interestRate: number
        }[]
    } = {};

    resLoans.forEach((loan) => {
        const loanStatus = loan.loanStatus
        if(!loanMap[loanStatus]){
            loanMap[loanStatus] = []
        }

        loanMap[loanStatus].push(loan)

    })

    return {
        error: undefined,
        loans: loanMap
    }
}


export async function EmployeeApproveLoanUsecase(loanId:string, status:$Enums.LoanStatus, type:$Enums.LoanType) {
    

    let installmentLength:number;
    if(type === "normal"){
        installmentLength = 6
    }
    else if(type === "special"){
        installmentLength = 12
    }
    else{
        return {
            error: "Loan type is incorrect format",
            loan: undefined,
            loanPayment: undefined,
            deposit: undefined
        }
    }

    const beforeUpdatedData = await FindLoanDataWithLoanIdRepo(loanId)
    if(!beforeUpdatedData){
        return {
            error:"Can't fina a loan with this loanId",
            loan: undefined,
            loanPayment: undefined,
            deposit: undefined
        }
    }
    const nextMonth = new Date();
    let endDate = new Date()
    endDate.setDate(endDate.getDate() +  (installmentLength * 30))

    switch (status) {
        case "onProcess":
            const resUpdateLoan = await UpdateLoanStatusRepo(beforeUpdatedData.loanId, status, new Date(), endDate)

            if(!resUpdateLoan){
                return {
                    error:"Can't find a loan with this loanId"
                }
            }

            // calculate how much each loan payment should be paid
            const loanPayments:Omit<LoanPayment, "loanPaymentId" | "createdAt" | "updatedAt" | "paidDate">[] = []
            const interestPercent = resUpdateLoan.interestRate; 
            const loanAmount = resUpdateLoan.loanAmount;
            const paymentAmount = (loanAmount * 0.03)
            // nextMonth.setMonth(nextMonth.getMonth() + 1);
            nextMonth.setDate(nextMonth.getDate() + 30);

            for (let i = 0; i < installmentLength; i++) {
                loanPayments.push({
                    interestPercent: interestPercent, 
                    loanId: resUpdateLoan.loanId,
                    paidAmount: 0,
                    paymentAmount: paymentAmount,
                    principalAmount: resUpdateLoan.loanAmount,
                    scheduledPaymentDate: new Date(nextMonth),
                    paidStatus: "onProcess",
                })
                nextMonth.setDate(nextMonth.getDate() + 30);    
            }

            // insert loan payment
            const loanPaymentRes = await InsertManyLoanPayment(loanPayments)
            // if insert loan payment failed we going to update back to default
            if(loanPaymentRes === undefined){
                await UpdateLoanStatusRepo(beforeUpdatedData.loanId, beforeUpdatedData.loanStatus, null, null)
                return {
                    error: "Failed to insert loan payment",
                    loan: undefined,
                    deposit: undefined,
                    loanPayment: undefined
                }
            }
            
            // โอนเงิน
            const resDeposit =  await DepositBalanceRepo(beforeUpdatedData.accountId, beforeUpdatedData.loanAmount)
            // if failed to add balance to account we going to update all the loan back into default data
            if(resDeposit === undefined){
                await UpdateLoanStatusRepo(beforeUpdatedData.loanId, beforeUpdatedData.loanStatus, null, null)
                await DeleteLoanPaymentRepo(beforeUpdatedData.loanId)
                return {
                    error: "Failed to deposit balance into user account",
                    loan: undefined,
                    loanPayment: undefined,
                    deposit: undefined
                }
            }
            return {
                error: undefined,
                loan: resUpdateLoan,
                loanPayment: loanPaymentRes,
                deposit: resDeposit
            }
            
                
            default:
                console.log(status)
                const resUpdateLoanDecline = await UpdateLoanStatusRepo(beforeUpdatedData.loanId, status, new Date(), endDate)
                
                
                if(!resUpdateLoanDecline){
                    return {
                        error: "Failed to update loan status",
                        loan: undefined,
                        deposit: undefined,
                        loanPayment: undefined
                    }
                }
                console.log(resUpdateLoanDecline)
                return {
                    error: undefined,
                    loan: resUpdateLoanDecline,
                    loanPayment: null,
                    deposit: null
                }
            
    }

}



function helperCalculateLoanPayment(items: {
    paidAmount: number;
    createdAt: Date;
}[]) {
 
    const map = new Map();

    items!.forEach(item => {
        const transactionDate = new Date(item.createdAt);
        const month = transactionDate.getMonth() + 1;
        const year = transactionDate.getFullYear();
        
        const key = `${year}-${month}`;

        if (!map.has(key)) {
            map.set(key, 0);
        }

        const val = map.get(key) + item.paidAmount
        map.set(key, val)

    });

    const classifiedArray = Array.from(map);

    const classifiedObject = Object.fromEntries(classifiedArray);

    return classifiedObject

}


