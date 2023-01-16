import React from 'react'
import SideBar from '../../Component/sideBar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AddPayment from './addPayment'
import EditPayment from './EditPayment'
import { Link } from 'react-router-dom'
export default function Payment() {
  
  const [Payment, setPayment] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:5050/api/paiment/getAllPaiment')
    .then(res => {
      setPayment(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [refresh])

  return (
  <>
    <SideBar />
    <section className="home-section ">
      <div className="flex justify-between">
        <div className="text">Payment</div>
        <div className="p-4 mr-3">
          <button>
            <AddPayment setRefresh={setRefresh} />
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 shadow-md m-3 overflow-x-scroll">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">adress appartement</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Full name client</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">prix</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">date paiment</th>

            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {
            Payment.map((item) => {
              return (
                <>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span>
                        {item.appartement.adresse}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span>
                        {item.appartement.client.fullname}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span>
                      {item.prix}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span>
                      {item.date_paiment}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-end gap-4">
                    <Link to={`/exportPdf/${item._id}`}>
                      <button className="bg-cyan-900 hover:bg-cyan-900 text-white py-2 px-4 rounded inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                          <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
                          <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                        </svg>
                        <span className='pl-2'>export to pdf</span>
                      </button>
                    </Link>
                    </div>

                  </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <EditPayment 
                        id = {item._id}
                        setRefresh={setRefresh}
                        />
                      </div>
                    </td>
                  </tr>
                </>
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