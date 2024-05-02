"use client"
import { Dispatch, SetStateAction } from "react";

// props
export default function Input({
    value,
    setValue,
}:{
    value:string;
    setValue:Dispatch<SetStateAction<string>>
})  {

return (

     <input
        placeholder="Email"
        className=""
        value={value}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />

    )

}
