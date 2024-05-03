import { CustomerType } from "@prisma/client";


export interface CustomerRegisterReq {
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    dateOfBirth:string;
    phoneNumber:string;
    customerType: CustomerType;
    address: string;
    career:string;
    salary:number;
    citizenId:string;
    pin:string;
}

export interface CustomerSigninReq {
    email:string;
    password:string;
}