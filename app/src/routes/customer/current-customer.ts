import { Elysia, t } from "elysia";
import customerRepo from "../../customer/customer.Repository";
import { jwtAccessSetup } from "../setup";


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
                const customer = await customerRepo.FindCustomerByIdRepo(parseData.CustomerId)
        
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
