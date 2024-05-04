import { FindEmployeeByEmailRepo, FindEmployeeByIdRepo} from "./employee.Repository";
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
