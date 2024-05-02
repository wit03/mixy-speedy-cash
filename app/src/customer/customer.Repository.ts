import { db } from "..";
import { CustomerRegisterReq } from "./customer.type";

// for insert customer when signup
export async function InsertCustomerRepo(body:CustomerRegisterReq){
  try {
    return await db.customer.create({
        data:{
            customerType:  body.customerType,
            email: body.email,
            password: body.password,
            firstName: body.firstName,
            lastName: body.lastName,
            dateOfBirth: body.dateOfBirth,
            phoneNumber: body.phoneNumber,
            address: body.address,
            career: body.career,
            citizenId: body.citizenId,
            salary: body.salary,
        },
        select:{
            customerId: true,
            customerType: true,
            email: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
            phoneNumber: true,
            address: true,
            createdAt : true,
        }
    })
  } catch (_) {
    return undefined
  }  
}

export async function DeleteCustomer(customerId:string) {
    try {
        return await db.customer.delete({
            where:{
                customerId: customerId
            },
        })
    } catch (_) {
        return undefined
    }
}


export async function FindCustomerByIdRepo(customerId:string) {
    try {
        return await db.customer.findFirst({
            where:{
                customerId: customerId
            },
            select: {
                customerId: true,
                customerType: true,
                email: true,
                firstName: true,
                lastName: true,
                dateOfBirth: true,
                phoneNumber: true,
                address: true,
                createdAt : true,
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function FindCustomerByEmailRepo(email:string) {
    try {
        return await db.customer.findFirst({
            where:{
                email: email
            },
            select: {
                email:true,
                password:true,
                customerId: true,
            }
        })
    } catch (_) {
        return undefined
    }
}
