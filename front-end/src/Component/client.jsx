import SideBar from "./part/sideBar"
import React , {useEffect, useState} from "react";
import axios from "axios";
export default function Client(){
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [client, setClient] = useState([]);
  const [refersh, setRefersh] = useState(false)
  const [currentClient, setCurrentClient] = useState(null)
  const [display, setDisplay] = useState({fullname: "", cin: "", tel: ""});
  const [errors, setErrors] = useState({...display})

  useEffect(() => {
    axios.get("http://localhost:5050/api/client/getAllClient")
    .then((response)=>{
      setClient(response.data)
      console.log(response.data);
     
    })
    .catch((err)=>{
      console.log(err)
    }) 
  }, [refersh])

   // for update
  function getOneClient(id){
    axios.get(`http://localhost:5050/api/client/getOneClient/${id}`)
    .then((response)=>{
      setDisplay(response.data)
      setCurrentClient(id)
      // console.log(response.data)
    })
    .catch((err)=>{
      console.log(err.response.data)
    }) 
  }


  function handleChange(e){
    setDisplay({...display, [e.target.name]: e.target.value})
  }
  function handleSubmit(e) {
    e.preventDefault()
    axios.post(`http://localhost:5050/api/client/updateClient/${currentClient}`, display)
    .then((response)=>{
      console.log(response.data)
      setShowModal2(false)
      setRefersh(!refersh)
    })
    .catch((err)=>{
      console.log(err.response.data)
    }
    )
  }

  //for add client
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
        setRefersh(!refersh)
      })
      .catch((err)=>{
        console.log(err)
        setErrors({...errors, cin: err.response.data})
      })  
    
  }

  //for delete client
  function deleteClient(id){
    axios.delete(`http://localhost:5050/api/client/deleteClient/${id}`)
    .then((response)=>{
      console.log(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }



return(
  <> 
  <SideBar />
  <section className="home-section ">
    <div className="flex justify-between">
      <div className="text">Client</div>
      <div className="p-4 mr-3">
        <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() =>setShowModal(true)}>
          Add 
        </button>

      </div>
    </div>
    
    <div className="rounded-lg border border-gray-200 shadow-md m-3 overflow-x-scroll">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Full name</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">CIN</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">phone number</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {
            client.map((client_) => {
              return (
                <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span>
                    {client_.fullname}
                  </span>
                </td>
                <td className="px-6 py-4">{client_.cin}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span>
                      {client_.tel}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button type="button"  onClick={() =>{setShowModal2(true); getOneClient(client_._id)}}>
                      <button>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                          <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                    </button>
                    <button type="button" onClick={() => deleteClient(client_._id)}>
                    <a x-data="{ tooltip: 'Delete' }" href="">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </a>
                    </button>
                  </div>
                </td>
              </tr>
              );
            })
          }
       
        </tbody>
      </table>
    </div>

{/* Model Add */}
<div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h5 className="text-center text-2xl font-semibold ">
                      New Client
                    </h5>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-slate-500 text-lg leading-relaxed">                   
                    <form onSubmit={handleSubmitAdd}>
                      <div className="relative z-0 w-full mb-6 group">
                        <input type="text" 
                        name="fullname"
                        value={display.fullname} 
                        onChange = {handleChangeAdd}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full name</label>
                        <div className="text-red-600 text-xs">{errors.fullname}</div>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                          <input type="tel"  
                          name="tel"
                          value={display.tel} 
                          onChange = {handleChangeAdd} 
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                          <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                          <div className="text-red-600 text-xs">{errors.tel}</div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <input type="text" 
                          name="cin" 
                          value={display.cin} 
                          onChange = {handleChangeAdd} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                          <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CIN</label>
                          <div className="text-red-600 text-xs">{errors.cin}</div>
                        </div>
                      </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}>
                            Close
                          </button>
                          <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="submit"
                          >
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

{/* Model update */}
<div>
      {showModal2 ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h5 className="text-center text-2xl font-semibold ">
                      Update Client
                    </h5>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal2(false)}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">                   
                    <form onSubmit={handleSubmit}>
                            <div className="relative z-0 w-full mb-6 group">
                            <input 
                                type="text" id="floating_email" 
                                className="
                                bg-transparent border-0 border-b-2 border-gray-300 
                                block py-2.5 px-0 w-full text-sm text-gray-900
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                appearance-none 
                                dark:text-black dark:border-gray-600 dark:focus:border-blue-500 "
                                placeholder="" 
                                name="fullname"
                                value={display.fullname}
                                onChange={handleChange} />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full name</label>
                          </div>
                          <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                               <input 
                                type="tel" id="floating_phone"
                                className="
                                bg-transparent border-0 border-b-2 border-gray-300 
                                block py-2.5 px-0 w-full text-sm text-gray-900
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                appearance-none 
                                dark:text-black dark:border-gray-600 dark:focus:border-blue-500 "
                                placeholder="" 
                                value={display.tel}
                                onChange={handleChange}
                                name="tel"
                                />
                              <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                              <input 
                                type="text" id="floating_company"
                                className="
                                bg-transparent border-0 border-b-2 border-gray-300 
                                block py-2.5 px-0 w-full text-sm text-gray-900
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                appearance-none 
                                dark:text-black dark:border-gray-600 dark:focus:border-blue-500 "
                                placeholder="" 
                                value={display.cin}
                                onChange={handleChange}
                                name="cin"
                                />
                              <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CIN</label>
                            </div>
                          </div>
                      
                        
                     
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal2(false)}>
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
</section>
</>
)
}