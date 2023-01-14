import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import Input from './part/Input'
import axios from 'axios'

export default function Login() {

    const initialValue = {email : "" , password : ""}
    const [formData , setformData] = useState({...initialValue})
    const [errors , seterrors] = useState({...initialValue})

    const handleChange = (e) => {
        setformData({...formData , [e.target.name] : e.target.value})
        seterrors({...errors , [e.target.name] : ""})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!formData.email){
            seterrors({...errors , email : "Email is required"})
            return
        }
        if(!formData.password){
            seterrors({...errors , password : "Password is required"})
            return
        }
        await axios.post('http://localhost:5050/api/auth/login', formData)
        .then((response) => {
            console.log(response.data)
            localStorage.setItem("token",JSON.stringify(response.data))
            window.location = "/"
        })
        .catch ((err) => {
            seterrors({...errors , email : err.response.data})
        })
    }

return (
<>
    <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                className="w-full bg-white rounded-lg shadow white:border md:mt-0 sm:max-w-md xl:p-0 white:bg-gray-800 white:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Syndique Application
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your
                                email
                            </label>
                            <Input 
                                type="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg w-full p-2.5 "
                                placeholder="name@company.com"
                                id="email"
                                value = {formData.email}
                                onChange={handleChange}
                             />
                             <div className='text-red-600 text-sm'>{errors.email}</div> 
                        </div>
                        <div>
                            <label htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <Input 
                                type="password"
                                name="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="••••••••" 
                                id="password" 
                                value = {formData.password}
                                onChange={handleChange}
                            />
                            <div className='text-red-600 text-sm'>{errors.password}</div> 
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <Input 
                                        type="checkbox"
                                        name="checkbox" 
                                        aria-describedby="remember"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                                        id="remember" 
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-black-700">Remember me</label>
                                </div>
                            </div>
                            <Link to="/forgotpassword">
                            <a href="#" className="text-sm font-medium  hover:underline text-black-700">Forgot
                                password?</a>
                            </Link>
                        </div>
                        <button
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</>
)
}