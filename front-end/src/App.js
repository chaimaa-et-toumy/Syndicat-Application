import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import Dashboard from "./pages/dashboard";
import Client from "./pages/client";
import Appartement from "./pages/appartement";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import Payment from "./pages/payment";
import NotFound from "./pages/NotFound";
import AddPayment from "./pages/addPayment";
import UpdatePayment from "./pages/updatePayment";
import ProtectRoute from "./Utils/ProtectRoute";

function App() {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword/:token" element={<Resetpassword />} />
          <Route path="/*" element={<NotFound />} />

          <Route element={<ProtectRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/client" element={<Client />} />
            <Route path="/appartement" element={<Appartement />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/addpayment" element={<AddPayment />} />
            <Route path="/EditPayment/:id" element={<UpdatePayment />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
