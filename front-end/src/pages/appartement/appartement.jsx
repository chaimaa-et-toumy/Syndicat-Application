import { useEffect, useState } from "react";
import axios from 'axios'
import SideBar from "../../Component/sideBar";
import AddAppartement from "./addAppartement";
import EditAppartement from "./EditAppartement";
export default function Appartement(){
const [Appartement, setAppartement] = useState([])
const [refresh, setRefresh] = useState(false)


// Hook to refresh all appartements and get new ones
useEffect(()=>{
  axios.get('http://localhost:5050/api/appartement/getAllAppartement')
  .then((res)=>{
    setAppartement(res.data)
  })
  .catch((err)=>{ console.log(err.message) })
}, [refresh])

// show or hide client dropdown
const [isOpen, setOpen] = useState(false);
const handleDropDown = () => {
setOpen(!isOpen);
};

// delete Appartement using id
function deleteAppartement(id) {
  axios.delete(`http://localhost:5050/api/appartement/deleteAppartement/${id}`)
  .then((res)=>{
    console.log(res.data)
    // trigger appartement useeffect
    setRefresh(!refresh)
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
      <div className="text">Apartment</div>
      <div className="p-4 mr-3">
       <AddAppartement setRefresh={setRefresh} />
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
              <EditAppartement
              id={appartement._id}
              setRefresh={setRefresh}
               />
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
  </section>

</>
)
}