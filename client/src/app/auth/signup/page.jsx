"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { IoIosAnalytics } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';

const SignupPage = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error('Name is required');
            return false;
        }
        if (!formData.email.trim()) {
            toast.error('Email is required');
            return false;
        }
        if (!formData.password.trim()) {
            toast.error('Password is required');
            return false;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }
        
        return true;
    }

    const handleSignup = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const signupData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };

            const response = await axios.post("http://localhost:3001/auth/signup", signupData);

            if (response.status === 200) {
                toast.success('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    window.location = '/auth/login';
                }, 2000);
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400 && error.response.data.err) {
                    toast.error(error.response.data.err);
                } else {
                    toast.error(`Status ${error.response.status}: Signup Failed!`);
                }
            } else {
                console.log("Network Error:", error.message);
                toast.error('Network error. Please try again.');
            }
        }
    }

    return (
        <div>
            <ToastContainer />

            <div className="flex justify-center h-screen items-center">
                <div className="signup-form">
                    <div className="logo flex justify-center">
                        <IoIosAnalytics size={60} color='blue' />
                    </div>
                    <p className="text-center text-3xl mt-7">Join Thatlytics</p>
                    <p className="text-center text-md mt-2 text-gray-700">Create your account to get started</p>

                    <div className="form-input mt-10">
                        <p className="">Full Name</p>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder='Enter your full name' 
                            className='border border-gray-400 w-100 px-2 mt-2 py-1.5 rounded' 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="form-input mt-5">
                        <p className="">Email</p>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder='Enter your email address' 
                            className='border border-gray-400 w-100 px-2 mt-2 py-1.5 rounded' 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="form-input mt-5">
                        <p className="">Password</p>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder='Enter your password (min 6 characters)' 
                            className='border border-gray-400 w-100 px-2 mt-2 py-1.5 rounded' 
                            value={formData.password} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="form-input mt-5">
                        <p className="">Confirm Password</p>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            id="confirmPassword" 
                            placeholder='Confirm your password' 
                            className='border border-gray-400 w-100 px-2 mt-2 py-1.5 rounded' 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button 
                            className='bg-gradient-to-b from-blue-800 via-blue-900 to-blue-800 text-white rounded text-center px-44 py-2.5 cursor-pointer' 
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Already have an account? 
                            <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 ml-1 cursor-pointer">
                                Sign In
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignupPage