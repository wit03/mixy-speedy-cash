import { Elysia, t } from "elysia";
import { EmployeeListLoanUsecase } from "../../employee/employee.Usecase";
import { isEmployeeAuthenticated } from "../../middleware/authen";
import { EmployeeGetCustomerDetailRepo } from "../../customer/customer.Repository";

const ValidateManagerReport = {
    query: t.Object({
        customerId: t.String({
            minLength: 2
        }),

    }),
    error({ error }: {  error:any }) {
        return {
            msg: error
        }
    },
}

export const employeeShowCustomerDetail = new Elysia()
    .use(isEmployeeAuthenticated)
    .get("/show-customer-detail",
        async function listLoanHttpHandler({
            set,
            employeeDecrypt,
            query:{customerId}
        }) {
            if(!employeeDecrypt){
                set.status = 401;
                return {
                    msg: "Unauthorized"
                }
            }

            const res= await EmployeeGetCustomerDetailRepo(customerId)
            if(res === undefined){
                set.status = 400;
                return {
                    msg:"Failed to query customer detail",
                    customer: null
                }
            }

            set.status = 200
            return {
                msg: "Ok",
                customer: res,
            }

        },
        ValidateManagerReport
    );
