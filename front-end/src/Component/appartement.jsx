import { useEffect, useState } from "react";
import axios from 'axios'
import SideBar from "./part/sideBar";
export default function Appartement(){

    const [Appartement, setAppartement] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5050/api/appartement/getAllAppartement')
        .then((res)=>{
            setAppartement(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
 
    const [isOpen, setOpen] = useState(false);
    const handleDropDown = () => {
        setOpen(!isOpen);
    };

    return(
        <>
        <SideBar />
        <section className="home-section ">
          <div className="flex justify-between">
            <div className="text">Apartment</div>
            <div className="p-4 mr-3">
              <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
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
                            <tr className="hover:bg-gray-50">
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
                                        appartement.isRented === false ? 
                                         <div>no client found</div>
                                        :
                                        <>
                                        <button className="text-white text-current hover:text-current focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                                            onClick={handleDropDown}>
                                            Client
                                            <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  >
                                            <path  strokeLinecap="round"  strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" ></path>
                                            </svg>
                                        </button>
                                        <div  id="dropdown" className={`w-44 bg-white shadow
                                                ${isOpen ? "block" : "hidden"}`}>
                                                <ul class="py-1 text-sm text-white-700 dark:text-white-200" aria-labelledby="dropdownDefaultButton">
                                                    <li>
                                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Full name : {appartement.client.fullname}</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">cin : {appartement.client.cin}</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">tel : {appartement.client.tel}</a>
                                                    </li>
                                                </ul>
                                        </div>
                                    </>
                                    }          
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex justify-end gap-4">
                                <button type="button">
                                  <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                      stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                                      <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                  </button>
                                </button>
                                <button type="button">
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