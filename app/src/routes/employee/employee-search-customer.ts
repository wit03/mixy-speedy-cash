import { Elysia, t } from "elysia";
import { EmployeeSearchCustomerDetail} from "../../employee/employee.Usecase";
import { isEmployeeAuthenticated } from "../../middleware/authen";


const ValidateManagerReport = {
    query: t.Object({
        search: t.String({ default: "", }),
    }),
    error({ error }: {  error:any }) {
        return {
            msg: error
        }
    },
}

export const employeeSearchCustomer = new Elysia()
    .use(isEmployeeAuthenticated)
    .get("/search-customer",
        async function employeeSearchCustomerHttpHandler({
            set,
            employeeDecrypt,
            query:{search}
        }) {
            if(!employeeDecrypt){
                set.status = 401;
                return {
                    msg: "Unauthorized"
                }
            }
            else if(!search){
                set.status = 400;
                return {
                    msg: "Search is required"
                }
            }

            const {error, accounts, customer} = await EmployeeSearchCustomerDetail(search)
            if(error !== undefined){
                set.status = 400
                return {
                    msg: error || "Failed to get customer data",
                    accounts: null,
                    customer: null,
                }
            }
            
            set.status = 200
            return {
                msg: "Ok",
                accounts: accounts,
                customer: customer,
            }

        },
        ValidateManagerReport
    );
