import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import Input from '../../Component/Input'
export default function EditPayment(props) {
    const [showModal3, setShowModal3] = useState(false);
    const [payment , setPayment] = useState({prix : "" , date_paiment : "" , appartement : "" })
    const [errors , setErrors] = useState({prix : "" , date_paiment : "" , appartement : "" })
    const [adressApp , setAdressApp] = useState([])
    const [currentId , setCurrentId] = useState(null)

    

    //get All appartement
    useEffect(()=>{
        axios.get('http://localhost:5050/api/appartement/getAllAppartement')
        .then((res)=>{
            setAdressApp(res.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    },[])
    
    //get One payment
    function getOnePayment(id){
        axios.get(`http://localhost:5050/api/paiment/getOnePaiment/${id}`)
        .then((res)=>{
            setPayment(res.data[0])
            setCurrentId(res.data[0]._id)
            console.log("app" , adressApp)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    const handleChange = (e) => {
        setPayment({...payment, [e.target.name]: e.target.value})
        setErrors({...errors, [e.target.name]: ""})
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
       
        if( typeof payment.appartement != "string"){
            setErrors({...errors, appartement: "appartement is required"})
            return
        }
       
        if(!payment.prix){
            setErrors({...errors, prix: "prix is required"})
            return
        }
        if(!payment.date_paiment){
            setErrors({...errors, date_paiment: "date_paiment is required"})
            return
        }
        await axios.post(`http://localhost:5050/api/paiment/updatePaiment/${currentId}`, payment)	
        .then((res)=>{
            console.log(res)
            setShowModal3(false)
            props.setRefresh(refresh => !refresh)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

  return (
    <>
    <button type="button" onClick={()=>{setShowModal3(true); getOnePayment(props.id)}}>
        <button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
            <path strokeLinecap="round" strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        </button>
    </button>
    <div>
      {showModal3 ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h5 className="text-center text-2xl font-semibold ">
                  Edit  Apartement
                </h5>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={()=> setShowModal3(false)}>
                  <span
                    className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                <form onSubmit={handleSubmit}>

                    <div className="relative z-0 w-full mb-6 group">
                        <Input
                            type="text"
                            id="floating_email"
                            className="bg-transparent border-0 border-b-2 border-gray-300 
                            block py-2.5 px-0 w-full text-sm text-gray-900
                            focus:outline-none focus:ring-0 focus:border-blue-600 peer
                            appearance-none 
                            dark:text-black dark:border-gray-600 dark:focus:border-blue-500 "
                            placeholder=""
                            name="prix"
                            value={payment.prix}
                            onChange={handleChange}
                        />
                        <label htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Prix
                        </label>
                        <div className="text-red-600 text-xs">{errors.prix}</div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <Input
                            type="date"
                            id="floating_email"
                            className="bg-transparent border-0 border-b-2 border-gray-300 
                            block py-2.5 px-0 w-full text-sm text-gray-900
                            focus:outline-none focus:ring-0 focus:border-blue-600 peer
                            appearance-none 
                            dark:text-black dark:border-gray-600 dark:focus:border-blue-500 "
                            placeholder=""
                            name="date_paiment"
                            value={payment.date_paiment?.slice(0,10)}
                            onChange={handleChange}
                        />
                        <label htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Date paiment
                        </label>
                        <div className="text-red-600 text-xs">{errors.date_paiment}</div>

                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <select id="isRented" onChange={handleChange} name="appartement"
                        className="mt-3 text-black border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
                        >
                            <option value="" selected disabled>select Paiment</option>
                            {
                                adressApp.map((appartement)=>{
                                    return(
                                        appartement.isRented === true ?
                                        <option value={appartement._id}>{appartement.adresse}</option>
                                        :
                                        <option value="" hidden></option>
                                    )
                                })
                            }
                    </select>
                    <div className="text-red-600 text-xs">{errors.appartement}</div>
                    <div className="text-red-600 text-xs"></div>
                    </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button" onClick={()=> setShowModal3(false)}>
                      Close
                    </button>
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="submit">
                      update
                    </button>
                  </div>
                </form>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      ) : null}


      <div>

      </div>
    </div>
    </>
  )
}
