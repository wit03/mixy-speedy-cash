import { Context, t } from "elysia"
import { CustomerRegisterReq, CustomerSigninReq } from "./user.type";
import userUsecase from "./user.Usecase";
import { signJwt, verifyJwt } from "../utils/jwt";

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
            path: '/',

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
    error({ code }:{code:string}) {
        switch (code) {
            case 'P2002':
                return {
                    error: 'Email must be unique'
            }
        }
    },
}

async function SignInHttpHandler({
    body,
    set,
    cookie: {auth},
    jwt,
}:{
    body:CustomerSigninReq,
    set:Context["set"],
    cookie: {
        auth:any
    },
    jwt:any
}) {
        set.status = 200;
        const {customer, error} = await userUsecase.SignInUsecase(body)

        if(customer) {
            auth.set({
                value: await signJwt(jwt, customer),
                httpOnly: false,
                maxAge: 7 * 86400,
                path: '/',
            })
    
            return {
                "msg": "ok",
                "customer": customer,
            }
        }
        else {
            return {
                "msg": error || "no data afound",
            }
        }
}

async function CurrentCustomerttpHandler({
    body,
    set,
    cookie: {auth},
    jwt,
}:{
    body:CustomerSigninReq,
    set:Context["set"],
    jwt:any
    cookie: {
        auth:any
    }
}) {
    const token:string | undefined = auth?.initial?.value || undefined
    
    if(!token || token.length === 0){
        set.status = 200;
    }
    else {
        const parseData = await verifyJwt(jwt, token)
        const customer = await userUsecase.FindCustomerByIdUsecase(parseData.CustomerId)

        set.status = 200
        if(!customer){
            return {
                msg:"ok",
                customer: null
            }
        } else {
            return {
                msg:"ok",
                customer: customer
            }
        }
        
    }

}




const userHttp = {
    SignUpMethod: {
        validate: ValidateSignUp,
        func: SignUpHttpHandler
    },
    SignInMethod:{
        func: SignInHttpHandler,
        validate: ValidateSignin
    },
    CurrentCustomer:{
        func: CurrentCustomerttpHandler
    }
}

export default userHttp