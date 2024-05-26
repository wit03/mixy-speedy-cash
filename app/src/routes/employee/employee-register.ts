import { Context, Elysia, t } from "elysia";
import { jwtAccessSetup, jwtEmployeeSetup } from "../setup";
import { EmployeeSignUp  } from "../../employee/employee.Usecase";
import { EmployeeRegisterReq } from "../../employee/employee.type";


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
        address: t.String({
            minLength: 2,
        }),
        salary: t.Numeric({
            minLength: 2,
        }),
        position: t.String({
            minLenght: 2,
        })
    }),
    
    error({ code, set, error }: { code: string, set: Context["set"], error: any }) {
        switch (code) {
            case 'P2002':
                set.status = 422
                return {
                    msg: 'Email must be unique'
                }
            default: return {
                msg: error
            }
        }
    },
}

export const employeeRegister = new Elysia()
    .use(jwtEmployeeSetup)
    .post(
        "/sign-up",
        async function SignUpHttpHandler({
            body,
            set,
            cookie: { employeeAuth },
            jwtEmployee
        }) {
            if (body.position == "employee" || body.position == "manager") {
                set.status = 201;
                const { employee, error } = await EmployeeSignUp(body as EmployeeRegisterReq)
                if (error || !employee) {
                    return {
                        msg: error || "Register failed",
                        customer: undefined,
                    }
                }
                employeeAuth.set({
                    value: await jwtEmployee.sign(employee),
                    httpOnly: false,
                    maxAge: 7 * 86400,
                    path: '/',
                })

                return {
                    msg:"Ok",
                    employee: employee,
                }
            }
            else {
                set.status = 400
                return {
                    "msg": "employee type incorrect"
                }
            }
        },
        ValidateSignUp
    );