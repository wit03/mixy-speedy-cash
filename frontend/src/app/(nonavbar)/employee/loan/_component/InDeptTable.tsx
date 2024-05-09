export default function InDeptTable({

}: {

}) {

    return (

        <>
            <div className="flex flex-col gap-2 mt-4 md:mt-6">
                <h2 className="text-xl font-bold text-start">In Dept</h2>
                <div className="w-auto min-w-full mt-2 p-1 relative overflow-x-scroll scrollbar-medium scrollbar-thumb sm:rounded-lg rounded-lg flex flex-shrink-0">
                    <table className="w-full text-left rtl:text-right  overflow-hidden whitespace-nowrap border-collapse border-x border-t">
                        <thead className=" bg-slate-100">
                            <tr>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Acc Number
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Acc Name
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Requested At
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Amount
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Type
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Installment
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Interest
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Status
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    History
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="bg-white border-b text-slate-800">
                                <td scope="row" className="px-3 py-4 font-medium ">
                                    <p className="text-sm font-normal">
                                        Account Number
                                    </p>
                                </td>

                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        Account Name
                                    </p>
                                </td>

                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        Requested At
                                    </p>
                                </td>

                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        Amount
                                    </p>
                                </td>

                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        Type
                                    </p>
                                </td>

                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        Installment
                                    </p>
                                </td>
                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        Interest
                                    </p>
                                </td>
                                <td className="px-3 py-4">
                                    <div className="flex items-center gap-2 w-fit relative border p-2 rounded-md">
                                        <select className="appearance-none outline-none ">
                                            <option value={"waiting"}>Waiting</option>
                                            <option value={"onProcess"}>OnProcess</option>
                                            <option value={"inDebt"}>InDebt</option>
                                            <option value={"decline"}>Decline</option>
                                        </select>

                                        <svg fill="#000000" height="12px" width="12px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path> </g></svg>
                                    </div>
                                </td>
                              
                                <td className="px-3 py-4">
                                    View
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )

}
