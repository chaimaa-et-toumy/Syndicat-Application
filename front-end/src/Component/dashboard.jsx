import React from 'react';
import SideBar from './part/sideBar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Dashboard(){

  //count of client
  const [client, setClient] = useState(0);
  const [apartmentRented, setApartmentRented] = useState(0);
  const [apartmentNotRented, setApartmentNotRented] = useState(0);

    axios.get('http://localhost:5050/api/client/countClient')
      .then(res => {
        setClient(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    
    axios.get('http://localhost:5050/api/appartement/countAppartementRented')
      .then(res => {
        setApartmentRented(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get('http://localhost:5050/api/appartement/countAppartementNotRented')
      .then(res => {
        setApartmentNotRented(res.data);
      })
      .catch(err => {
        console.log(err);
      })


    





return(
<div>
  <SideBar />
  <section className="home-section">
    <div className="text">Dashboard</div>
     <div className="flex items-center  text-gray-800">
        <div className="p-4 w-full">
          <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-6 md:col-span-3">
                <Link to= "/client">
                  <div className="flex flex-row bg-white shadow-sm rounded p-4">
                    <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div className="flex flex-col flex-grow ml-4">
                      <div className="text-sm text-gray-500">Client</div>
                      <div className="font-bold text-lg">{client}</div>
                    </div>
                  </div>
                </Link>
              </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <Link to="/appartement">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">Apartment rented</div>
                  <div className="font-bold text-lg">{apartmentRented}</div>
                </div>
              </div>
              </Link>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <Link to="/appartement">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">Apartment not rented</div>
                  <div className="font-bold text-lg">{apartmentNotRented}</div>
                </div>
              </div>
              </Link>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">payment</div>
                  <div className="font-bold text-lg">$ 32k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

  </section>
</div>
)
}