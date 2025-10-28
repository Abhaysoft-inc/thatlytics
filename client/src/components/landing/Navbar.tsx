import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div>

            <div className="navbar px-10 py-4 flex items-center justify-between">
                <div className="logo">
                    <p className="text-white text-3xl ">thatlytics</p>
                </div>

                <div className="nav-items text-gray-100 flex gap-5 items-center">
                    <Link href={'/'} >Home</Link>
                    <Link href={'/pricing'}>Pricing</Link>
                    <Link href={'/features'}>Features</Link>
                    <Link className='bg-gradient-to-r from-green-800 via-green-900 to-green-800 px-3 py-1 rounded-xs shadow-green-900' href={'/auth/login'}>Get Started</Link>

                </div>
            </div>
        </div>
    )
}

export default Navbar