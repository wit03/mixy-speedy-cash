import { $Enums } from "@prisma/client";
import { db } from "..";
import { CustomerRegisterReq } from "./user.type";

// for insert customer when signup
async function InsertCustomer(body:CustomerRegisterReq): Promise<{
    CustomerId: string;
    CustomerType: $Enums.CustomerType;
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    DateOfBirth: Date;
    PhoneNumber: string;
    Address: string;
    CreatedAt: Date;
    UpdatedAt: Date;
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
    }
   })
}
















const userRepo = {
    SignUpRepo: InsertCustomer
}

export default userRepo