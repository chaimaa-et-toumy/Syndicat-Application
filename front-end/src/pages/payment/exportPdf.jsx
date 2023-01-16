import jsPDF from "jspdf";
import React , { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function ExportPdf() {

const {id} = useParams()
console.log(id)
const [payment, setPayment] = useState({ prix: "", date_paiment: "", appartement: "" })

useEffect(() => {
axios.get(`http://localhost:5050/api/paiment/getOnePaiment/${id}`)
.then((response) => {
setPayment(response.data[0])
console.log(response.data[0])
})
.catch((err) => {
console.log(err.response.data)
})
}, [])

const generatePDF = () => {
const doc = new jsPDF("p", "pt", "a4");
doc.html(document.querySelector("#paiment"), {
callback: function (pdf) {
pdf.save("paiment.pdf");
},
});

console.log(payment)
};

return (
<>
    {/* <div id="paiment">

        <h1>{payment.prix}</h1>
        <h1>{payment.date_paiment}</h1>
        <h1>{payment.appartement.adresse}</h1>
        <h1>{payment.appartement.client?.fullname}</h1>


    </div>
    <button onClick={generatePDF}>PDF</button> */}
    <div>

        <div id="paiment">
            <div
                className="flex flex-row mt-12 mb-2 ml-0 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-4xl  lg:ml-12 xl:ml-12">
                Application Syndique
                <div className="text-cyan-600">
                    <span className="mr-4 text-sm"></span> #
                </div>
            </div>
            <div className="flex flex-col lg:ml-12 xl:ml-12 mt-6 ">
                <span>Prix : {payment.prix}</span>
                <span>Date paiment: {payment.date_paiment}</span>
                <span>Adress : {payment.appartement.adresse}</span>
                <span>full name : {payment.appartement.client?.fullname}</span>
            </div>
            <contract
                className="flex flex-col m-12 text-center lg:m-12 md:flex-none md:text-left md:relative md:m-0 md:mt-16 lg:flex-none lg:text-left lg:relative xl:flex-none xl:text-left xl:relative print:flex-none print:text-left print:relative print:m-0 print:mt-6 print:text-sm">
                <div className="mb-12">
                    <span className="font-extrabold md:hidden lg:hidden xl:hidden print:hidden">FROM</span>
                    <from className="flex flex-col">
                        <span id="company-name" className="font-medium">Appartement</span>
                        <span id="company-country"><span className="flag-icon flag-icon-us" /></span>
                        <span>Adress : {payment.appartement.adresse}</span>
                        <span>Surface: {payment.appartement.surface}</span>
                    </from>
                </div>
                <span className="font-extrabold md:hidden lg:hidden xl:hidden print:hidden">FROM</span>
                <from className="flex flex-col">
                    <span id="company-name" className="font-medium">Client</span>
                    <span>Full name : {payment.appartement.client?.fullname}</span>
                    <span>cin : {payment.appartement.client?.cin}</span>
                    <span>telephone : {payment.appartement.client?.tel}</span>
                </from>
            </contract>
        </div>

        <div className="text-center">
            <button onClick={generatePDF}
                className="bg-cyan-900 hover:bg-cyan-900 text-white py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path fillRule="evenodd"
                        d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                        clipRule="evenodd" />
                    <path
                        d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                </svg>
                <span className='pl-2'>export to pdf</span>
            </button>
        </div>
    </div>
</>
)
}