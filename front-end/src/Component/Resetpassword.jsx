import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import Input from './part/Input'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Resetpassword() {
    const initialValue = {password:"", confirmPassword: ""}
    const[formData,setFormdata] = useState({...initialValue})
    const[errors, setErrors] = useState({...initialValue})

    const handlechange = (e)=>{
        setFormdata({...formData, [e.target.name] : e.target.value})
        setErrors({...errors , [e.target.name] : ""})
    }

    const url = 'http://localhost:5050/api/auth/resetpassword/:token'

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!formData.password){
            setErrors({...errors, password: "password is required"})
        }
        if(!formData.confirmPassword){
            setErrors({...errors, confirmPassword: "confirm password is required"})
        }
        if(formData.password !== formData.confirmPassword){
            setErrors({...errors, confirmPassword: "enter the same password"})
        }
        await axios.post('http://localhost:5050/api/auth/resetpassword/:token', formData)
        .then((response) => {
            toast.info(response.data,{
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
        .catch((err)=>{
            setErrors({...errors, password: err.response.data})
        }) 
        
    }
return (
<section className="">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
            className="w-full bg-white rounded-lg shadow white:border md:mt-0 sm:max-w-md xl:p-0 white:bg-gray-800 white:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Syndique Application
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                            onChange={handlechange}
                        />
                        <div className='text-red-600 text-sm'>{errors.password}</div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm
                            Password</label>
                        <Input 
                            type="password"
                            name="confirmPassword"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="••••••••"
                            id="confirmPassword" 
                            value={formData.confirmPassword}
                            onChange={handlechange}
                        />
                        <div className='text-red-600 text-sm'>{errors.confirmPassword}</div>

                    </div>
                    <button
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Reset password
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    </div>
</section>
)
}

export default Resetpassword


