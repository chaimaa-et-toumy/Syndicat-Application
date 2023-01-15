import React from 'react'
import SideBar from '../Component/sideBar'

export default  function AddPayment() {
  return (
    <>
        <SideBar />
        <section className="home-section ">
            <div className="flex justify-between">
                <div className="text">Add Payment</div>
            </div>
            <div className="flex justify-center">
                <div className="w-1/2">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="appartement" className="text-gray-500">adresse appartement</label>
                            <input type="text" name="appartement" id="appartement" className="border border-gray-200 rounded-md p-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="full_name" className="text-gray-500">Full name client</label>
                            <input type="text" name="full_name" id="full_name" className="border border-gray-200 rounded-md p-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="prix" className="text-gray-500">prix</label>
                            <input type="text" name="prix" id="prix" className="border border-gray-200 rounded-md p-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="date_paiment" className="text-gray-500">date paiment</label>
                            <input type="date" name="date_paiment" id="date_paiment" className="border border-gray-200 rounded-md p-2" />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light"

                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                <i className="fas fa-plus"></i> Add
                            </button>
                            <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
                                <i className="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>

    </>
  )
}