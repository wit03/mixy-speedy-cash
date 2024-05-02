import { Context, Elysia, t } from "elysia";
import { jwtAccessSetup } from "../setup";
import { InsertEmployee } from "../../employee/employee.Usecase";


const ValidateSignUp = {
    body: t.Object({
        email: t.String({ 
            minLength: 2,
            format: "email"
        }),
      
    }),
    error({ code, set, error }: {code:string, set:Context["set"], error:any}) {
        switch (code) {
            case 'P2002':
                set.status = 422
                return {
                    msg: 'Email must be unique'
            }
            default: return {
                msg:error
            }
        }
    },
}

export const employeeRegister = new Elysia()
.use(jwtAccessSetup)
  .post(
    "/sign-up",
    async function SignUpHttpHandler({
        body,
        set,
        cookie: {auth, currentAccount},
        jwtAccess,
    }) {

        // validate
        // encrypt password
        // insert employee to db
        // encrypt employee token
        // set token
        // return employee data
        
        
        // call function from employee.Usecase

        await InsertEmployee("any thing can be here")

    },
    ValidateSignUp
);
