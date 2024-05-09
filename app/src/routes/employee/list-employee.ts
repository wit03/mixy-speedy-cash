import { Elysia } from "elysia";
import { isEmployeeAuthenticated } from "../../middleware/authen";
import { ListAllEmployeeUsecase } from "../../employee/employee.Usecase";


const ValidateListEmployee = {
    error({ error }: {  error:any }) {
        return {
            msg: error
        }
    },
}

export const ListEmployee = new Elysia()
    .use(isEmployeeAuthenticated)
    .get("/list-employee",
        async function ManagerReportHttpHandler({
            set,
            employeeDecrypt
        }) {

            if(!employeeDecrypt || (employeeDecrypt.position !== "manager" && employeeDecrypt.position !== "owner")){
                set.status = 401;
                return {
                    msg: "Unauthorized",
                    employees: null
                }
            }
            

            const {error, employees} = await ListAllEmployeeUsecase()
            if(error){
                set.status = 400;
                return {
                    msg:error,
                    employees: null
                }
            }
            set.status = 200
            return {
                msg: "Ok",
                employees: employees
            }

        },
        ValidateListEmployee
    );
