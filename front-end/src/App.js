import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import Dashboard from "./Component/dashboard";
import Client from "./Component/client";

function App() {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/client" element={<Client />} />
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
