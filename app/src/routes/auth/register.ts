import { Context, Elysia, t } from "elysia";
import { CustomerRegisterReq } from "../../customer/customer.type";
import { jwtAccessSetup } from "../setup";
import { CustomerSignUp } from "../../customer/customer.Usecase";


const ValidateSignUp = {
    body: t.Object({
        email: t.String({ 
            minLength: 2,
            format: "email"
        }),
        password: t.String({
            minLength: 2,
        }),
        firstName: t.String({
            minLength: 2,
        }),
        lastName: t.String({
            minLength: 2,
        }),
        dateOfBirth: t.String({
            minLength: 2,
        }),
        phoneNumber: t.String({
            minLength: 2,
        }),
        career: t.String({
            minLength: 2,
        }),
        salary: t.Number({
            minimum: 0,
        }),
        citizenId: t.String({
            minLength: 2,
        }),
        customerType: t.String({
            minLength: 2,
            default: "Personal",
        }),
        address: t.String({
            minLength: 2,
        }),
        pin: t.String({
            minLength: 2,
        }),
    }),
    error({ code, set }: {code:string, set:Context["set"]}) {
        
        switch (code) {
            case 'P2002':
                set.status = 422
                return {
                    error: 'Email must be unique'
                }
        }
    },
}

export const register = new Elysia()
.use(jwtAccessSetup)
  .post(
    "/sign-up",
    async function SignUpHttpHandler({
        body,
        set,
        cookie: {auth, currentAccount},
        jwtAccess,
    }) {
        // register
        // validate
        // hash password
        // insert database
        if (body.customerType === "Company" || body.customerType === "Personal"){
            set.status = 201;
            const {customer, error, account} = await CustomerSignUp(body as CustomerRegisterReq)
            if(error || !customer || !account) {
                return {
                    msg: error || "Register failed",
                    customer: undefined,
                    account: undefined
                }
            }

            if(!account || !account.AccountId){
                set.status = 401;
                return {
                    msg: "Create account failed",
                    customer: undefined,
                }
            }
            currentAccount.set({
                value: account?.AccountId,
                httpOnly: false,
                maxAge: 7 * 86400,
                path: '/',
            })
 
            auth.set({
                value: await jwtAccess.sign(customer),
                httpOnly: false,
                maxAge: 7 * 86400,
                path: '/',
            })
            return {
                msg: "ok",
                customer: customer,
                account: account
            }
        }
        
        else {
            set.status = 400
            return {
                "msg": "customer type incoorect"
            }
        }
    },
    ValidateSignUp
);
