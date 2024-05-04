import { Elysia, t } from "elysia";
import { jwtAccessSetup } from "../setup";
import { EmployeeSignIn } from "../../employee/employee.Usecase";
import { EmployeeSigninReq } from "../../employee/employee.type";


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

export const employeeLogin = new Elysia()
    .use(jwtAccessSetup)
    .post("/sign-in",
        async function SignInHttpHandler({
            body,
            set,
            cookie: { auth, currentAccount },
            jwtAccess,
        }) {

            const {employee, error} = await EmployeeSignIn(body as EmployeeSigninReq)
            if(error !== undefined || employee === undefined){
                set.status = 401;
                return {
                    msg:error || "Email or password is incorrect",
                    employee: undefined
                }
            }
            if (employee) {
                
                set.status = 200;
                // auth.set({
                //     value: await jwtAccess.sign(employee),
                //     httpOnly: false,
                //     maxAge: 7 * 86400,
                //     path: '/',
                // })
                
                return {
                    msg: "ok",
                    employee: employee,
                }
            }
        },
        ValidateSignin
    );
