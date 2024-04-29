import { Context, t } from "elysia"
import { CustomerRegisterReq } from "./user.type";
import userUsecase from "./user.Usecase";



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
        customerType: t.String({
            minLength: 2,
            default: "Personal",
        }),
        address: t.String({
            minLength: 2,
        }),
    }),
    error({ code }:{code:string}) {
        switch (code) {
            case 'P2002':
                return {
                    error: 'Email must be unique'
                }
        }
    },
}

async function SignUpHttpHandler({
    body,
    set,
    cookie: {auth},
    jwt,
}:{
    body:CustomerRegisterReq,
    set:Context["set"],
    jwt:any
    cookie: {
        auth:any
    }
}) {
    // const {dateOfBirth, email, firstName, lastName, password, phoneNumber} = body;;
    
    if (body.customerType === "Company" || body.customerType === "Personal"){
        set.status = 201;
        const data = await userUsecase.SignUpUsecase(body)

        auth.set({
            value: await jwt.sign(data.customer),
            httpOnly: false,
            maxAge: 7 * 86400,
            path: '/profile',

        })

        return {
            "msg": "ok",
            "customer": data.customer,
        }
    }
    
    else {
        set.status = 400
        return {
            "msg": "customer type incoorect"
        }
    }
}


const userHttp = {
    SignUpMethod: {
        validate: ValidateSignUp,
        func: SignUpHttpHandler
    }
}

export default userHttp