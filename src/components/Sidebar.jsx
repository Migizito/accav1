import React from "react";
import { Link } from "react-router-dom";
import * as IconName from "react-icons/fa";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto min-vh-100 bg-dark">
            <ul>
              <li>
                <Link to="/">
                  <IconName.FaHome className="me-2" /> Inicio
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <IconName.FaRegChartBar className="me-2" /> Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/clientes">
                  <IconName.FaUserFriends className="me-2" /> Clientes
                </Link>
              </li>
              <li>
                <Link to="/consultores">
                  <IconName.FaUserCircle className="me-2" /> Consultores
                </Link>
              </li>
              <li>
                <Link to="/contratos">
                  <IconName.FaFileContract className="me-2" /> Contratos
                </Link>
              </li>
              <li>
                <Link to="/anexos">
                  <IconName.FaClipboard className="me-2" /> Anexos
                </Link>
              </li>
              <li>
                <Link to="/facturas">
                  <IconName.FaFileArchive className="me-2" /> Facturas
                </Link>
              </li>
              <li>
                <Link to="/reportestiempo">
                  <IconName.FaRegTimesCircle className="me-2" /> Reportes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
