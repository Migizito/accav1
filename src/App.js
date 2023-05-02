import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShowClients } from "./components/ShowClients";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import "./App.css";
import { Consultants } from "./components/Consultants";
import { Contracts } from "./components/Contracts";
import { Anexos } from "./components/Anexos";
import { Bills } from "./components/Bills";
import { TimeReports } from "./components/TimeReports";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<ShowClients />} />
            <Route path="/clientes" element={<ShowClients />} />
            <Route path="/consultores" element={<Consultants />} />
            <Route path="/contratos" element={<Contracts />} />
            <Route path="/anexos" element={<Anexos />} />
            <Route path="/facturas" element={<Bills />} />
            <Route path="/reportestiempo" element={<TimeReports />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
