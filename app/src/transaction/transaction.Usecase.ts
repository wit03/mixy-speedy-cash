import { FindAccountByIdAndCustomer } from "../account/account.Repository";
import { FindLastMoneyInDependOnTime, FindLastMoneyOutDependOnTime, FindManyTransactionsFromAccount, FindMoneyIn, FindMoneyOut } from "./transaction.Repository"

export async function ListAllTransactionAccount(limit:number, skip:number, customerId:string, accountId:string) {

    const checkedCustomerId = await FindAccountByIdAndCustomer(customerId, accountId);
    
    if(!checkedCustomerId || checkedCustomerId.customerId !== customerId){
        return {
            error: "unathorized",
            transactions: undefined
        }
    }

    const resTransations = await FindManyTransactionsFromAccount(limit, skip, accountId)

    if(!resTransations){
        return {
            error: "There are some error ouccur when try to find an accounts for you",
            transactions: undefined
        }
    }

    return {
        error: undefined,
        transactions: resTransations
    }

}

export async function FindReportUsecase(customerId:string, accountId:string) {
    
    const checkedCustomerId = await FindAccountByIdAndCustomer(customerId, accountId);
    
    if(!checkedCustomerId || checkedCustomerId.customerId !== customerId){
        return {
            moneyIn: undefined,
            moneyOut: undefined,
            error: "unathorized",
            moneyInLastSixMonth: undefined,
            moneyOutLastSixMonth: undefined,
        }
    }

    // for calculating last 6 month
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    const [resMoneyIn, resMoneyOut, resMoneyInLastSixMonth, resMoneyOutLastSixMonth] = await Promise.all([
        FindMoneyIn(accountId),
        FindMoneyOut(accountId),
        FindLastMoneyInDependOnTime(accountId, startDate),
        FindLastMoneyOutDependOnTime(accountId, startDate),
    ])

    if(resMoneyIn === undefined || resMoneyOut === undefined || resMoneyInLastSixMonth === undefined || resMoneyOutLastSixMonth === undefined){
        return {
            moneyIn: undefined,
            moneyOut: undefined,
            error: "Find money in transaction data failed",
            moneyInLastSixMonth: undefined,
            moneyOutLastSixMonth: undefined,
        }
    }
    
    const moneyInLastSixMonth = helperCalculateTransaction(resMoneyInLastSixMonth)
    const moneyOutLastSixMonth = helperCalculateTransaction(resMoneyOutLastSixMonth)
    
    return {
        moneyIn: resMoneyIn,
        moneyOut: resMoneyOut,
        error: undefined,
        moneyInLastSixMonth: moneyInLastSixMonth,
        moneyOutLastSixMonth: moneyOutLastSixMonth,
    }    

}


function helperCalculateTransaction(items: {
    amount: number;
    transactionDate: Date;
}[]) {
 
    const map = new Map();
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
        const month = now.getMonth() + 1 - i;
        const year = now.getFullYear();
        const adjustedMonth = ((month - 1 + 12) % 12) + 1;
        const adjustedYear = month <= 0 ? year - 1 : year;
        const key = `${adjustedYear}-${adjustedMonth}`;
        map.set(key, 0);
    }

    items!.forEach(item => {
        const transactionDate = new Date(item.transactionDate);
        const month = transactionDate.getMonth() + 1;
        const year = transactionDate.getFullYear();
        
        const key = `${year}-${month}`;

        if (!map.has(key)) {
            map.set(key, 0);
        }

        const val = map.get(key) + item.amount
        map.set(key, val)

    });

    const classifiedArray = Array.from(map);

    const classifiedObject = Object.fromEntries(classifiedArray);

    return classifiedObject

}