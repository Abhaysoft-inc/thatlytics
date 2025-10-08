import React from 'react'
import { IoIosAnalytics, IoIosStats } from 'react-icons/io'
import { IoAnalyticsSharp, IoSettings } from 'react-icons/io5'
import { MdLogout, MdSupervisedUserCircle } from 'react-icons/md'

const ClientDashboard = () => {
    return (
        <div>

            <div className="flex">
                <div className="sidebar h-155 w-1/5 bg-blue-50 mx-4 my-4 rounded px-3 py-6 border shadow">

                    <div className="logo flex items-center mx-3">
                        <IoIosAnalytics color='blue' size={30} />
                        <p className="ml-2 text-2xl font-semibold">thatlytics</p>
                    </div>

                    <div className="nav-links px-3 mt-10">
                        <div className="link flex gap-2 items-center cursor-pointer text-xl bg-blue-300 py-2 px-10 rounded relative"><IoIosStats /> Dashboard</div>
                    </div>
                    <div className="nav-links px-3 mt-3">
                        <div className="link flex gap-2 items-center cursor-pointer text-xl bg-blue-200 py-2 px-10 rounded relative"><IoAnalyticsSharp /> Reports</div>
                    </div>
                    <div className="nav-links px-3 mt-3">
                        <div className="link flex gap-2 items-center cursor-pointer text-xl bg-blue-200 py-2 px-10 rounded relative"><IoSettings /> Admin</div>
                    </div>

                    <div className="flex px-3 absolute bottom-10 items-center">
                        <MdSupervisedUserCircle size={30} />
                        <p className="ml-2 text-xl">Abhay</p>
                        <MdLogout className='cursor-pointer ml-20' size={30} />
                    </div>

                </div>
                <div className="mainbar w-full m-4">

                    <div className="navbar w-full h-14 rounded-full border bg-blue-50 shadow">


                    </div>

                    {/* dashboard */}

                    <div className="dashboard w-full mt-10">

                        <div className="columns-3 flex justify-between mx-3">

                            <div className="box1 w-80 h-40 border items-center flex justify-center rounded">
                                Hello
                            </div>
                            <div className="box1 w-80 h-40 border items-center flex justify-center rounded">
                                Hello
                            </div>
                            <div className="box1 w-80 h-40 border items-center flex justify-center rounded">
                                Hello
                            </div>


                        </div>



                    </div>





                </div>
            </div>



        </div>
    )
}

export default ClientDashboard