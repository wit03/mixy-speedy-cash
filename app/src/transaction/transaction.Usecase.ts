import { FindManyTransactions } from "./transaction.Repository"

export async function ListAllTransactions(limit:number, skip:number) {
    const resTransations = await FindManyTransactions(limit, skip)

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
