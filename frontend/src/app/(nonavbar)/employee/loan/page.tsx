"use client"
import { useEffect, useMemo, useState } from "react";
import DeclineTable from "./_component/DeclineTable";
import InDeptTable from "./_component/InDeptTable";
import WatingTable from "./_component/WatingTable";
import OnProcessTable from "./_component/onProcessTable";
import { makeRequest } from "@/hook/makeRequets";
import { AllStatusLoan, Loan } from "@/app/type/loan";
import toast from "react-hot-toast";

export type EmployeeRes = {
    firstName:  string;
    lastName:   string;
    employeeId: string;
}

export default function page({

}:{
    
})  {

    const [state, setState] = useState<{loans:AllStatusLoan, employee:EmployeeRes[], search: string}>({
        loans: {
            "decline": [], 
            "inDebt": [], 
            "onProcess": [], 
            "waiting": []
        },
        employee: [],
        search: "",
    })

    const searchLoans = (searchQuery: string): AllStatusLoan => {

        if (searchQuery.trim() === "") {
            return state.loans;
        }

        const filteredLoans: AllStatusLoan = {
            waiting: [],
            onProcess: [],
            decline: [],
            inDebt: []
        };

        Object.keys(state.loans).forEach(status => {
            const filteredStatusLoans = state.loans[status as keyof AllStatusLoan].filter(loan => {
                const { firstName, lastName } = loan.account.customer;

                return firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        lastName.toLowerCase().includes(searchQuery.toLowerCase());
            });

            filteredLoans[status as keyof AllStatusLoan] = filteredStatusLoans;
        });

        return filteredLoans;
    };
    

    const filterLoans = useMemo(() => {
        return searchLoans(state.search)
    }, [state.search, state.loans])

    useEffect(() => {
        GetLoanData()
        GetEmployee()
    }, [])

    async function GetLoanData() {
        const {data, error, status} = await makeRequest<{msg:string, loans:AllStatusLoan}>("http://localhost:3000/employee/list-loans?status=all", {
            method:"GET",
        })

        if(!data || error || status !== 200){
            toast.error("Failed to get loans data")
            return
        }

        setState(prev => ({...prev, 
            loans:{
                "decline": data.loans.decline || [],
                "inDebt": data.loans.inDebt || [],
                "onProcess": data.loans.onProcess || [],
                "waiting": data.loans.waiting || []
            },
        }))
    }

    async function GetEmployee() {
        const {data, error} = await makeRequest<{msg:string, employees:EmployeeRes[]}>("http://localhost:3000/employee/list-employee", {
            method:"GET"
        })
        if(!data || !data.employees || error){
            toast.error("Failed to list employee name")
            return
        }

        setState(prev => ({...prev, employee: data.employees}))
    }

    async function handleUpdateStatus(loanId:string, loanStatus:"waiting" | "onProcess" | "decline" | "inDebt", oldStatus:"waiting" | "onProcess" | "decline" | "inDebt", loanType:string) {

        const {data, error, status} = await makeRequest<{msg:string, loans:AllStatusLoan}>("http://localhost:3000/employee/patch-status-loan", {
            method:"PATCH",
            data:{
                loanId: loanId,
                status: loanStatus,
                type: loanType,
            }
        })
    
        if(!data || error){
            toast.error("Failed to update status")
            return
        }
    
        setState(prev => {
            const updatedLoans = { ...prev.loans };
            
            if (!updatedLoans[oldStatus]) {
                return prev;
            }
            
            const loanToMoveIndex = updatedLoans[oldStatus]!.findIndex((loan: Loan) => loan.loanId === loanId);
            
            if (loanToMoveIndex !== -1) {
                const loanToMove = { ...updatedLoans[oldStatus]![loanToMoveIndex] };
                
                updatedLoans[oldStatus]!.splice(loanToMoveIndex, 1);
                
                loanToMove.loanStatus = loanStatus;
                
                updatedLoans[loanStatus].push(loanToMove);
            }
        
            return {
                ...prev,
                loans: updatedLoans
            };
        });
    }
    async function AssingEmployeeId(loanId:string, employeeId:string) {
        if(employeeId === ""){
            toast.error("Failed to assign employee")
            return 
        }
        
        const {data, error, status} = await makeRequest<{msg:string, loan:{loanId:string, responsibleEmployeeId:string}}>("http://localhost:3000/employee/assign-employee", {
            method:"POST",
            data:{
                loanId: loanId,
                employeeId: employeeId
            }
        })

        if(!data || error){
            toast.error("Failed to update status")
            return
        }

        toast.success("Success to assign employee")

        setState(prev => {
            const updatedLoans = { ...prev.loans };
            // updatedLoans["waiting"]
            // if (!updatedLoans[oldStatus]) {
            //     return prev;
            // }
            
            const loanToMoveIndex = updatedLoans["waiting"]!.findIndex((loan: Loan) => loan.loanId === loanId);
            console.log(loanToMoveIndex)
            if (loanToMoveIndex === -1) {
                return {
                    ...prev,
                    loans: updatedLoans
                };
                
            }
            console.log(employeeId, data.loan.responsibleEmployeeId)
            updatedLoans["waiting"][loanToMoveIndex].responsibleEmployeeId = data.loan.responsibleEmployeeId
        
            return {
                ...prev,
                loans: updatedLoans
            };
        });

    }

    // console.log(state.loans)


    return (

        <div className="flex flex-col gap-4 px-10 pt-7"> 
            <div className="grid grid-flow-row grid-cols-4 gap-7 font-rubik">
                <div className="flex flex-col items-center justify-center py-2 gap-2 rounded-md shadow-md bg-amber-200">
                    <h5 className="text-xl font-normal">Waiting</h5>
                    <h6 className="text-2xl font-normal">{state.loans.waiting.length}</h6>
                </div>
                <div className="flex flex-col items-center justify-center py-2 gap-2 rounded-md shadow-md bg-green-200">
                    <h5 className="text-xl font-normal">On Process</h5>
                    <h6 className="text-2xl font-normal">{state.loans.onProcess.length}</h6>
                </div>
                <div className="flex flex-col items-center justify-center py-2 gap-2 rounded-md shadow-md bg-red-200">
                    <h5 className="text-xl font-normal">In Debt</h5>
                    <h6 className="text-2xl font-normal">{state.loans.inDebt.length}</h6>
                </div>
                <div className="flex flex-col items-center justify-center py-2 gap-2 rounded-md shadow-md bg-rose-400">
                    <h5 className="text-xl font-normal">Decline</h5>
                    <h6 className="text-2xl font-normal">{state.loans.decline.length}</h6>
                </div>
            </div>

            <div className="grid grid-flow-row gap-7 mt-8">
                <input
                value={state.search}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, search:e.target.value}))}
                className="p-3 rounded-md outline-purple-300 placeholder:text-sm placeholder:font-normal"
                placeholder="Search customer name"
                />
            </div>

            {/* <button className="flex items-center gap-1 bg-purple-400 px-4 py-2 text-white rounded-lg hover:bg-purple-400/80 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M19.34 20.6886L13.2579 14.6064C12.7752 14.9926 12.2201 15.2983 11.5925 15.5236C10.965 15.7488 10.2973 15.8615 9.5893 15.8615C7.83546 15.8615 6.35129 15.2539 5.1368 14.0388C3.9223 12.8236 3.31473 11.3394 3.31409 9.58625C3.31344 7.83305 3.92101 6.34888 5.1368 5.13374C6.35258 3.9186 7.83675 3.31104 9.5893 3.31104C11.3419 3.31104 12.8264 3.9186 14.0428 5.13374C15.2592 6.34888 15.8665 7.83305 15.8645 9.58625C15.8645 10.2942 15.7519 10.962 15.5266 11.5895C15.3014 12.217 14.9956 12.7721 14.6095 13.2548L20.6916 19.337L19.34 20.6886ZM9.5893 13.9306C10.7961 13.9306 11.822 13.5084 12.6671 12.664C13.5121 11.8196 13.9343 10.7937 13.9337 9.58625C13.933 8.37884 13.5108 7.35324 12.6671 6.50946C11.8233 5.66569 10.7974 5.24316 9.5893 5.24187C8.38124 5.24058 7.35565 5.66312 6.51252 6.50946C5.66939 7.35581 5.24685 8.38141 5.24492 9.58625C5.24299 10.7911 5.66552 11.817 6.51252 12.664C7.35951 13.511 8.38511 13.9332 9.5893 13.9306Z" fill="white"/>
                </svg>
                <h6 className="text-base font-normal">Search</h6>
            </button> */}

            <WatingTable
              employees={state.employee}
              loanData={filterLoans.waiting}
              handleUpdateStatus={handleUpdateStatus}   
              AssingEmployeeId={AssingEmployeeId}         
            />
            <OnProcessTable 
            loanData={filterLoans.onProcess}
            handleUpdateStatus={handleUpdateStatus}            
            />
            <InDeptTable
            handleUpdateStatus={handleUpdateStatus}            
            loanData={filterLoans.inDebt}
            />
            <DeclineTable
            handleUpdateStatus={handleUpdateStatus}            
            loanData={filterLoans.decline}
            />

        </div>

    )

}
