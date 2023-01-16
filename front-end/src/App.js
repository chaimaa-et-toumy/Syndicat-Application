import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import Dashboard from "./pages/dashboard";
import Client from "./pages/client/client";
import Appartement from "./pages/appartement";
import Login from "./pages/auth/Login";
import Forgotpassword from "./pages/auth/Forgotpassword";
import Resetpassword from "./pages/auth/Resetpassword";
import Payment from "./pages/payment/payment";
import NotFound from "./pages/NotFound";
import ProtectRoute from "./Utils/ProtectRoute";
import ExportPdf from "./pages/payment/exportPdf";

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
            <Route path="/exportPdf/:id" element={<ExportPdf />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
