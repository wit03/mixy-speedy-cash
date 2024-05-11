"use client"

import { makeRequest } from "@/hook/makeRequets"
import axios from "axios"
import { useState } from "react"

export default function page({

}:{
    
})  {

    const [state, setState] = useState({
        email:"owner@gmail.com",
        password: "123"
    })

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        const data = await makeRequest("http://localhost:3000/employee/sign-in", {
            method:"POST",
            data:{
                email:state.email,
                password:state.password
            }
        })


    }

return (

    <form className="flex flex-col gap-4 p-4 items-center" onSubmit={handleSubmit}> 
        <div className="flex gap-4">
            <input className="p-4 outline-purple-300" type="email" value={state.email} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, email:e.target.value}))}/>
            <input className="p-4 outline-purple-300" type="password" value={state.password} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, password:e.target.value}))}/>
        </div>
        <button type="submit">
            <h6>Submit</h6>
        </button>
    </form>

    )

}
