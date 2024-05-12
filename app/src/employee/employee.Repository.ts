import { db } from ".."
import { EmployeeRegisterReq } from "./employee.type";

export async function InsertEmployeeRepo(body: EmployeeRegisterReq) {
    try {
        return await db.employee.create({
            data: {
                email: body.email,
                position: body.position,
                position: body.position,
                password: body.password,
                firstName: body.firstName,
                lastName: body.lastName,
                dateOfBirth: body.dateOfBirth,
                phoneNumber: body.phoneNumber,
                address: body.address,
                salary: body.salary,
            },
            select: {
                employeeId: true,
                position: true,
                email: true,
                firstName: true,
                lastName: true,
                dateOfBirth: true,
                phoneNumber: true,
                address: true,
                createdAt: true,
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function FindEmployeeByIdRepo(employeeId: string) {
    try {
        return await db.employee.findFirst({
            where: {
                employeeId: employeeId
            },
            select: {
                employeeId: true,
                position: true,
                email: true,
                firstName: true,
                lastName: true,
                dateOfBirth: true,
                phoneNumber: true,
                address: true,
                createdAt: true,
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function FindEmployeeByEmailRepo(email: string) {
    try {
        return await db.employee.findFirst({
            where: {
                email: email
            },
            select: {
                email: true,
                password: true,
                employeeId: true,
            }
        })
    } catch (_) {
        return undefined
    }
}


export async function CountCustomerAndAccount(): Promise<{ totalCustomers: number; totalAccounts: number } | undefined> {
    try {
        const counts = await db.$queryRaw<{totalcustomers:BigInt, totalaccounts:BigInt}[]>`
            SELECT
                (SELECT COUNT(*) FROM "Customer") AS totalcustomers,
                (SELECT COUNT(*) FROM "Account") AS totalaccounts
        `;
        if (counts) {
            const totalCustomers = Number(counts[0].totalcustomers);
            const totalAccounts = Number(counts[0].totalaccounts);
            return { totalCustomers, totalAccounts };
        } else {
            return undefined;
        }
    } catch (_) {
        return undefined;
    }
}




export async function ListAllEmployeeRepo() {
    try {
        return await db.employee.findMany({
            where:{
                position:"employee"
            },
            select:{
                firstName: true,
                lastName: true,
                employeeId: true,
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function AssignEmployeeRepo(loanId:string, employeeId:string) {
    try {
        return await db.loan.update({
            where:{
                loanId: loanId,
            },
            data:{
                responsibleEmployeeId: employeeId
            },
            select:{
                responsibleEmployeeId: true,
                loanId: true
            }
        })

    } catch (_) {
        return undefined
    }
}