import userRepo from "./user.Repository";
import { CustomerRegisterReq } from "./user.type";


// for insert customer when signup
async function CustomerSignUpUsecase(body:CustomerRegisterReq) {
    body.password = await Bun.password.hash(body.password, {
        algorithm:"bcrypt",
        cost: 4
    })
    const data = await userRepo.SignUpRepo(body)

    return {customer:data}
}


const userUsecase = {
    SignUpUsecase: CustomerSignUpUsecase
}

export default userUsecase