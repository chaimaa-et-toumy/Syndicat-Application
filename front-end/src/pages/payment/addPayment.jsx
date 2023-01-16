import React from 'react'
import SideBar from '../../Component/sideBar'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Input from '../../Component/Input'

export default function AddPayment({setRefresh}) {
  const [appartement, setAppartement] = useState([])
  const [Payment , setPayment] = useState({appartement:"", prix: "", date_paiment: ""})
  const [errors, setError] = useState({appartement:"", prix: "", date_paiment: ""})
  const [showModal, setShowModal] = useState(false);

useEffect(()=>{
  axios.get('http://localhost:5050/api/appartement/getAllAppartement')
    .then((res)=>{
    setAppartement(res.data)
  })
    .catch((err)=>{ console.log(err.message) })
}, [])

const handleChange = (e) =>{
  setPayment({...Payment , [e.target.name] : e.target.value})
  setError({...errors , [e.target.name] : ""})
}

const handleSubmit = async(e) => {
  e.preventDefault()

  if(!Payment.appartement){
    setError({...errors , appartement : "adresse appartement is required"})
    return
  }
  if(!Payment.prix){
    setError({...errors , prix : "prix is required"})
    return
  }
  if(!Payment.date_paiment){
    setError({...errors , date_paiment : "date paiment is required"})
    return
  }
  await axios.post('http://localhost:5050/api/paiment/addPaiment' , Payment)
    .then((res)=>{
      console.log(res.data)
      setShowModal(false)
      setRefresh(refresh => !refresh)
    })
    .catch((err)=>{
      console.log(err.message)
    })
}
return (
<>
  <SideBar />
  <div>

    <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" onClick={()=>{setShowModal(true);}}
      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded
      shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
      Add
    </button>
    {showModal ? (
    <>

      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h5 className="text-center text-2xl font-semibold ">
                Add payment
              </h5>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={()=> setShowModal(false)}>
                <span
                  className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <div className="my-4 text-slate-500 text-lg leading-relaxed">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">

                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <Input 
                        type="text" 
                        id="floating_phone"
                        className=" bg-transparent border-0 border-b-2 border-gray-300 block py-2.5 px-0 w-full text-sm text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer
                        appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 "
                        placeholder="" 
                        name="prix" 
                        onChange={handleChange} 
                        value={Payment.prix} />
                      <label htmlFor="floating_phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        prix
                      </label>
                      <div className="text-red-600 text-xs">{errors.prix}</div>

                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <Input 
                        type="date"
                        id="floating_company"
                        className=" bg-transparent border-0 border-b-2 border-gray-300 block py-2.5 px-0 w-full text-sm text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer
                        appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 "
                        placeholder=""
                        name="date_paiment"
                        onChange={handleChange} 
                        value={Payment.date_paiment} />
                      <label htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        date
                      </label>
                      <div className="text-red-600 text-xs">{errors.date_paiment}</div>
                    </div>
                  </div>
                  <div>
                    <div className="relative z-0 w-full mb-6 group">
                      <select id="appartement"
                        className="mt-3 text-black border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
                        onChange={handleChange} name="appartement" value={Payment.appartement}>
                        <option value="" selected disabled>Selected Appartement</option>
                        {
                        appartement.map((appartement)=>{
                        return(
                        appartement.isRented === true ?
                        <option value={appartement._id}>{appartement.adresse}</option>
                        : <option value="" hidden></option>
                        )
                        })
                        }
                      </select>

                      <div className="text-red-600 text-xs">{errors.appartement}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button" onClick={()=> setShowModal(false)}>
                      Close
                    </button>
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="submit">
                      Save Changes
                    </button>
                  </div>
                </form>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>

    ) : null}

  </div>

</>
)
}