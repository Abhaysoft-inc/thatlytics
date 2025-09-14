import React from 'react'
import { MdHelp } from 'react-icons/md'

export const Navbar = () => {
    return (
        <div>
            <nav className='bg-white flex items-center justify-between px-6 py-2 border-b border-gray-300'>
                <div className="leftpart">
                    <p className="text-xl font-semibold">Thatlyics</p>
                </div>
                <div className="rightpart flex items-center gap-3">
                    <MdHelp size={32} />
                    <p className="bg-blue-900 text-white rounded-full px-4 py-2 w-fit items-center align-middle text-center">A</p>
                </div>

            </nav>
        </div>
    )
}
