import { Elysia, t } from "elysia";
import { isEmployeeAuthenticated } from "../../middleware/authen";
import { AssignEmployeeRepo } from "../../employee/employee.Repository";


const ValidateAssignEmployee = {
    body: t.Object({
        employeeId: t.String({
            minLength: 2,
        }),
        loanId: t.String({
            minLength: 2,
        }),
    }),
    error({ code,error }: { code: string, error:any }) {
        return {
            msg: error
        }
    },
}

export const AssignEmployee = new Elysia()
    .use(isEmployeeAuthenticated)
    .post("/assign-employee",
        async function SignInHttpHandler({
            body,
            set,
            employeeDecrypt
        }) {
            
            if(!employeeDecrypt || (employeeDecrypt.position !== "manager" && employeeDecrypt.position !== "owner")){
                set.status = 401
                return {
                    msg: "Unauthorized"
                }
            }

            const res = await AssignEmployeeRepo(body.loanId, body.employeeId)
            if(!res){
                set.status = 400
                return {
                    msg:"Failed to assign employee to loan"
                }
            }
            set.status = 200
            return {
                msg:"Ok",
                loan:res
            }
            
        },
        ValidateAssignEmployee
    );
