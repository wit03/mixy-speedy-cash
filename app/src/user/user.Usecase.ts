import { password } from "bun";
import userRepo from "./user.Repository";
import { CustomerRegisterReq, CustomerSigninReq } from "./user.type";


// for insert customer when signup
async function CustomerSignUp(body:CustomerRegisterReq) {
    body.password = await Bun.password.hash(body.password, {
        algorithm:"bcrypt",
        cost: 4
    })
    const data = await userRepo.SignUpRepo(body)

    return {customer:data}
}

async function FindCustomerById(customerId:string) {
    return await userRepo.FindCustomerByIdRepo(customerId)
}


async function CustomerSignIn(body:CustomerSigninReq) {
    const checkedCustomer = await userRepo.FindCustomerByEmailRepo(body.email)
    if(!checkedCustomer || checkedCustomer.Email !== body.email) {
        return {error: "Email or password is not correct", data:undefined}
    }
    
    const correct = await Bun.password.verify(body.password, checkedCustomer.Password)
    if(!correct) {
        return {error: "Email or password is not correct", data:undefined}
    }
    
    const customer = await userRepo.FindCustomerByIdRepo(checkedCustomer.CustomerId)
    
    return {error: undefined, data:customer}

}

const userUsecase = {
    SignUpUsecase: CustomerSignUp,
    FindCustomerByIdUsecase: FindCustomerById,
    SignInUsecase: CustomerSignIn
}

export default userUsecase