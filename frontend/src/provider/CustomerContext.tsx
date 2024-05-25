"use client"
import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { makeRequest } from '@/hook/makeRequets';
import toast from 'react-hot-toast';



const CustomerContext = createContext<CustomerContextType | null>(null);

export interface CustomerContextType {
    customerState: CustomerGlobalType;
    setCustomerState: React.Dispatch<React.SetStateAction<CustomerGlobalType>>;
}
  

export function useCustomer(): CustomerContextType | null {
  const context = useContext(CustomerContext);
  return context;
}
export interface AccountData {
    balance:   number;
    accountId: string;
}

export interface CustomerData {
    customerId:   string;
    customerType: string;
    email:        string;
    firstName:    string;
    lastName:     string;
    dateOfBirth:  string;
    phoneNumber:  string;
    address:      string;
    createdAt:    string;
}


export interface CustomerGlobalType {
    customer: CustomerData | undefined
    account: AccountData | undefined
}

// example context
// const {handleImageChange, handleSubmit, handleRemoveImage, CustomerGlobalType, state, handleRemoveExistBanner}:BannerContextType = useBanner?.()!;


export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
    const [customerState, setCustomerState] = useState<CustomerGlobalType>({
        customer:undefined,
        account: undefined
        // "customer": {
        //     "customerId": "cc2c3721-856a-4061-87bc-3f7295ccb03e",
        //     "customerType": "personal",
        //     "email": "dummy@gmail.com",
        //     "firstName": "mix1",
        //     "lastName": "jateassavapirom",
        //     "dateOfBirth": "2024-04-29T18:49:21.000Z",
        //     "phoneNumber": "0948652696",
        //     "address": "99/73 sirithorn",
        //     "createdAt": "2024-05-04T16:41:53.538Z"
        // }, 
        // "account": {
        //     "balance": 8000,
        //     "accountId": "294112511"
        // }
        })


    useEffect(() => {
        const auth:string | undefined = Cookies.get('auth');
        
        // console.log(typeof(auth) === "string", typeof(customerState.customer) !== "object")
        if (typeof auth === "string" && typeof(customerState.customer) !== "object") {
          LoadData();
        }

    }, [customerState.customer])
    
    async function LoadData() {
        const {data} = await makeRequest<{msg:string, customer:CustomerData, account:AccountData}>("http://localhost:3000/customer/current-customer", {
            method:"GET",
        })
        if (!data || !data?.customer || !data.account) {
            toast.error("failed to fetch customer data")
            return
        } 
        else {
          setCustomerState(prev => ({...prev, customer:data.customer, account:data.account}))
        }
    }


  return (
    
    <CustomerContext.Provider 
    value={{
      customerState,
      setCustomerState,
    }}>
      {children}
    </CustomerContext.Provider>
  );



};