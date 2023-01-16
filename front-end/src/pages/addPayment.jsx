import React from 'react'
import SideBar from '../Component/sideBar'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Input from '../Component/Input'
import {Link, useNavigate} from 'react-router-dom'

export default  function AddPayment() {
    const [appartement, setAppartement] = useState([])
    const [Payment , setPayment] = useState({appartement:"", prix: "", date_paiment: ""})
    const [errors, setError] = useState({appartement:"", prix: "", date_paiment: ""})
    const navigate = useNavigate();
    //get appartement
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
                navigate("/payment") 
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
  return (
    <>
        <SideBar />
        <section className="home-section ">
            <div className="flex justify-between">
                <div className="text">Add Payment</div>
            </div>
            <div className="flex justify-center">
                <form className="w-1/2" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="appartement" className="text-gray-500">adresse appartement</label>
                            <select className="border border-gray-200 rounded-md p-2" name="appartement" id="appartement" value={Payment.appartement} onChange={handleChange}>
                            <option value="" selected disabled>select Appartement</option>
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
                        <div className="flex flex-col gap-2">
                            <label htmlFor="prix" className="text-gray-500">prix</label>
                            <Input 
                                type="text"
                                name="prix" 
                                id="prix"
                                className="border border-gray-200 rounded-md p-2"
                                onChange={handleChange}
                                value = {Payment.prix}
                            />
                            <div className="text-red-600 text-xs">{errors.prix}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="date_paiment" className="text-gray-500">date paiment</label>
                            <Input 
                                type="date"
                                name="date_paiment" 
                                id="date_paiment"
                                className="border border-gray-200 rounded-md p-2"
                                onChange={handleChange}
                                value = {Payment.date_paiment}
                            />
                            <div className="text-red-600 text-xs">{errors.date_paiment}</div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light"
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                <i className="fas fa-plus"></i> Add
                            </button>
                            <Link to="/payment">
                            <div  data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
                                <i className="fas fa-times"></i> Cancel
                            </div>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>

    </>
  )
}