import { useEffect, useState } from "react";
import axios from 'axios'
import SideBar from "../Component/sideBar";
export default function Appartement(){

const [showModal, setShowModal] = useState(false);
const [showModal2, setShowModal2] = useState(false);
const [Appartement, setAppartement] = useState([])
const [displayApp, setDisplayApp] = useState({})
const [currentClient, setCurrentClient] = useState(null)
const [client, setClient] = useState([])
const [refersh, setRefersh] = useState(false)
const [clientValue, setClientValue] = useState('')
const [isRentedValue, setIsRentedValue] = useState(false)


// Hook to refresh all appartements and get new ones
useEffect(()=>{
  axios.get('http://localhost:5050/api/appartement/getAllAppartement')
  .then((res)=>{
    setAppartement(res.data)
  })
  .catch((err)=>{ console.log(err.message) })
}, [refersh])

// get all clients
useEffect(()=>{
  axios.get('http://localhost:5050/api/client/getAllClient')
  .then((res)=>{
    setClient(res.data)
    if (res.data.length > 0) {
      // after getting clients select first client
      setClientValue(res.data[0]._id)
    }
  })
  .catch((err)=>{ console.log(err) })
}, [])

// show or hide client dropdown
const [isOpen, setOpen] = useState(false);
const handleDropDown = () => {
setOpen(!isOpen);
};

// initial add and update form states
const initAppartement = () => {
  // empty the state
  setDisplayApp({
    adresse: "",
    prix: "",
    surface: "",
  });

  // isRented false par defaut
  setIsRentedValue(false);
  // select the first client
  setClientValue(client.length > 0 ? client[0]._id : "");
};

// delete Appartement using id
function deleteAppartement(id) {
  axios.delete(`http://localhost:5050/api/appartement/deleteAppartement/${id}`)
  .then((res)=>{
    console.log(res.data)
    // trigger appartement useeffect
    setRefersh(!refersh)
  })
  .catch((err)=>{ 
    console.log(err)
  })
}

// get appartement using id
function getOneAppartement(id){
  axios.get(`http://localhost:5050/api/appartement/getOneAppartement/${id}`)
  .then((res)=>{
    // update state
    setDisplayApp(res.data)
    setCurrentClient(id)
    setIsRentedValue(res.data.isRented)
    if (res.data.client && res.data.isRented)
    {
      setClientValue(res.data.client._id)
    }
    else{
      setClientValue("")
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}

// handle appartement update
const handleSubmit = (e)=>{
  e.preventDefault()
  axios.post(`http://localhost:5050/api/appartement/updateAppartement/${currentClient}`, {...displayApp, isRented: isRentedValue, client: clientValue})
  .then((res)=>{
    console.log(res.data)
    setShowModal2(false)
    // trigger appartement useeffect to get new updates 
    setRefersh(!refersh)
    // init form states
    initAppartement();
  })
  .catch((err)=>{
    console.log(err)
  })
}

// on text input change
const handleChange = (e) => {
  let name = e.target.name;
  let value = e.target.value;

  console.log(name, value);

  if (name === "isRented") {
    value = value === "true" ? true : false;
    setIsRentedValue(value);
  }

  else if (name === "client") {
    setClientValue(value);
  }

  else {
    setDisplayApp({...displayApp, [name] : value})
  }
}

// create appartement
const handleSubmitAdd = async(e) =>{
  e.preventDefault()
  await axios.post('http://localhost:5050/api/appartement/addAppartement', {...displayApp, isRented: isRentedValue, client: clientValue})
  .then((res)=>{ 
    console.log(res.data)
    initAppartement();
    setShowModal(false);
    setRefersh(!refersh)
   })
  .catch((err)=>{ console.log(err.message) })
  console.table({...displayApp, isRented: isRentedValue, client: clientValue});
}

return(
<>
  <SideBar />
  <section className="home-section ">
    <div className="flex justify-between">
      <div className="text">Apartment</div>
      <div className="p-4 mr-3">
        <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={ () => { setShowModal(true); initAppartement(); } }
          >
          Add
        </button>
      </div>
    </div>

    <div className="rounded-lg border border-gray-200 shadow-md m-3 overflow-x-scroll">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Adresse</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Prix</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Surface</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">IsRented</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Client</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {
          Appartement.map((appartement)=>{
          return(
          <tr key={'apprt'+appartement._id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <span>
                {appartement.adresse}
              </span>
            </td>
            <td className="px-6 py-4">{appartement.prix}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span>
                  {appartement.surface}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span>
                  {String(appartement.isRented)}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              {
              appartement.isRented === true ?
              <>
                <button
                  className="text-white text-current hover:text-current focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                  onClick={handleDropDown}>
                  Client
                  <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div id="dropdown" className={`w-44 bg-white shadow ${isOpen ? "block" : "hidden" }`}>
                  <ul className="py-1 text-sm text-white-700 dark:text-white-200"
                    aria-labelledby="dropdownDefaultButton">
                    <li>
                      <a href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Full
                        name : {appartement.client.fullname}</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">cin :
                        {appartement.client.cin}</a>
                    </li>
                    <li>
                      <a href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">tel :
                        {appartement.client.tel}</a>
                    </li>
                  </ul>
                </div>
              </> :
              <div>no client found</div>
              }
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-end gap-4">
                <button type="button" onClick={()=> {setShowModal2(true); getOneAppartement(appartement._id)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>
                <button type="button" onClick={()=>deleteAppartement(appartement._id)} x-data="{ tooltip: 'Delete' }">
                  {/* <a href=""> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                      stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  {/* </a> */}
                </button>
              </div>
            </td>
          </tr>
          )
          })
          }
        </tbody>
      </table>
    </div>



    {/* Model update */}
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
                    ×
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
                      name="adresse" onChange={handleChange} value={displayApp.adresse} />
                    <label htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Adresse
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input type="text" id="floating_phone" className="
                                bg-transparent border-0 border-b-2 border-gray-300 
                                block py-2.5 px-0 w-full text-sm text-gray-900
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                appearance-none 
                                dark:text-black dark:border-gray-600 dark:focus:border-blue-500 " placeholder=""
                        name="prix" onChange={handleChange} value={displayApp.prix} />
                      <label htmlFor="floating_phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        prix
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input type="text" id="floating_company" className="
                                bg-transparent border-0 border-b-2 border-gray-300 
                                block py-2.5 px-0 w-full text-sm text-gray-900
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                appearance-none 
                                dark:text-black dark:border-gray-600 dark:focus:border-blue-500 " placeholder=""
                        name="surface" onChange={handleChange} value={displayApp.surface} />
                      <label htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Surface
                      </label>
                      <div className="text-red-600 text-xs"></div>

                    </div>
                  </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <select id="isRented"
                        className="mt-3 text-black border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
                        onChange={handleChange} name="isRented" value={isRentedValue}>
                        <option value="false">false</option>
                        <option value="true">true</option>
                      </select>
                      <label htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Is it rented
                      </label>
                      <div className="text-red-600 text-xs"></div>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <select id="client" name="client" onChange={handleChange} value={clientValue}
                        className="mt-3 text-black border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500">
                        { 
                        isRentedValue === true ? 
                        client.map((client) => { return(
                          <option value={client._id}>{client.fullname}</option>
                        ) }) 
                        :
                          <option value="">no one</option>
                      }
                      </select>
                      <label htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        client
                      </label>
                      <div className="text-red-600 text-xs"></div>
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

    {/* Model add */}
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
                  Add Apartement
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
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                <form onSubmit={handleSubmitAdd}>
                  <div className="relative z-0 w-full mb-6 group">
                    <input type="text" id="floating_email" className="
                      bg-transparent border-0 border-b-2 border-gray-300 
                      block py-2.5 px-0 w-full text-sm text-gray-900
                      focus:outline-none focus:ring-0 focus:border-blue-600 peer
                      appearance-none 
                      dark:text-black dark:border-gray-600 dark:focus:border-blue-500 " placeholder="" name="adresse"
                      onChange={handleChange} value={displayApp.adresse} />
                    <label htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Adresse
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input type="text" id="floating_phone" className="
                        bg-transparent border-0 border-b-2 border-gray-300 
                        block py-2.5 px-0 w-full text-sm text-gray-900
                        focus:outline-none focus:ring-0 focus:border-blue-600 peer
                        appearance-none 
                        dark:text-black dark:border-gray-600 dark:focus:border-blue-500 " placeholder="" name="prix"
                        onChange={handleChange} value={displayApp.prix} />
                      <label htmlFor="floating_phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        prix
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input type="text" id="floating_company" className="
                        bg-transparent border-0 border-b-2 border-gray-300 
                        block py-2.5 px-0 w-full text-sm text-gray-900
                        focus:outline-none focus:ring-0 focus:border-blue-600 peer
                        appearance-none 
                        dark:text-black dark:border-gray-600 dark:focus:border-blue-500 " placeholder="" name="surface"
                        onChange={handleChange} value={displayApp.surface} />
                      <label htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Surface
                      </label>
                      <div className="text-red-600 text-xs"></div>

                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <select id="isRented"
                        className="mt-3 text-black border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
                        onChange={handleChange} name="isRented" value={isRentedValue}>
                        <option value="false">false</option>
                        <option value="true">true</option>
                      </select>
                      <label htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Is it rented
                      </label>
                      <div className="text-red-600 text-xs"></div>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <select id="client" name="client" onChange={handleChange} value={clientValue}
                        className="mt-3 text-black border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500">
                        { 
                        isRentedValue === true ? 
                        client.map((client) => { return(
                          <option value={client._id}>{client.fullname}</option>
                        ) }) 
                        :
                          <option value="">no one</option>
                      }
                      </select>
                      <label htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        client
                      </label>
                      <div className="text-red-600 text-xs"></div>
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
                      add
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