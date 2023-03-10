import React from 'react'
import axios from 'axios';
import { useState , useEffect } from 'react';

export default function EditAppartement(props) {
  const [showModal2, setShowModal2] = useState(false);
  const [displayApp, setDisplayApp] = useState({adresse:"", prix:"", surface:"", isRented:"", client:"" })
  const [errors, setError] = useState({adresse:"" , prix: "", surface: "" , isRented:""})
  const [client, setClient] = useState([])
  const [isRentedValue, setIsRentedValue] = useState(false)
  const [currentId , setCurrentId] = useState(null)

  useEffect(()=>{
  axios.get('http://localhost:5050/api/client/getAllClient')
      .then((res)=>{
          setClient(res.data)
      })
      .catch((err)=>{ console.log(err.message) })
  },[])

  function getOneAppartement(id){
    axios.get(`http://localhost:5050/api/appartement/getOneAppartement/${id}`)
    .then((res)=>{
      setDisplayApp(res.data)
      setIsRentedValue(res.data.isRented)
      setCurrentId(id)
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
  
    console.log(name, value);

    if (name === "isRented") {
      value = value === "true" ? true : false;
      setIsRentedValue(value);
    }
    else {
      setDisplayApp({...displayApp, [name] : value})
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
        if(!displayApp.adresse){
      setError({...errors , adresse : "adresse appartement is required"})
      return
  }
    if(!displayApp.prix){
        setError({...errors , prix : "prix is required"})
        return
    }
    if(!displayApp.surface){
        setError({...errors , surface : "surface is required"})
        return
    }
    if(!displayApp.isRented){
        setError({...errors , isRented : "isRented is required"})
        return
    }
    axios.post(`http://localhost:5050/api/appartement/updateAppartement/${currentId}`, {...displayApp, isRented: isRentedValue})
    .then((res)=>{
      console.log(res.data)
      setShowModal2(false)
      props.setRefresh(refresh => !refresh)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
     <button type="button" onClick={()=> {setShowModal2(true) ; getOneAppartement(props.id)}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
          stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      </button>
     <div>
      {showModal2 ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h5 className="text-center text-2xl font-semibold ">
                  Update Apartement
                </h5>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={()=> setShowModal2(false)}>
                  <span
                    className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ??
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                <form onSubmit={handleSubmit}>
                  <div className="relative z-0 w-full mb-6 group">
                    <input type="text" id="floating_email" className="
                        bg-transparent border-0 border-b-2 border-gray-300 
                        block py-2.5 px-0 w-full text-sm text-gray-900
                        focus:outline-none focus:ring-0 focus:border-blue-600 peer
                        appearance-none 
                        dark:text-black dark:border-gray-600 dark:focus:border-blue-500 " placeholder=""
                      name="adresse"
                        onChange={handleChange} 
                        value={displayApp.adresse} 
                       />
                    <label htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Adresse
                    </label>
                    <div className="text-red-600 text-xs">{errors.adresse}</div>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input type="text" id="floating_phone" className="
                        bg-transparent border-0 border-b-2 border-gray-300 
                        block py-2.5 px-0 w-full text-sm text-gray-900
                        focus:outline-none focus:ring-0 focus:border-blue-600 peer
                        appearance-none 
                        dark:text-black dark:border-gray-600 dark:focus:border-blue-500 " placeholder=""
                        name="prix" onChange={handleChange}  value={displayApp.prix} 
                        />
                      <label htmlFor="floating_phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        prix
                      </label>
                      <div className="text-red-600 text-xs">{errors.prix}</div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input type="text" id="floating_company" className="
                        bg-transparent border-0 border-b-2 border-gray-300 
                        block py-2.5 px-0 w-full text-sm text-gray-900
                        focus:outline-none focus:ring-0 focus:border-blue-600 peer
                        appearance-none 
                        dark:text-black dark:border-gray-600 dark:focus:border-blue-500 " placeholder=""
                        name="surface" 
                        onChange={handleChange} 
                        value={displayApp.surface} 
                        />
                      <label htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Surface
                      </label>
                      <div className="text-red-600 text-xs">{errors.surface}</div>
                    </div>
                  </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <select id="isRented"
                        className="mt-3 text-black border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
                        name="isRented"
                        onChange={handleChange}  
                        value={isRentedValue}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                      <label htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Is it rented
                      </label>
                      <div className="text-red-600 text-xs">{errors.isRented}</div>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <select id="client" name="client" 
                      onChange={handleChange} 
                      value={displayApp.client}
                        className="mt-3 text-black border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500">
                        <option value="" selected disabled>Select Appartement</option>
                       { 
                          isRentedValue === true ?
                          client.map((client) => {
                             return(
                            <option value={client._id}>{client.fullname}</option>
                          )}) 
                          : <option value="">No one</option>
                        }
                      </select>
                      <label htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        client
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button" onClick={()=> setShowModal2(false)}>
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
