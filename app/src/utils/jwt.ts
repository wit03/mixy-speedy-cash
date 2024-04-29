import { $Enums } from "@prisma/client";

export async function signJwt(jwt:any, data: {
    CustomerId: string;
    CustomerType: $Enums.CustomerType;
    Email: string;
    FirstName: string;
    LastName: string;
    DateOfBirth: Date;
    PhoneNumber: string;
    Address: string;
    CreatedAt: Date;
}) {
    return  await jwt.sign(data)
}

export async function verifyJwt (jwt:any, token:string): Promise<{
    CustomerId: string;
    CustomerType: $Enums.CustomerType;
    Email: string;
    FirstName: string;
    LastName: string;
    DateOfBirth: Date;
    PhoneNumber: string;
    Address: string;
    CreatedAt: Date;
}> {
    return await jwt.verify(token)
}