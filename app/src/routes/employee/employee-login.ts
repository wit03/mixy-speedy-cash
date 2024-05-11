import { Elysia, t } from "elysia";
import { jwtAccessSetup, jwtEmployeeSetup } from "../setup";
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
    error({ code,error }: { code: string, error:any }) {
        switch (code) {
            case 'P2002':
                return {
                    msg: 'Email must be unique'
            }
            default:
                return {
                    msg: error
                }
        }
    },
}

export const employeeLogin = new Elysia()
    .use(jwtEmployeeSetup)
    .post("/sign-in",
        async function SignInHttpHandler({
            body,
            set,
            cookie: { employeeAuth },
            jwtEmployee
        }) {

            const {employee, error} = await EmployeeSignIn(body as EmployeeSigninReq)
            if(error !== undefined || employee === undefined){
                set.status = 401;
                return {
                    msg:error || "Email or password is incorrect",
                    employee: null
                }
            }
            if (employee) {
                
                set.status = 200;
                employeeAuth.set({
                    value: await jwtEmployee.sign(employee),
                    httpOnly: false,
                    maxAge: 7 * 86400,
                    path: '/',
                })
                
                return {
                    msg: "ok",
                    employee: employee,
                }
            }
        },
        ValidateSignin
    );
