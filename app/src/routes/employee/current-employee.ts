import { Elysia } from "elysia";
import { jwtEmployeeSetup } from "../setup";
import { FindEmployeeByIdRepo } from "../../employee/employee.Repository";


export const currentEmployee = new Elysia()
.use(jwtEmployeeSetup)
  .get(
        "/current-employee",
    async function CurrentUserHttpHandler({
        set,
        cookie: {employeeAuth},
        jwtEmployee
    }) {
        
        const token:string | undefined = employeeAuth?.value || undefined
        set.status = 200
    
        if(!token || token.length === 0){
            return {
                msg:"No token found",
                employee: undefined,
            }
        }
        else {
            const parseData = await jwtEmployee.verify(token)
            if (!parseData){
                return {
                    msg:"Parse token failed",
                    employee:undefined
                }
            } 
            else {
                const employee = await FindEmployeeByIdRepo(parseData.employeeId)
        
                if(!employee){
                    return {
                        msg:"ok",
                        employee: undefined
                    }
                } else {
                    return {
                        msg:"ok",
                        employee: employee
                    }
                }

            }
            
        }
    },
);
