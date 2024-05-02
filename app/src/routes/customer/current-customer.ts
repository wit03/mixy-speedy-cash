import { Elysia } from "elysia";
import { jwtAccessSetup } from "../setup";
import { FindCustomerByIdRepo } from "../../customer/customer.Repository";


export const currentCustomer = new Elysia()
.use(jwtAccessSetup)
  .get(
        "/current-customer",
    async function CurrentUserHttpHandler({
        set,
        cookie: {auth},
        jwtAccess,
    }) {
        
        const token:string | undefined = auth?.value || undefined
        set.status = 200
    
        if(!token || token.length === 0){
            return {
                msg:"ok",
                customer: undefined,
            }
        }
        else {
            const parseData = await jwtAccess.verify(token)
            if (!parseData){
                return {
                    msg:"ok",
                    customer:undefined
                }
            } 
            else {
                const customer = await FindCustomerByIdRepo(parseData.customerId)
        
                if(!customer){
                    return {
                        msg:"ok",
                        customer: undefined
                    }
                } else {
                    return {
                        msg:"ok",
                        customer: customer
                    }
                }

            }
            
        }
    },
);
