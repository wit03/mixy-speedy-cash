import { Elysia, t } from "elysia";
import { jwtAccessSetup } from "../setup";
import { CustomerSignIn } from "../../customer/customer.Usecase";
import { CustomerSigninReq } from "../../customer/customer.type";


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

export const login = new Elysia()
    .use(jwtAccessSetup)
    .post(
        "/sign-in",
        async function SignInHttpHandler({
            body,
            set,
            cookie: { auth },
            jwtAccess,
        }) {
            set.status = 200;

            const {customer, error} = await CustomerSignIn(body as CustomerSigninReq)
            if(error !== undefined){
                return {
                    msg:error || "Email or password is incorrect",
                    customer: undefined
                }
            }
            if (customer) {
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
