"use client"
const Profile = () => {

    return (
        <div className="flex flex-row font-rubik justify-center items-center">
            <div className="relative mr-4">
                <svg className="" xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
                    <circle className="z-10" cx="33" cy="33" r="32" stroke="url(#paint0_linear_5_40)" stroke-width="2" />
                    <defs className="z-10">
                        <linearGradient id="paint0_linear_5_40" x1="0" y1="0" x2="72.3508" y2="4.37567" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#133FDB" />
                            <stop offset="1" stop-color="#B7004D" stop-opacity="0.3" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute left-0 top-0 z-40">
                    <img
                        src="./avatar.jpeg"
                        className="w-[66px] h-[66px] rounded-full p-1 object-cover"
                    />
                </div>

                <div className="absolute top-[3px] z-50 -right-[0px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <circle cx="6.5" cy="6.5" r="5.5" fill="#DB1337" stroke="white" stroke-width="2" />
                    </svg>
                </div>
            </div>
            <div>
                <div className="text-base font-light">
                    Good Morning
                </div>
                <div className="text-2xl font-normal">
                    Jarukit
                </div>
            </div>

        </div>
    );
}

export default Profile;