"use client"
import { EmployeeProvider } from "@/provider/EmployeeContext";
import { useParams, usePathname } from 'next/navigation';
import SidebarItem from "./SidebarItem";

export default function layout({
    children
}:{
    children:React.ReactNode
})  {

    const pathName = usePathname()

    
    return (
    <EmployeeProvider> 
    <div className={`grid grid-cols-1 ${!pathName.includes("/login") && "md:grid-cols-[300px_auto]"}`}> 
           {!pathName.includes("/login") && 
                <div className="fixed md:relative top-0 -left-full min-h-[100dvh] md:left-0 md:block duration-300 z-40">
                    <div className="pl-2 pr-1 py-4 bg-white overflow-y-scroll scrollbar-small scrollbar-thumb border-r border-gray-light h-full z-50">
                    <div className="flex items-center justify-center flex-col gap-4 mt-16">
                        <div className="relative w-[7.5rem] h-24">
                            <div className="absolute top-0 left-0 w-20 h-20 bg-[#FBC2EB] rounded-full"/>
                            <div className="absolute -top-10 right-0 w-20 h-20 bg-[#A694CF] rounded-full"/>
                        </div>
                        <h6 className="font-rubik text-3xl font-medium">WMPT</h6>
                    </div>
                        
                    <SidebarItem/>
                    </div>
                </div>
           }
        
        <div className={`w-full flex flex-col gap-2 overflow-x-hidden `}>
            {children}
        </div>
    
    </div>
    </EmployeeProvider>

    )

}
