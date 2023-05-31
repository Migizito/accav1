import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as IconName from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../functions";
import { act } from "react-dom/test-utils";

export const TimeReports = () => {
  const url = "https://api-acca.azurewebsites.net";
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchConsultant, setSearchConsultant] = useState("");
  const [searchAppendix, setSearchAppendix] = useState("");
  const [clients, setClients] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [appendixes, setAppendixes] = useState([]);
  const [tablaCliente, setTablaCliente] = useState([]);
  const [tablaConsultor, setTablaConsultor] = useState([]);
  const [tableAppendixes, setTableAppendixes] = useState([]);
  const [tableReports, setTableReports] = useState([]);
  const [id, setId] = useState("");
  const [serial, setSerial] = useState("");
  const [clientName, setClientName] = useState("");
  const [consultantName, setConsultantName] = useState("");
  const [appendixName, setAppendixName] = useState("");
  const [horas, setHoras] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [firmaEmpleado, setFirmaEmpleado] = useState("");
  const [firmaCliente, setFirmaCliente] = useState("");
  const [activities, setActivities] = useState([]);
  const [idActivity, setIdActivity] = useState("");
  const [nameActivity, setNameActivity] = useState("");
  const [codeActivity, setCodeActivity] = useState("");
  const [categoryActivity, setCategoryActivity] = useState("");
  const [response, setResponse] = useState(null);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    handleGetReports();
    handleGetClients();
    handleGetConsultants();
    handleGetAppendixes();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tableReports.filter((report) => {
      if (
        report.clientName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return report;
      }
    });
    setReports(resultadosBusqueda);
  };

  async function handleGetClients() {
    const response = await fetch(
      "https://api-acca.azurewebsites.net/GetClients"
    );
    const data = await response.json();
    setClients(data);
    setTablaCliente(data);
  }

  async function handleGetConsultants() {
    const response = await fetch(
      "https://api-acca.azurewebsites.net/GetConsultants"
    );
    const data = await response.json();
    setConsultants(data);
    setTablaConsultor(data);
  }

  async function handleGetAppendixes() {
    const response = await fetch(
      "https://api-acca.azurewebsites.net/GetAppendixes"
    );
    const data = await response.json();
    setAppendixes(data);
    setTableAppendixes(data);
  }

  const filteredOptionsClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOptionsConsultant = consultants.filter((consultant) =>
    consultant.name.toLowerCase().includes(searchConsultant.toLowerCase())
  );

  const filteredOptionsAppendix = appendixes.filter((appendix) =>
    appendix.projectName.toLowerCase().includes(searchAppendix.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setSearchConsultant(event.target.value);
  };
  const handleInputChange3 = (event) => {
    setSearchAppendix(event.target.value);
  };
  async function handleCreateReport() {
    const data = {
      id: id,
      serial: serial,
      clientName: clientName,
      consultantName: consultantName,
      appendixName: appendixName,
      horas: horas,
      observaciones: observaciones,
      firmaEmpleado: firmaEmpleado,
      firmaCliente: firmaCliente,
      activities: [
        {
          id: idActivity,
          name: nameActivity,
          code: codeActivity,
          category: categoryActivity,
        }
      ],
    };

    const response = await fetch(
      "https://api-acca.azurewebsites.net/CreateReport",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();
    setResponse(responseData);
    // Actualizar la lista de consutlores después de crear uno nuevo
    handleGetReports();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "Reporte de tiempo creado!",
      text: "El reporte de tiempo se ha creado correctamente.",
    });
  }

  async function handleGetReports() {
    const response = await fetch(
      "https://api-acca.azurewebsites.net/GetReports"
    );
    const data = await response.json();
    setReports(data);
    setTableReports(data);
  }

  async function handleUpdateReports(report) {
    const data = {
      id: report.id,
      serial: report.serial,
      clientName: report.clientName,
      consultantName: report.consultantName,
      appendixName: report.appendixName,
      horas: report.horas,
      observaciones: report.observaciones,
      firmaEmpleado: report.firmaEmpleado,
      firmaCliente: report.firmaCliente,
      activities: report.activities,
    };

    const response = await fetch(
      `https://api-acca.azurewebsites.net/EditReportById/${report.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();
    setResponse(responseData);

    // Actualizar la lista de clientes después de actualizar uno existente
    handleGetReports();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "Reporte de tiempo actualizado!",
      text: "El reporte de tiempo se ha actualizado correctamente.",
    });
  }

  async function handleDeleteReport(report) {
    const response = await fetch(
      `https://api-acca.azurewebsites.net/DeleteReport/${report.id}`,
      {
        method: "DELETE",
      }
    );

    const responseData = await response.json();
    setResponse(responseData);

    // Actualizar la lista de clientes después de eliminar uno existente
    handleGetReports();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "Reporte de tiempo eliminado!",
      text: "El reporte de tiempo se ha eliminado correctamente.",
    });
  }
  function validateFields(name, category) {
    const errors = [];
    let isValid = true;

    if (!name) {
      errors.push("El campo nombre es requerido");
      isValid = false;
    }

    if (!category || isNaN(category) || category < 1 || category > 6) {
      errors.push("La categoría debe ser un número válido entre 1 y 6");
      isValid = false;
    }

    return { isValid, errors };
  }

  const openModal = (
    op,
    id,
    serial,
    clientName,
    consultantName,
    appendixName,
    horas,
    observaciones,
    firmaEmpleado,
    firmaCliente,
    activities
  ) => {
    setId("");
    setSerial("");
    setClientName("");
    setConsultantName("");
    setAppendixName("");
    setHoras("");
    setObservaciones("");
    setFirmaEmpleado("");
    setFirmaCliente("");
    setActivities([]);
    setOperation(op);
    if (op === 1) {
      setTitle("Agregar Reporte");
    } else if (op === 2) {
      setTitle("Editar Reporte");
      setId(id);
      setSerial(serial);
      setClientName(clientName);
      setConsultantName(consultantName);
      setAppendixName(appendixName);
      setHoras(horas);
      setObservaciones(observaciones);
      setFirmaEmpleado(firmaEmpleado);
      setFirmaCliente(firmaCliente);
      setActivities([
        {
          idActivity: activities.id,
          name: activities.name,
          code: activities.code,
          category: activities.category,
        },
      ]);
    }
    window.setTimeout(() => {
      document.getElementById("serial").focus();
    }, 500);
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3 w-100">
          <div className="col-md-4 offset-4">
            <div className="d-grid mx-auto">
              <button
                onClick={() => openModal(1)}
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#modalProducts"
              >
                <i className="fa-solid fa-circle-plus"></i>Añadir
              </button>
            </div>
          </div>
        </div>
        <div className="containerInput">
          <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Búsqueda"
            onChange={handleChange}
          />
          <button className="btn btn-success">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="row mt-3">
          <div className="tabla">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>SERIAL</th>
                    <th>CLIENTE</th>
                    <th>CONSULTOR</th>
                    <th>ANEXO</th>
                    <th>HORAS</th>
                    <th>OBSERVACIONES</th>
                    <th>EMPLEADO</th>
                    <th>ACTIVIDAD</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.serial}</td>
                      <td>{report.clientName}</td>
                      <td>{report.consultantName}</td>
                      <td>{report.appendixName}</td>
                      <td>{report.horas}</td>
                      <td>{report.observaciones}</td>
                      <td>{report.firmaEmpleado}</td>
                      <td>
                            <Link to={`/activities/${report.id}`} className="btn btn-primary" style={{ textDecoration: "none" }}>
                              <IconName.FaAdjust className="me-2" />
                              Ver Actividades
                            </Link>                         
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              report.id,
                              report.serial,
                              report.clientName,
                              report.consultantName,
                              report.appendixName,
                              report.horas,
                              report.observaciones,
                              report.firmaEmpleado,
                              report.activities
                            )
                          }
                          className="btn btn-warning"
                        >
                          <i
                            className="fa-solid fa-edit"
                            data-bs-toggle="modal"
                            data-bs-target="#modalProducts"
                          ></i>
                        </button>
                        &nbsp;
                        <button
                          onClick={() => handleDeleteReport(report)}
                          className="btn btn-danger"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="modalProducts" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="serial"
                  className="form-control"
                  placeholder="Serial"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Buscar Cliente..."
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-user-plus"></i>
                </span>
                <select
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  class="form-select"
                  aria-label=".form-select-sm example"
                >
                  <option selected>Selecciona Cliente</option>
                  {filteredOptionsClients.map((client) => (
                    <option key={client.id} value={client.name}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={searchConsultant}
                  onChange={handleInputChange2}
                  placeholder="Buscar Consultor..."
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-user-plus"></i>
                </span>
                <select
                  id="consultantName"
                  value={consultantName}
                  onChange={(e) => setConsultantName(e.target.value)}
                  class="form-select"
                  aria-label=".form-select-sm example"
                >
                  <option selected>Selecciona Consultor</option>
                  {filteredOptionsConsultant.map((consultant) => (
                    <option key={consultant.id} value={consultant.name}>
                      {consultant.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={searchAppendix}
                  onChange={handleInputChange3}
                  placeholder="Buscar Anexo..."
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-user-plus"></i>
                </span>
                <select
                  id="appendixName"
                  value={appendixName}
                  onChange={(e) => setAppendixName(e.target.value)}
                  class="form-select"
                  aria-label=".form-select-sm example"
                >
                  <option selected>Selecciona Anexo</option>
                  {filteredOptionsAppendix.map((appendix) => (
                    <option key={appendix.id} value={appendix.projectName}>
                      {appendix.projectName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-sharp fa-solid fa-link"></i>
                </span>
                <input
                  type="text"
                  id="horas"
                  className="form-control"
                  placeholder="Horas"
                  value={horas}
                  onChange={(e) => setHoras(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-comments"></i>
                </span>
                <input
                  type="text"
                  id="observaciones"
                  className="form-control"
                  placeholder="Observaciones"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-comments"></i>
                </span>
                <input
                  type="text"
                  id="firmaEmpleado"
                  className="form-control"
                  placeholder="Firma Empleado"
                  value={firmaEmpleado}
                  onChange={(e) => setFirmaEmpleado(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-comments"></i>
                </span>
                <input
                  type="text"
                  id="firmaCliente"
                  className="form-control"
                  placeholder="Firma Cliente"
                  value={firmaCliente}
                  onChange={(e) => setFirmaCliente(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-comments"></i>{" "}
                </span>
                <input
                  type="text"
                  id="nameActivity"
                  className="form-control"
                  placeholder="Nombre Actividad"
                  value={nameActivity}
                  onChange={(e) => setNameActivity(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-comments"></i>{" "}
                </span>
                <input
                  type="text"
                  id="codeActivity"
                  className="form-control"
                  placeholder="Codigo Actividad"
                  value={codeActivity}
                  onChange={(e) => setCodeActivity(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-comments"></i>{" "}
                </span>
                <input
                  type="text"
                  id="categoryActivity"
                  className="form-control"
                  placeholder="Categoria Actividad"
                  value={categoryActivity}
                  onChange={(e) => setCategoryActivity(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() => handleCreateReport()}
                  className="btn btn-success"
                >
                  <i className="fa-solid fa-check"></i>Guardar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="btnClose"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
