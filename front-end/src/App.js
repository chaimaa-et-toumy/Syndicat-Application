import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import Dashboard from "./Component/dashboard";
import Client from "./Component/client";
import Appartement from "./Component/appartement";
import Login from "./Component/Login";
import Forgotpassword from "./Component/Forgotpassword";
import Resetpassword from "./Component/Resetpassword";

function App() {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/client" element={<Client />} />
          <Route path="/appartement" element={<Appartement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword/:token" element={<Resetpassword />} />
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
