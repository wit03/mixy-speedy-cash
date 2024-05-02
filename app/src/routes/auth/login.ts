import { Elysia, t } from "elysia";
import { jwtAccessSetup } from "../setup";
import { CustomerSignIn } from "../../customer/customer.Usecase";
import { CustomerSigninReq } from "../../customer/customer.type";
import { FindOldestAccountIdByCustomerId } from "../../account/account.Repository";


const ValidateSignin = {
    body: t.Object({
        email: t.String({
            minLength: 2,
            format: "email"
        }),
        password: t.String({
            minLength: 2,
        }),
    }),
    error({ code }: { code: string }) {
        switch (code) {
            case 'P2002':
                return {
                    error: 'Email must be unique'
                }
        }
    },
}
// เตรีัยมของ หั่นผัก validate ข้อมูล
// ลงกระทะ business logic
// ผัด ต่อ db
export const login = new Elysia()
    .use(jwtAccessSetup)
    .post("/sign-in",
        async function SignInHttpHandler({
            body,
            set,
            cookie: { auth, currentAccount },
            jwtAccess,
        }) {

            const {customer, error} = await CustomerSignIn(body as CustomerSigninReq)
            if(error !== undefined){
                set.status = 401;
                return {
                    msg:error || "Email or password is incorrect",
                    customer: undefined
                }
            }
            if (customer) {
                
                // if do not have account selected
                if(!currentAccount.value){
                    const account = await FindOldestAccountIdByCustomerId(customer.CustomerId)
                    if(!account || !account.AccountId){
                        set.status = 401;
                        return {
                            msg: "Get oldest account failed",
                            customer: undefined,
                        }
                    }
                    currentAccount.set({
                        value: account?.AccountId,
                        httpOnly: false,
                        maxAge: 7 * 86400,
                        path: '/',
                    })
                }
                
                set.status = 200;
                auth.set({
                    value: await jwtAccess.sign(customer),
                    httpOnly: false,
                    maxAge: 7 * 86400,
                    path: '/',
                })
                
                return {
                    msg: "ok",
                    customer: customer,
                }
            }
            else {
                return {
                    msg: "no data found",
                    customer: undefined
                }
            }
        },
        ValidateSignin
    );
