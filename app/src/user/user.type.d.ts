import { CustomerType } from "@prisma/client";

export interface Customer {
    CustomerId: string;
    CustomerType: string;
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    DateOfBirth: string;
    PhoneNumber: string;
    Address: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface CustomerRegisterReq {
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    dateOfBirth:string;
    phoneNumber:string;
    customerType: CustomerType;
    address: string;
}

export interface CustomerSigninReq {
    email:string;
    password:string;
}