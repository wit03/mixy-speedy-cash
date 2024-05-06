import { FindProfitLoanRepo } from "../loan/loan.repository";
import { CountCustomerAndAccount, FindEmployeeByEmailRepo, FindEmployeeByIdRepo} from "./employee.Repository";
import { InsertEmployeeRepo } from "./employee.Repository";
import { EmployeeRegisterReq , EmployeeSigninReq} from "./employee.type";

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