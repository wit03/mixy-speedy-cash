"use client"
import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { makeRequest } from '@/hook/makeRequets';
import { useRouter, usePathname } from 'next/navigation'


const EmployeeContext = createContext<EmployeeContextType | null>(null);

export interface EmployeeContextType {
    globalState: GlobalState;
    setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}
  

export function useEmployee(): EmployeeContextType | null {
  const context = useContext(EmployeeContext);
  return context;
}

export type EmployeeData = {
    employeeId:  string;
    position:    string;
    email:       string;
    firstName:   string;
    lastName:    string;
    dateOfBirth: string;
    phoneNumber: string;
    address:     string;
    createdAt:   string;
}

interface GlobalState {
    employee: EmployeeData | undefined
}

// example context
// const {handleImageChange, handleSubmit, handleRemoveImage, setGlobalState, state, handleRemoveExistBanner}:BannerContextType = useBanner?.()!;


export const EmployeeProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const pathName = usePathname();

    const [globalState, setGlobalState] = useState<GlobalState>({
        employee:undefined
        // "employee": {
        //     "employeeId": "0755a314-ba02-4db4-bb51-b537320bcf2a",
        //     "position": "owner",
        //     "email": "owner@gmail.com",
        //     "firstName": "admin",
        //     "lastName": "last name",
        //     "dateOfBirth": "2024-05-08T09:45:26.565Z",
        //     "phoneNumber": "0948652696",
        //     "address": "onwer address",
        //     "createdAt": "2024-05-08T09:45:26.615Z"
        // }
    })


    useEffect(() => {
       if(!pathName.includes("/login")){

          const employeeAuth:string | undefined = Cookies.get('employeeAuth');
           
           // console.log(typeof(employeeAuth) === "string", typeof(globalState.employee) !== "object")
          if (typeof employeeAuth === "string" && typeof(globalState.employee) !== "object") {
            LoadData();
          }
       }

    }, [globalState.employee])
    
    async function LoadData() {
        const {data} = await makeRequest<{msg:string, employee:EmployeeData}>("http://localhost:3000/employee/current-employee", {
            method:"GET",
        })
        if (!data || !data?.employee) {
            router.push("/")
            return
        } 
        else {
            setGlobalState(prev => ({...prev, employee:data.employee}))
        }
    }


  return (
    
    <EmployeeContext.Provider 
    value={{
      globalState,
      setGlobalState,
    }}>
      {children}
    </EmployeeContext.Provider>
  );



};