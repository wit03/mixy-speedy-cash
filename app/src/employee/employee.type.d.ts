import { EmployeeType } from "@prisma/client";

export interface Employee {
    EmployeeId: string;
    Position: string;
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    DateOfBirth: string;
    PhoneNumber: string;
    Address: string;
    Salary: number;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface EmployeeRegisterReq {
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    dateOfBirth:string;
    phoneNumber:string;
    address: string;
    salary:number;
}

export interface EmployeeSigninReq {
    email:string;
    password:string;
}