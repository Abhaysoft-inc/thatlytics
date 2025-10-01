import React from 'react'
import { IoIosAnalytics } from 'react-icons/io'

const ClientDashboard = () => {
    return (
        <div>

            <div className="flex">
                <div className="sidebar h-155 w-1/5 bg-blue-50 mx-4 my-4 rounded px-3 py-6">

                    <div className="logo flex items-center mx-3">
                        <IoIosAnalytics color='blue' size={30} />
                        <p className="ml-2 text-2xl font-semibold">thatlytics</p>
                    </div>







                </div>
                <div className="mainbar">

                </div>
            </div>



        </div>
    )
}

export default ClientDashboard