import { $Enums } from "@prisma/client";
import { db } from "..";
import { CustomerRegisterReq } from "./customer.type";

// for insert customer when signup
export async function InsertCustomerRepo(body:CustomerRegisterReq): Promise<{
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

export async function DeleteCustomer(customerId:string) {
    return await db.customer.delete({
        where:{
            CustomerId: customerId
        },
    })
}


export async function FindCustomerByIdRepo(customerId:string) {
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

export async function FindCustomerByEmailRepo(email:string) {
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

//rth4065kzb0t2a0


