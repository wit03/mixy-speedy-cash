"use client"

import { useState } from "react"
import Input from "./_component/Input"


export default function Page(){
    
    
    const [email, setEmail] = useState<string>("hello")
    const [password, setPassword] = useState<string>("hello")

    return (
        <div className="flex flex-col  p-4 gap-4 border border-red-500 ">
           <Input
           value={email}
           setValue={setEmail}
           />
           <Input
           value={password}
           setValue={setPassword}
           
           />

            <h6>Email = {email}</h6>
        </div>
    )
}