"use client"

import { Circular } from "@/app/components/Loading/Circular";
import { makeRequest } from "@/hook/makeRequets";
import { useState } from "react"
import toast from "react-hot-toast";
interface Employee {
    employeeId: string;
    position: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    createdAt: string;
}

export default function page({

}: {

    }) {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        phoneNumber: string;
        address: string;
        position: string;
        salary: number;
    }>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        phoneNumber: "",
        address: "",
        position: "",
        salary: 0,
        // email: "mixxy@gmail.com",
        // password: "123",
        // firstName: "chits",
        // lastName: "jate",
        // dateOfBirth: "",
        // phoneNumber: "0948652696",
        // address: "99/73",
        // position: "employee",
        // salary: 1000,
    })

    async function handleCreateEmployee(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const { address, dateOfBirth, email, firstName, lastName, password, phoneNumber, position, salary } = state
        if (address && dateOfBirth &&
            email &&
            firstName &&
            lastName &&
            password &&
            phoneNumber &&
            position &&
            salary
        ) {
            setLoading(true)
            const { data, error, status } = await makeRequest<{
                msg: string;
                employee: Employee;
            }>(`http://localhost:3000/employee/sign-up`, {
                method: "POST",
                data: {
                    email: state.email,
                    password: state.password,
                    firstName: state.firstName,
                    lastName: state.lastName,
                    dateOfBirth: new Date(state.dateOfBirth).toISOString(),
                    phoneNumber: state.phoneNumber,
                    address: state.address,
                    salary: state.salary,
                    position: state.position,
                }
            })
            setLoading(false)
            if (!data || error || status !== 200) {
                if (error?.data.msg) {
                    toast.error(error?.data.msg || "Failed to create employee")
                    return
                }
                else {
                    toast.success("Create employee success")
                    return
                }
            }
        }
        else {
            toast.error("All input is required")
        }
    }

    return (

        <>
            <Circular
                loading={loading}
            />
            <div className="flex flex-col gap-4 px-10 pt-7 ">
                <div className="bg-white flex flex-col gap-4 p-4">
                    <h6 className="text-2xl font-medium text-gray-700 my-4">Create New Employee Account</h6>
                    <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                        <div>
                            <h6 className="text-base font-normal text-gray-600">First Name</h6>
                            <input
                                placeholder="first name"
                                type="text"
                                className="w-full p-3 rounded-md outline-purple-300 placeholder:text-sm placeholder:font-normal border border-purple-400"
                                value={state.firstName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, firstName: e.target.value }))}
                            />
                        </div>

                        <div>
                            <h6 className="text-base font-normal text-gray-600">Last Name</h6>
                            <input
                                placeholder="last name"
                                type="text"
                                className="w-full p-3 rounded-md outline-purple-300 placeholder:text-sm placeholder:font-normal border border-purple-400"
                                value={state.lastName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, lastName: e.target.value }))}
                            />
                        </div>
                        <div>
                            <h6 className="text-base font-normal text-gray-600">Email</h6>
                            <input
                                placeholder="email"
                                type="text"
                                className="w-full p-3 rounded-md outline-purple-300 placeholder:text-sm placeholder:font-normal border border-purple-400"
                                value={state.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>

                        <div>
                            <h6 className="text-base font-normal text-gray-600">Password</h6>
                            <input
                                placeholder="password"
                                type="password"
                                className="w-full p-3 rounded-md outline-purple-300 placeholder:text-sm placeholder:font-normal border border-purple-400"
                                value={state.password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, password: e.target.value }))}
                            />
                        </div>
                        <div>
                            <h6 className="text-base font-normal text-gray-600">Date of Birth</h6>
                            <input
                                placeholder="DOB"
                                type="date"
                                className="w-full p-3 rounded-md outline-purple-300 placeholder:text-sm placeholder:font-normal border border-purple-400"
                                value={state.dateOfBirth}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            />
                        </div>

                        <div>
                            <h6 className="text-base font-normal text-gray-600">Phone Number</h6>
                            <input
                                placeholder="Phone number"
                                type="text"
                                className="w-full p-3 rounded-md outline-purple-300 placeholder:text-sm placeholder:font-normal border border-purple-400"
                                value={state.phoneNumber}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, phoneNumber: e.target.value }))}
                            />
                        </div>
                        <div>
                            <h6 className="text-base font-normal text-gray-600">Salary</h6>
                            <input
                                placeholder="Salary"
                                type="number"
                                className="w-full p-3 rounded-md outline-purple-300 placeholder:text-sm placeholder:font-normal border border-purple-400"
                                value={state.salary}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, salary: Number(e.target.value) }))}
                            />
                        </div>
                    </div>



                    <div>
                        <h6 className="text-base font-normal text-gray-600">Address</h6>
                        <textarea cols={3}
                            className="border rounded-md p-2 w-full outline-purple-300 border-purple-300"
                            value={state.address}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setState(prev => ({ ...prev, address: e.target.value }))}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleCreateEmployee}
                        className="relative w-full h-[2.31rem] bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-rubik text-center inline-block">
                        Create Employee Account
                    </button>

                </div>
            </div>
        </>

    )

}
