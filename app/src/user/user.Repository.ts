import { $Enums } from "@prisma/client";
import { db } from "..";
import { CustomerRegisterReq } from "./user.type";

// for insert customer when signup
async function InsertCustomer(body:CustomerRegisterReq): Promise<{
    CustomerId: string;
    CustomerType: $Enums.CustomerType;
    Email: string;
    FirstName: string;
    LastName: string;
    DateOfBirth: Date;
    PhoneNumber: string;
    Address: string;
    CreatedAt: Date;
}>
 {
   return await db.customer.create({
    data:{
        CustomerType:  body.customerType,
        Email: body.email,
        Password: body.password,
        FirstName: body.firstName,
        LastName: body.lastName,
        DateOfBirth: body.dateOfBirth,
        PhoneNumber: body.phoneNumber,
        Address: body.address,
    },
    select:{
        CustomerId: true,
        CustomerType: true,
        Email: true,
        FirstName: true,
        LastName: true,
        DateOfBirth: true,
        PhoneNumber: true,
        Address: true,
        CreatedAt : true,
    }
})
}


async function FindCustomerById(customerId:string) {
    return await db.customer.findFirst({
        where:{
            CustomerId: customerId
        },
        select: {
            CustomerId: true,
            CustomerType: true,
            Email: true,
            FirstName: true,
            LastName: true,
            DateOfBirth: true,
            PhoneNumber: true,
            Address: true,
            CreatedAt : true,
        }
    })
}

async function FindCustomerByEmail(email:string) {
    return await db.customer.findFirst({
        where:{
            Email: email
        },
        select: {
            Email:true,
            Password:true,
            CustomerId: true,
        }
    })
}



const userRepo = {
    SignUpRepo: InsertCustomer,
    FindCustomerByIdRepo: FindCustomerById,
    FindCustomerByEmailRepo: FindCustomerByEmail,
}

export default userRepo