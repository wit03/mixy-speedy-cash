import { db } from ".."
import { EmployeeRegisterReq } from "./employee.type";

export async function InsertEmployeeRepo(body: EmployeeRegisterReq) {
    try {
        return await db.employee.create({
            data: {
                email: body.email,
                position: "employee",
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