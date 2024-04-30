import { CustomerRegisterReq, CustomerSigninReq } from "./customer.type";
import { FindCustomerByEmailRepo, FindCustomerByIdRepo, InsertCustomerRepo } from "./customer.Repository";


// for insert customer when signup
export async function CustomerSignUp(body:CustomerRegisterReq) {
    body.password = await Bun.password.hash(body.password, {
        algorithm:"bcrypt",
        cost: 4
    })
    const data = await InsertCustomerRepo(body)

    return {customer:data}
}


export async function CustomerSignIn(body:CustomerSigninReq) {
    const checkedCustomer = await FindCustomerByEmailRepo(body.email)
    if(!checkedCustomer || checkedCustomer.Email !== body.email) {
        return {error: "Email or password is incorrect", data:undefined}
    }
    
    const correct = await Bun.password.verify(body.password, checkedCustomer.Password)
    if(!correct) {
        return {error: "Email or password is incorrect", data:undefined}
    }
    
    const customer = await FindCustomerByIdRepo(checkedCustomer.CustomerId)
    
    return {error: undefined, customer:customer}

}
