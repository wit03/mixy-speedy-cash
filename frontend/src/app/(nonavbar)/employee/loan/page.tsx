import DeclineTable from "./_component/DeclineTable";
import InDeptTable from "./_component/InDeptTable";
import WatingTable from "./_component/WatingTable";
import OnProcessTable from "./_component/onProcessTable";

export default function page({

}:{
    
})  {

    

    return (

        <div className="flex flex-col gap-4 px-10 pt-7"> 
            <div className="grid grid-flow-row grid-cols-3 gap-7 font-rubik">
                <div className="flex flex-col items-center justify-center py-2 gap-2 rounded-md shadow-md bg-amber-200">
                    <h5 className="text-xl font-normal">Waiting</h5>
                    <h6 className="text-2xl font-normal">120</h6>
                </div>
                <div className="flex flex-col items-center justify-center py-2 gap-2 rounded-md shadow-md bg-green-200">
                    <h5 className="text-xl font-normal">On Process</h5>
                    <h6 className="text-2xl font-normal">120</h6>
                </div>
                <div className="flex flex-col items-center justify-center py-2 gap-2 rounded-md shadow-md bg-red-200">
                    <h5 className="text-xl font-normal">In Debt</h5>
                    <h6 className="text-2xl font-normal">120</h6>
                </div>
            </div>

            
            <div className="grid grid-flow-row grid-cols-2 gap-7 mt-8">
                <input
                className="p-3 rounded-md outline-purple-300 placeholder:text-sm placeholder:font-normal"
                placeholder="Search customer name"
                />
                    <div className="bg-white w-full flex justify-between items-center gap-2 p-2 relative  ">
                        <select className="w-full appearance-none outline-none p-2">
                            <option value={"waiting"}>Waiting</option>
                            <option value={"onProcess"}>OnProcess</option>
                            <option value={"inDebt"}>InDebt</option>
                            <option value={"decline"}>Decline</option>
                        </select>

                        <svg fill="#000000" height="12px" width="12px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path> </g></svg>
                    </div>
            </div>

            <button className="flex items-center gap-1 bg-purple-400 px-4 py-2 text-white rounded-lg hover:bg-purple-400/80 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M19.34 20.6886L13.2579 14.6064C12.7752 14.9926 12.2201 15.2983 11.5925 15.5236C10.965 15.7488 10.2973 15.8615 9.5893 15.8615C7.83546 15.8615 6.35129 15.2539 5.1368 14.0388C3.9223 12.8236 3.31473 11.3394 3.31409 9.58625C3.31344 7.83305 3.92101 6.34888 5.1368 5.13374C6.35258 3.9186 7.83675 3.31104 9.5893 3.31104C11.3419 3.31104 12.8264 3.9186 14.0428 5.13374C15.2592 6.34888 15.8665 7.83305 15.8645 9.58625C15.8645 10.2942 15.7519 10.962 15.5266 11.5895C15.3014 12.217 14.9956 12.7721 14.6095 13.2548L20.6916 19.337L19.34 20.6886ZM9.5893 13.9306C10.7961 13.9306 11.822 13.5084 12.6671 12.664C13.5121 11.8196 13.9343 10.7937 13.9337 9.58625C13.933 8.37884 13.5108 7.35324 12.6671 6.50946C11.8233 5.66569 10.7974 5.24316 9.5893 5.24187C8.38124 5.24058 7.35565 5.66312 6.51252 6.50946C5.66939 7.35581 5.24685 8.38141 5.24492 9.58625C5.24299 10.7911 5.66552 11.817 6.51252 12.664C7.35951 13.511 8.38511 13.9332 9.5893 13.9306Z" fill="white"/>
                </svg>
                <h6 className="text-base font-normal">Search</h6>
            </button>

            <WatingTable/>
            <OnProcessTable/>
            <InDeptTable/>
            <DeclineTable/>

        </div>

    )

}
