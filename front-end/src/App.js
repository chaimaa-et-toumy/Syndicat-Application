import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import Dashboard from "./pages/dashboard";
import Client from "./pages/client";
import Appartement from "./pages/appartement";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import NotFound from "./pages/NotFound";

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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
