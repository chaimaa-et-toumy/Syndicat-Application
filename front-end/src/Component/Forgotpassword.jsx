import React from 'react'
import {Link} from 'react-router-dom'
import Input from './part/Input'

function Forgotpassword() {
return (
<section className="">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
            className="w-full bg-white rounded-lg shadow white:border md:mt-0 sm:max-w-md xl:p-0 white:bg-gray-800 white:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Syndique Application
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
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
                        />
                    </div>
                    <button type="button"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Forgot
                        password
                    </button>

                    <p className="text-sm font-light text-black">
                        go back to ?
                        <Link to="/login"> <a href="#"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>
)
}

export default Forgotpassword