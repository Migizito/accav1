import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { ShowClients } from "./components/ShowClients";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import "./App.css";
import { Consultants } from "./components/Consultants";
import { Contracts } from "./components/Contracts";
import { Anexos } from "./components/Anexos";
import { Bills } from "./components/Bills";
import { TimeReports } from "./components/TimeReports";
import { Servicios } from "./components/Servicios";
import { Activities } from "./components/Activities";
import { About } from "./components/About";
function App() {
  return (
    <BrowserRouter>
      
      <div className="flex">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<ShowClients />} />
            <Route path="/about" element={<About />} />
            <Route path="/clientes" element={<ShowClients />} />
            <Route path="/consultores" element={<Consultants />} />
            <Route path="/contratos" element={<Contracts />} />
            <Route path="/anexos" element={<Anexos />} />
            <Route path="/facturas" element={<Bills />} />
            <Route path="/reportestiempo" element={<TimeReports />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/activities/:activity" element={<Activities />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
