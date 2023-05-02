import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../functions";

export const TimeReports = () => {
  const url = "https://api-acca.azurewebsites.net";
    const [reports, setReports] = useState([]);
    const [id, setId] = useState("");
    const [clientName, setClientName] = useState("");
    const [consultantName, setConsultantName] = useState("");
    const [appendixName, setAppendixName] = useState("");
    const [week, setWeek] = useState("");
    const [horasNormalesFacturables, setHorasNormalesFacturables] = useState("");
    const [horasNormalesNoFacturables, setHorasNormalesNoFacturables] = useState("");
    const [horasNormalesOficina, setHorasNormalesOficina] = useState("");
    const [horasEntrenamiento, setHorasEntrenamiento] = useState("");
    const [horasPermisoEnfermedad, setHorasPermisoEnfermedad] = useState("");
    const [horasVacaciones, setHorasVacaciones] = useState("");
    const [horasFeriadoFacturable, setHorasFeriadoFacturable] = useState("");
    const [horasFeriadoNoFacturable, setHorasFeriadoNoFacturable] = useState("");
    const [horasFeriadoOficina, setHorasFeriadoOficina] = useState("");
    const [horasViajeFacturable, setHorasViajeFacturable] = useState("");
    const [horasViajeNoFacturable, setHorasViajeNoFacturable] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [response, setResponse] = useState(null);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState("");
  
    useEffect(() => {
      handleGetReports();
    }, []);
  
    async function handleCreateReport() {
      const data = {
        id: id,
        clientName: clientName,
        consultantName: consultantName,
        appendixName: appendixName,
        week: week,
        horasNormalesFacturables: horasNormalesFacturables,
        horasNormalesNoFacturables: horasNormalesNoFacturables,
        horasNormalesOficina: horasNormalesOficina,
        horasEntrenamiento: horasEntrenamiento,
        horasPermisoEnfermedad: horasPermisoEnfermedad,
        horasVacaciones: horasVacaciones,
        horasFeriadoFacturable: horasFeriadoFacturable,
        horasFeriadoNoFacturable: horasFeriadoNoFacturable,
        horasFeriadoOficina: horasFeriadoOficina,
        horasViajeFacturable: horasViajeFacturable,
        horasViajeNoFacturable: horasViajeNoFacturable,
        observaciones: observaciones,
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
    }
  
    async function handleUpdateReports(report) {
      const data = {
        id: report.id,
        clientName: report.clientName,
        consultantName: report.consultantName,
        appendixName: report.appendixName,
        week: report.week,
        horasNormalesFacturables: report.horasNormalesFacturables,
        horasNormalesNoFacturables: report.horasNormalesNoFacturables,
        horasNormalesOficina: report.horasNormalesOficina,
        horasEntrenamiento: report.horasEntrenamiento,
        horasPermisoEnfermedad: report.horasPermisoEnfermedad,
        horasVacaciones: report.horasVacaciones,
        horasFeriadoFacturable: report.horasFeriadoFacturable,
        horasFeriadoNoFacturable: report.horasFeriadoNoFacturable,
        horasFeriadoOficina: report.horasFeriadoOficina,
        horasViajeFacturable: report.horasViajeFacturable,
        horasViajeNoFacturable: report.horasViajeNoFacturable,
        observaciones: report.observaciones,
      };
  
      const response = await fetch(
        `https://api-acca.azurewebsites.net/UpdateReport/${report.id}`,
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
  
    const openModal = (op, id, name, category) => {
      setId("");
      setClientName("");
      setConsultantName("");
      setAppendixName("");
      setWeek("");
      setHorasNormalesFacturables("");
      setHorasNormalesNoFacturables("");
      setHorasNormalesOficina("");
      setHorasEntrenamiento("");
      setHorasPermisoEnfermedad("");
      setHorasVacaciones("");
      setHorasFeriadoFacturable("");
      setHorasFeriadoNoFacturable("");
      setHorasFeriadoOficina("");
      setHorasViajeFacturable("");
      setHorasViajeNoFacturable("");
      setObservaciones("");
      setOperation(op);
      if (op === 1) {
        setTitle("Agregar Consultor");
      } else if (op === 2) {
        setTitle("Editar Consultor");
        setId(id);
        setClientName(name);
      }
      window.setTimeout(() => {
        document.getElementById("clientName").focus();
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
        <div className="row mt-3">
          <div className="tabla">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>CLIENTE</th>
                    <th>CONSULTOR</th>
                    <th>ANEXO</th>
                    <th>SEMANAS</th>
                    <th>HORAS FACTURABLES</th>
                    <th>HORAS OFICINA</th>
                    <th>OBSERVACIONES</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.clientName}</td>
                      <td>{report.consultantName}</td>
                      <td>{report.appendixName}</td>
                      <td>{report.week}</td>
                      <td>{report.horasNormalesFacturables}</td>
                      <td>{report.horasNormalesOficina}</td>
                      <td>{report.observaciones}</td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              report.id,
                              report.clientName,
                              report.consultantName,
                              report.appendixName,
                              report.week,
                              report.horasNormalesFacturables,
                              report.horasNormalesOficina,
                              report.observaciones
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
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="clientName"
                  className="form-control"
                  placeholder="Nombre del Cliente"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="consultantName"
                  className="form-control"
                  placeholder="Nombre del Consultor"
                  value={consultantName}
                  onChange={(e) => setConsultantName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="appendix"
                  className="form-control"
                  placeholder="Anexo"
                  value={appendixName}
                  onChange={(e) => setAppendixName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="week"
                  className="form-control"
                  placeholder="Semanas"
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasNormalesFacturables"
                  className="form-control"
                  placeholder="Horas Normales Facturables"
                  value={horasNormalesFacturables}
                  onChange={(e) => setHorasNormalesFacturables(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasNormalesNoFacturables"
                  className="form-control"
                  placeholder="Horas Normales No Facturables"
                  value={horasNormalesNoFacturables}
                  onChange={(e) => setHorasNormalesNoFacturables(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasNormalesOficina"
                  className="form-control"
                  placeholder="Horas Normales Oficina"
                  value={horasNormalesOficina}
                  onChange={(e) => setHorasNormalesOficina(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasEntrenamiento"
                  className="form-control"
                  placeholder="Horas Entrenamiento"
                  value={horasEntrenamiento}
                  onChange={(e) => setHorasEntrenamiento(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasPermisoEnfermedad"
                  className="form-control"
                  placeholder="Horas Permiso Enfermedad"
                  value={horasPermisoEnfermedad}
                  onChange={(e) => setHorasPermisoEnfermedad(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasVacaciones"
                  className="form-control"
                  placeholder="Horas Vacaciones"
                  value={horasVacaciones}
                  onChange={(e) => setHorasVacaciones(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasFeriadoFacturable"
                  className="form-control"
                  placeholder="Horas Feriado Facturable"
                  value={horasFeriadoFacturable}
                  onChange={(e) => setHorasFeriadoFacturable(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasFeriadoNoFacturable"
                  className="form-control"
                  placeholder="Horas Feriado No Facturable"
                  value={horasFeriadoNoFacturable}
                  onChange={(e) => setHorasFeriadoNoFacturable(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasFeriadoOficina"
                  className="form-control"
                  placeholder="Horas Feriado Oficina"
                  value={horasFeriadoOficina}
                  onChange={(e) => setHorasFeriadoOficina(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasViajeFacturable"
                  className="form-control"
                  placeholder="Horas Viaje Facturable"
                  value={horasViajeFacturable}
                  onChange={(e) => setHorasViajeFacturable(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasViajeNoFacturable"
                  className="form-control"
                  placeholder="Horas ViajeNoFacturable"
                  value={horasViajeNoFacturable}
                  onChange={(e) => setHorasViajeNoFacturable(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
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
  )
}
