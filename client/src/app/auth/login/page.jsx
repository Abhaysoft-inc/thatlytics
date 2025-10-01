"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { IoIosAnalytics } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';

const LoginPage = () => {

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3001/auth/login", formData);

            const token = response.data.token;
            // save to localstorage

            await localStorage.setItem('jwtToken', token)
            window.location = '/dashboard'


            if (response.status == 200) {
                toast.success('Login Success')
            }

        } catch (error) {
            if (error.response.status != 200) {
                toast.error(`Status ${error.response.status}: Login Failed!`)
            } else {
                console.log("Network Error:", error.message)
            }
        }
    }


    return (
        <div>
            <ToastContainer />

            <div className="flex justify-center h-screen items-center">
                <div className="login-form">
                    <div className="logo flex justify-center">
                        <IoIosAnalytics size={60} color='blue' />

                    </div>
                    <p className="text-center text-3xl mt-7">Welcome Back to Thatlytics</p>
                    <p className="text-center text-md mt-2 text-gray-700">Enter your username and password to continue</p>

                    <div className="form-input mt-10">
                        <p className="">Email</p>
                        <input type="email" name="email" id="email" placeholder='Enter your email address' className='border border-gray-400 w-100 px-2 mt-2 py-1.5 rounded' value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="form-input mt-5">
                        <p className="">Password</p>
                        <input type="password" name="password" id="password" placeholder='Enter your password' className='border border-gray-400 w-100 px-2 mt-2 py-1.5 rounded' value={formData.password} onChange={handleChange} />
                    </div>

                    <div className=" items-center mt-3 flex justify-between">
                        {/* forot pass */}
                        <div className="flex space-x-2">
                            <input type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>

                        <p className="cursor-pointer">Forgot password?</p>
                    </div>
                    <div className="flex justify-center mt-6">

                        <button className='bg-gradient-to-b from-blue-800 via-blue-900 to-blue-800 text-white rounded text-center px-44 py-2.5 cursor-pointer' onClick={handleLogin}>Sign In</button>

                    </div>

                </div>

            </div>





        </div>
    )
}

export default LoginPage