import React from 'react'
import Input from "../Component/Input";
import axios from 'axios';
import { useState  } from 'react';
export default function AddClient({setRefresh}) {
    const [showModal, setShowModal] = useState(false);
    const [display, setDisplay] = useState({fullname: "", cin: "", tel: ""});
    const [errors, setErrors] = useState({...display})

    const handleChangeAdd = (e) => {
        setDisplay({...display, [e.target.name]: e.target.value})
        setErrors({...errors, [e.target.name]: ""})
    }
      
    const handleSubmitAdd = async(e) => {
        e.preventDefault()
        //validation input
        const regixTel = /^((\+)212|0)[6-7]([0-9]{8})$/;
        if(!display.fullname){
            setErrors({...errors, fullname: "fullname is required"})
            return
        }
        if(!display.cin){
            setErrors({...errors, cin: "cin is required"})
            return
        }
        if(!display.tel){
            setErrors({...errors, tel: "tel is required"})
            return
        }
        if(!regixTel.test(display.tel)){
            setErrors({...errors, tel: "tel is not valid"})
            return
        }

        await axios.post('http://localhost:5050/api/client/addClient',display)
            .then((response)=>{
                console.log(response.data.msg)
                setShowModal(false)
                setRefresh(refresh => !refresh)
            })
            .catch((err)=>{
                console.log(err)
                setErrors({...errors, cin: err.response.data})
            })
    
    }
  return (
    <>
         <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={()=>setShowModal(true)}>
          Add
        </button>

      <div>
      {showModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h5 className="text-center text-2xl font-semibold ">
                  New Client
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
                  <form onSubmit={handleSubmitAdd}>
                    <div className="relative z-0 w-full mb-6 group">

                      <Input 
                        type="text" 
                        name="fullname" 
                        value={display.fullname} 
                        onChange={handleChangeAdd}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " 
                      />

                      <label htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full
                        name</label>
                      <div className="text-red-600 text-xs">{errors.fullname}</div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">

                        <Input 
                          type="tel" 
                          name="tel" 
                          value={display.tel} 
                          onChange={handleChangeAdd}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" " 
                        />

                        <label htmlFor="floating_phone"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone
                          number</label>
                        <div className="text-red-600 text-xs">{errors.tel}</div>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <Input 
                          type="text" 
                          name="cin" 
                          value={display.cin} 
                          onChange={handleChangeAdd}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" " 
                        />
                        <label htmlFor="floating_company"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CIN</label>
                        <div className="text-red-600 text-xs">{errors.cin}</div>
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
                </div>
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
