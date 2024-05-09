import Link from "next/link";

export default function NavigateSideBar({
    link,
    text,
    children,
    check=false
}:{
    text:string;
    link:string;
    children:React.ReactNode;
    check?: boolean;
})  {

return (

    <> 
     <div className="pt-6 select-none h-auto   max-h-[calc(100dvh-100px)] pr-1">
        <div className="grid gap-1 mt-1 transition-transform">
        <Link href={link} className={` ${check ? "bg-purple-300 text-purple-600" : "hover:bg-purple-100"} border border-purple-500 w-full h-full cursor-pointer group hover:text-primary rounded-xl`}>
            <div className="flex items-center justify-center gap-2 z-40 p-2 ">
                {children}
                <p className="text-base font-normal">
                    {text}
                </p>
            </div>
        </Link>
        </div>
    </div>
    </>

    )

}
