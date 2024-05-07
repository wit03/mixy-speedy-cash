import { Elysia } from "elysia";
import { jwtAccessSetup } from "../setup";
import { FindCustomerByIdRepo } from "../../customer/customer.Repository";
import { FindAccountBalanceRepo } from "../../account/account.Repository";


export const currentCustomer = new Elysia()
.use(jwtAccessSetup)
  .get(
        "/current-customer",
    async function CurrentUserHttpHandler({
        set,
        cookie: {auth, currentAccount},
        jwtAccess,
    }) {
        
        const token:string | undefined = auth?.value || undefined
        set.status = 200
    
        if(!token || token.length === 0){
            return {
                msg:"No token found",
                customer: null,
            }
        }
        else {
            const parseData = await jwtAccess.verify(token)
            if (!parseData || !currentAccount.value){
                return {
                    msg:"Parse token failed",
                    customer:null
                }
            } 
            else {
                const customer = await FindCustomerByIdRepo(parseData.customerId)
                const account = await FindAccountBalanceRepo(String(currentAccount.value))
                if(!customer || !account){
                    return {
                        msg:"ok",
                        customer: null,
                        account: null
                    }
                } else {
                    return {
                        msg:"ok",
                        customer: customer,
                        account: account
                    }
                }

            }
            
        }
    },
);
