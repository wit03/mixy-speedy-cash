"use client"
import Profile from "../components/profile";
import Balance from "../components/balance";
import Transactions from "../components/transactions";
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { makeRequest } from "@/hook/makeRequets";
import toast from "react-hot-toast";
import { Circular } from "../components/Loading/Circular";
import { formatTime } from "@/utils/convertTime";
import PinField from "react-pin-field";
import { EmployeeContextType, useEmployee } from "@/provider/EmployeeContext";
import { useRouter } from "next/navigation";

interface Account {
  accountId: string;
  createdAt: Date;
}


interface ResAccount {
  accountId:     string;
  accountStatus: string;
  balance:       number;
  accountType:   string;
}

export interface TransactionAccount {
  amount:          number;
  detail:          string;
  transactionDate: string;
  transactionId:   string;
  sender:          string;
  reciever:        string;
}


export default function Home() {
  const { customerState, setCustomerState }: CustomerContextType = useCustomer?.()!;

  const [state, setState] = useState<{ open: boolean, accounts: Account[], addAccountOpen: boolean, step:string, pinIndex:number, transactions: TransactionAccount[] }>({
    open: false,
    accounts: [],
    addAccountOpen: false,
    step: "initial",
    pinIndex: 0,
    transactions: []
  })
  const pinRef: React.MutableRefObject<null> = useRef(null)
  const [loading, setLoading] = useState(false)

  async function handleListCustomerAccount() {
    setLoading(true)
    const { data, error, status } = await makeRequest<{
      msg: string;
      accounts: Account[];
    }>("http://localhost:3000/account/list-customer-accounts", {
      method: "GET",

    })
    if (!data || error || status !== 200) {
      setLoading(false)
      toast.error(data?.msg || "Failed to put your loan to consider state")
      return
    }
    else {
      setState(prev => ({ ...prev, accounts: data.accounts }))
      setLoading(false)
      return
    }
  }

  
  useEffect(() => {
    handleListCustomerAccount()
  }, [])

  async function SubmitAddAccount(e:React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    setState(prev => ({...prev, step:"pin"}))

  }

  async function handlePressPinByMouse(value: number) {
    if (state.pinIndex <= 5) {
        //@ts-ignore
        pinRef.current[state.pinIndex].value = value
        if (state.pinIndex + 1 === 6) {
            let pin = ""
            //@ts-ignore
            pinRef.current.forEach(input => (pin = pin + input.value));
            //@ts-ignore
            pinRef.current.forEach(input => (input.value = ""));
            await TransferMoney(pin)
            setState(prev => ({ ...prev, pinIndex: 0 }))
        }
        else {
            setState(prev => ({ ...prev, pinIndex: prev.pinIndex + 1 }))
        }
    }
  }

  async function TransferMoney(pin: string) {
    setLoading(true)
    const { data, error, status } = await makeRequest<{
      msg:     string;
      account: ResAccount;
    }>("http://localhost:3000/account/add-account", {
      method: "POST",
      data: {
        pin: pin
      }
    })
    setLoading(false)
    if (!data || error || status !== 200) {
      if (error?.data.msg) {
        toast.error(error?.data.msg || "Failed to pay loan, fill pin again")
            return
        }
        else {
            toast.error("Failed to pay loan, fill pin again")
            return
        }
    }

    setCustomerState(prev => ({...prev, account:{
      accountId: data.account.accountId,
      balance: data.account.balance,
    }}))
    setState(prev => ({...prev, open:false, addAccountOpen: false, step:"initial", pinIndex:0}))
  }

  async function handleChangeAccount(accountId:string) {
    setLoading(true)
    const { data, error, status } = await makeRequest<{
      msg:     string;
      account: ResAccount;
    }>("http://localhost:3000/account/change-account?accountId=" + accountId, {
      method: "GET",
    })
    setLoading(false)
    if (!data || error || status !== 200) {
      if (error?.data.msg) {
          toast.error(error?.data.msg || "Failed to pay loan, fill pin again")
          return
        }
        else {
          toast.error("Failed to pay loan, fill pin again")
          return
        }
    }

    setCustomerState(prev => ({...prev, account:{
      accountId: data.account.accountId,
      balance: data.account.balance,
    }}))
    
    setState(prev => ({...prev, open:false, addAccountOpen: false, step:"initial", pinIndex:0}))

  }

  async function GetTransactions() {
    setLoading(true)
    const { data, error, status } = await makeRequest<{
      msg:          string;
      transactions: TransactionAccount[];
    }>(`http://localhost:3000/transaction/list-transactions?limit=${"10"}&skip=${"0"}` , {
      method: "GET",
    })
    setLoading(false)
    if (!data || error || status !== 200) {
      if (error?.data.msg) {
          toast.error(error?.data.msg || "Failed to list all transaction in an accounts")
          return
        }
        else {
          toast.error("Failed to list all transaction in an accounts")
          return
        }
    }
    setState(prev => ({...prev, transactions: data.transactions}))
  }


  useEffect(() => {
    GetTransactions()
  }, [customerState.account])
  

  return (
    <div className="flex flex-col items-start mx-6 mt-14 mb-6">
      <Circular
        loading={loading}
      />
      {customerState.customer && customerState.account ?
        <>
        {state.step === "initial" && 
        <>
        <svg className="absolute top-0 right-0" xmlns="http://www.w3.org/2000/svg" width="124" height="126" viewBox="0 0 124 126" fill="none">
          <circle cx="100" cy="26" r="100" fill="#F8E192" />
        </svg>

        <div className="absolute top-4 right-4 z-10 ">
        <svg fill="#000000" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 611.999 611.999">
          <g>
            <g>
              <g>
                <path d="M570.107,500.254c-65.037-29.371-67.511-155.441-67.559-158.622v-84.578c0-81.402-49.742-151.399-120.427-181.203
                  C381.969,34,347.883,0,306.001,0c-41.883,0-75.968,34.002-76.121,75.849c-70.682,29.804-120.425,99.801-120.425,181.203v84.578
                  c-0.046,3.181-2.522,129.251-67.561,158.622c-7.409,3.347-11.481,11.412-9.768,19.36c1.711,7.949,8.74,13.626,16.871,13.626
                  h164.88c3.38,18.594,12.172,35.892,25.619,49.903c17.86,18.608,41.479,28.856,66.502,28.856
                  c25.025,0,48.644-10.248,66.502-28.856c13.449-14.012,22.241-31.311,25.619-49.903h164.88c8.131,0,15.159-5.676,16.872-13.626
                  C581.586,511.664,577.516,503.6,570.107,500.254z M484.434,439.859c6.837,20.728,16.518,41.544,30.246,58.866H97.32
                  c13.726-17.32,23.407-38.135,30.244-58.866H484.434z M306.001,34.515c18.945,0,34.963,12.73,39.975,30.082
                  c-12.912-2.678-26.282-4.09-39.975-4.09s-27.063,1.411-39.975,4.09C271.039,47.246,287.057,34.515,306.001,34.515z
                  M143.97,341.736v-84.685c0-89.343,72.686-162.029,162.031-162.029s162.031,72.686,162.031,162.029v84.826
                  c0.023,2.596,0.427,29.879,7.303,63.465H136.663C143.543,371.724,143.949,344.393,143.97,341.736z M306.001,577.485
                  c-26.341,0-49.33-18.992-56.709-44.246h113.416C355.329,558.493,332.344,577.485,306.001,577.485z"/>
                <path d="M306.001,119.235c-74.25,0-134.657,60.405-134.657,134.654c0,9.531,7.727,17.258,17.258,17.258
                  c9.531,0,17.258-7.727,17.258-17.258c0-55.217,44.923-100.139,100.142-100.139c9.531,0,17.258-7.727,17.258-17.258
                  C323.259,126.96,315.532,119.235,306.001,119.235z"/>
              </g>
            </g>
          </g>
          </svg>
        </div>

        <Profile
          customer={customerState.customer}
        />
        <div className="mt-6" />
        <div className="relative w-full">
          <Balance
            customer={customerState.customer}
            account={customerState.account}
          />

          <div className="absolute top-4 right-4">
            <div className="flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => setState(prev => ({ ...prev, open: true }))}
            >
              <div className="flex flex-col gap-1">
                <h6 className="text-sm font-normal text-gray-600">My Account</h6>
                <h6 className="text-xs font-normal text-gray-600">{`${customerState.account.accountId.slice(0, 3)}-${customerState.account.accountId.slice(3, 6)}-${customerState.account.accountId.slice(6)}`}</h6>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 8.24998L2.25 4.49998L2.775 3.97498L6 7.19998L9.225 3.97498L9.75 4.49998L6 8.24998Z" fill="black" />
              </svg>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 my-4 w-full">
          <Link
            href={"/report"}
            className="p-2 w-full
      bg-gradient-to-r from-[#90abda] to-[rgba(122,93,186,0.2)] border border-solid 
      box-border rounded-md text-white
      text-14 tracking-0.02 font-rubik text-center inline-block hover:opacity-90
      ">
            Report
          </Link>
          <Link
            href={"/show-loan"}
            className="p-2 w-full
      bg-gradient-to-r from-[#da90bf] to-[rgba(122,93,186,0.2)] border border-solid 
      box-border rounded-md text-white
      text-14 tracking-0.02 font-rubik text-center inline-block hover:opacity-90
      ">
            Loans
          </Link>
        </div>

        <svg className="absolute bottom-80 left-0 z-0" xmlns="http://www.w3.org/2000/svg" width="128" height="200" viewBox="0 0 128 200" fill="none">
          <circle cx="28" cy="100" r="100" fill="#2FCBFC" fillOpacity="0.3" />
        </svg>
        <Transactions 
        transactions={state.transactions}
        accountId={customerState.account.accountId}
        />

        <Transition appear show={state.open} as={Fragment}>
          <Dialog
            open={state.open}
            as="div"
            className="flex lg:hidden relative z-40 "
            onClose={(val) => setState(prev => ({ ...prev, open: val }))}
          >
            <div className="fixed inset-0 bg-black/25" />

            <div className="fixed inset-0 overflow-y-auto h-full w-screen">
              <div className="flex h-full  items-center justify-center text-center ">
                <Transition.Child
                  as={Fragment}
                  enter="duration-500"
                  enterFrom="- opacity-0"
                  enterTo=" opacity-100"
                  leave="ease-out duration-500"
                  leaveFrom=""
                  leaveTo=""
                >
                  <DialogPanel className="max-h-screen overflow-y-auto w-full max-w-md rounded-xl p-6 bg-white">
                    <DialogTitle as="div" className="flex justify-between text-xl font-medium text-gray-800">
                      <h6>Accounts</h6>
                      <h6 className="cursor-pointer" onClick={() => setState(prev => ({ ...prev, open: false }))}>X</h6>
                    </DialogTitle>
                    <div className="flex flex-col gap-2 mt-4">
                      {state.accounts.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => handleChangeAccount(item.accountId)}
                          className={`flex justify-between p-4 rounded-xl border ${customerState.account?.accountId === item.accountId && "border-indigo-500 cursor-not-allowed"}`}>
                          <h6 className="text-base font-medium text-gray-700">{`${item.accountId.slice(0, 3)}-${item.accountId.slice(3, 6)}-${item.accountId.slice(6)}`}</h6>
                          <h6 className="text-base font-medium text-gray-700">{formatTime(item.createdAt.toString())}</h6>
                        </div>
                      ))}
                    </div>
                    <button
                      className="z-10 cursor-pointer float-end hover:opacity-95 mx-auto relative px-4 py-2 mt-4  bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-bold text-center inline-block"
                      onClick={() => setState(prev => ({ ...prev, addAccountOpen: true, }))}
                    >
                      Add Accounts
                    </button>

                  </DialogPanel>
                </Transition.Child>
              </div>
            </div>
            <Transition appear show={state.addAccountOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-50 lg:hidden"
                onClose={(val) => setState(prev => ({ ...prev, addAccountOpen: false }))}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/25 z-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto z-50">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <DialogPanel className="max-h-screen overflow-y-auto w-full max-w-md z-50 rounded-xl p-6 bg-white">
                        <DialogTitle as="div" className="flex justify-between text-xl font-medium text-gray-800">
                          <h6>Confirm add accounts</h6>
                          <h6 className="cursor-pointer" onClick={() => setState(prev => ({ ...prev, addAccountOpen: false }))}>X</h6>
                        </DialogTitle>
                        <h6 className="text-start mt-2">Your account firstly will have 1,000 in account</h6>
                        <button
                          className="float-end hover:opacity-95 mx-auto relative px-4 py-2 mt-4  bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-bold text-center inline-block"
                          onClick={SubmitAddAccount}
                        >
                          Confirm
                        </button>
                      </DialogPanel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </Dialog>
        </Transition>
        </>
        }

        {state.step === "pin" && 
             <div className="mx-auto">
             <div className="flex flex-col items-center justify-center mt-4">
                 <div className="relative ">
                     <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
                         <circle cx="55" cy="55" r="53.5" fill="#F5F5F5" stroke="#87D2F8" strokeWidth="3" />
                     </svg>
                     <div className="absolute top-[1.4rem] left-[1.37rem]">
                         <svg xmlns="http://www.w3.org/2000/svg" width="68" height="65" viewBox="0 0 68 65" fill="none">
                             <path d="M17.4315 59.377C15.9127 59.377 14.613 58.8524 13.5324 57.8034C12.4518 56.7543 11.9105 55.4916 11.9087 54.0154V27.2077C11.9087 25.7333 12.4499 24.4716 13.5324 23.4225C14.6149 22.3734 15.9146 21.848 17.4315 21.8462H20.1929V16.4847C20.1929 12.7763 21.5396 9.61563 24.2329 7.00278C26.9262 4.38992 30.1819 3.0826 34 3.08081C37.8181 3.07903 41.0748 4.38635 43.7699 7.00278C46.465 9.61921 47.8108 12.7798 47.8071 16.4847V21.8462H50.5685C52.0873 21.8462 53.3879 22.3716 54.4704 23.4225C55.5529 24.4734 56.0932 25.7351 56.0913 27.2077V54.0154C56.0913 55.4899 55.551 56.7525 54.4704 57.8034C53.3898 58.8542 52.0891 59.3788 50.5685 59.377H17.4315ZM34 45.9731C35.5188 45.9731 36.8194 45.4486 37.9019 44.3995C38.9844 43.3504 39.5247 42.0878 39.5228 40.6116C39.521 39.1354 38.9807 37.8736 37.9019 36.8263C36.8231 35.7791 35.5225 35.2536 34 35.25C32.4776 35.2465 31.1778 35.7719 30.1009 36.8263C29.0239 37.8808 28.4827 39.1425 28.4772 40.6116C28.4717 42.0806 29.0129 43.3433 30.1009 44.3995C31.1889 45.4557 32.4886 45.9803 34 45.9731ZM25.7158 21.8462H42.2843V16.4847C42.2843 14.2507 41.4788 12.3518 39.868 10.788C38.2572 9.22424 36.3012 8.44235 34 8.44235C31.6988 8.44235 29.7428 9.22424 28.132 10.788C26.5212 12.3518 25.7158 14.2507 25.7158 16.4847V21.8462Z" fill="#87D2F8" />
                         </svg>
                     </div>
                 </div>
                 <h6 className="mt-12 text-2xl text-gray-800 font-medium">
                     Please fill up pin for this account
                 </h6>
             </div>

             <div className="flex flex-col items-center justify-center gap-4 mt-10">
                 <div className="flex items-center mx-auto gap-3">
                     <PinField
                         className="h-12 w-12
                         text-3xl text-gray-800 font-bold
                         relative text-center outline-purple-500 decoration-[#a5a5a5] rounded-md bg-[#f5f5f5] border-4 border-solid border-[#8351F433] box-border shadow-md tracking-0.02 focus:ring-purple-600"
                         ref={pinRef}
                         length={6}
                         validate={/^[0-9]$/}
                         type="password"
                         onChange={(code) => {
                             setState(prev => ({...prev, pinIndex: prev.pinIndex+1}))
                         }}
                         format={k => k.toUpperCase()}
                    //  onComplete={() => setCompleted(true)}
                     />
                 </div>

                 <div className="grid grid-cols-3 items-center gap-8 mt-12">
                     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, i) => (
                         <button
                             onClick={() => handlePressPinByMouse(item)}
                             key={i}
                             className="hover:bg-gray-50/45 border-3 border-solid border-[#fbc2eb] bg-gray-50 rounded-full border w-16 h-16 text-center self-center">
                             <h6 className="text-xl font-medium text-gray-800">{item}</h6>
                         </button>
                     ))}

                     <button
                     className="
                     flex items-center content-center justify-center
                     hover:bg-gray-50/45 border-3 border-solid border-red-500 bg-gray-50 rounded-full border w-16 h-16 "
                     onClick={() => {
                         if(state.pinIndex >= 1 && state.pinIndex < 6){
                             //@ts-ignore
                             pinRef.current[state.pinIndex-1].value = ""
                             setState(prev => ({...prev, pinIndex:prev.pinIndex - 1}))
                         }
                     }}
                     >
                         <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                             <g clip-path="url(#clip0_2032_263)">
                                 <path fillRule="evenodd" clip-rule="evenodd" d="M11.9044 7.65625H27.3437C28.214 7.65625 29.0486 8.00195 29.6639 8.61731C30.2793 9.23266 30.625 10.0673 30.625 10.9375V24.0625C30.625 24.9327 30.2793 25.7673 29.6639 26.3827C29.0486 26.998 28.214 27.3438 27.3437 27.3438H11.9044C11.4124 27.3436 10.9267 27.2329 10.4833 27.0197C10.0399 26.8065 9.65012 26.4964 9.34279 26.1122L3.92873 19.3462C3.5091 18.8224 3.28045 18.1712 3.28045 17.5C3.28045 16.8288 3.5091 16.1776 3.92873 15.6538L9.34279 8.88781C9.64966 8.5042 10.0387 8.19439 10.4813 7.98123C10.9239 7.76807 11.4087 7.65702 11.9 7.65625H11.9044ZM6.77904 6.83812C7.39393 6.06946 8.17385 5.44897 9.06106 5.02259C9.94826 4.59622 10.92 4.37489 11.9044 4.375H27.3437C29.0842 4.375 30.7534 5.0664 31.9841 6.29711C33.2148 7.52782 33.9062 9.19702 33.9062 10.9375V24.0625C33.9062 25.803 33.2148 27.4722 31.9841 28.7029C30.7534 29.9336 29.0842 30.625 27.3437 30.625H11.9044C10.92 30.6251 9.94826 30.4038 9.06106 29.9774C8.17385 29.551 7.39393 28.9305 6.77904 28.1619L1.36717 21.3959C0.482141 20.2903 -6.10352e-05 18.9162 -6.10352e-05 17.5C-6.10352e-05 16.0838 0.482141 14.7097 1.36717 13.6041L6.77904 6.83812ZM15.925 11.9656C15.614 11.6758 15.2026 11.5181 14.7776 11.5256C14.3526 11.5331 13.947 11.7052 13.6464 12.0058C13.3458 12.3064 13.1737 12.7119 13.1662 13.137C13.1587 13.562 13.3164 13.9734 13.6062 14.2844L16.8219 17.5L13.6062 20.7156C13.445 20.8658 13.3158 21.0469 13.2261 21.2482C13.1364 21.4494 13.0882 21.6667 13.0843 21.887C13.0804 22.1073 13.1209 22.3261 13.2035 22.5304C13.286 22.7347 13.4088 22.9202 13.5646 23.076C13.7204 23.2318 13.906 23.3546 14.1102 23.4371C14.3145 23.5197 14.5333 23.5602 14.7536 23.5563C14.9739 23.5524 15.1912 23.5042 15.3924 23.4145C15.5937 23.3249 15.7748 23.1956 15.925 23.0344L19.1406 19.8188L22.3562 23.0344C22.5064 23.1956 22.6876 23.3249 22.8888 23.4145C23.0901 23.5042 23.3073 23.5524 23.5276 23.5563C23.7479 23.5602 23.9667 23.5197 24.171 23.4371C24.3753 23.3546 24.5608 23.2318 24.7166 23.076C24.8724 22.9202 24.9952 22.7347 25.0777 22.5304C25.1603 22.3261 25.2008 22.1073 25.1969 21.887C25.193 21.6667 25.1448 21.4494 25.0551 21.2482C24.9655 21.0469 24.8362 20.8658 24.675 20.7156L21.4594 17.5L24.675 14.2844C24.9648 13.9734 25.1226 13.562 25.1151 13.137C25.1076 12.7119 24.9354 12.3064 24.6348 12.0058C24.3342 11.7052 23.9287 11.5331 23.5036 11.5256C23.0786 11.5181 22.6672 11.6758 22.3562 11.9656L19.1406 15.1813L15.925 11.9656Z" fill="#CB6F6F"/>
                             </g>
                             <defs>
                                 <clipPath id="clip0_2032_263">
                                 <rect width="35" height="35" fill="white"/>
                                 </clipPath>
                             </defs>
                         </svg>
                     </button>

                 </div>
             </div>
         </div>
        }

      </>
        :
        <div>
          {/* <h6 className="text-xl font-normal text-gray-600">Loading . . .</h6> */}
          <Circular loading={true} />
        </div>
      }

    </div>
  );
}
