import { Elysia, t } from "elysia";
import { isAuthenticated } from "../../middleware/authen";
import { FindCustomerManyAccountsRepo } from "../../account/account.Repository";


const ValidateListAccounts = {
   
    error({ error }: { error:any }) {
        return {
            msg: error
        }
    },
}
export const listCustomerAccounts = new Elysia()
    .use(isAuthenticated)
    .get("/list-customer-accounts",
        async function ListAccounts({
            set,
            customerDecrypt
        }) {

            if(!customerDecrypt){
                set.status = 401
                return {
                    error: "unathorized",
                    accounts: null
                }
            } 
            const data = await FindCustomerManyAccountsRepo(customerDecrypt.customerId)

            if(!data){
                set.status = 400
                return {
                    msg: "List all accounts failed",
                    accounts: null
                }
            }
            set.status = 200
            return {
                msg: "ok",
                accounts: data
            }

        },
       ValidateListAccounts
);

