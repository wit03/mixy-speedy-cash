import { CustomerRegisterReq, CustomerSigninReq } from "./customer.type";
import { DeleteCustomer, FindCustomerByEmailRepo, FindCustomerByIdRepo, InsertCustomerRepo } from "./customer.Repository";
import { InsertAccountRepo } from "../account/account.Repository";


// for insert customer when signup
// hash password
export async function CustomerSignUp(body:CustomerRegisterReq) {
    body.password = await Bun.password.hash(body.password, {
        algorithm:"bcrypt",
        cost: 4
    })

    body.citizenId = await Bun.password.hash(body.citizenId, {
        algorithm:"bcrypt",
        cost: 4
    }) 

    body.pin = await Bun.password.hash(body.pin, {
        algorithm:"bcrypt",
        cost: 4
    }) 

    const resCustomer = await InsertCustomerRepo(body)

    // if no data return an error
    if(!resCustomer || !resCustomer.customerId){
        return {customer:undefined, error:"Register customer failed"}
    }
    else {
        
        const resAccount =  await InsertAccountRepo(resCustomer.customerId, body.pin, "Deposit")
        // if create account failed delete customer
        if(!resAccount || !resAccount.accountId){
            const _ = await DeleteCustomer(resCustomer.customerId)
            return {customer:undefined, error:"Register customer failed cause of can't create account", account:undefined}
        }        
        return {customer:resCustomer, error:undefined, account:resAccount}
    }
}



export async function CustomerSignIn(body:CustomerSigninReq) {
    const checkedCustomer = await FindCustomerByEmailRepo(body.email)
    if(!checkedCustomer || checkedCustomer.email !== body.email) {
        return {error: "Email or password is incorrect", data:undefined}
    }
    
    const correct = await Bun.password.verify(body.password, checkedCustomer.password)
    if(!correct) {
        return {error: "Email or password is incorrect", data:undefined}
    }
    
    const customer = await FindCustomerByIdRepo(checkedCustomer.customerId)
    
    return {error: undefined, customer:customer}

}
