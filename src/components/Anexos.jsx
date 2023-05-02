import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../functions";

export const Anexos = () => {
  const url = "https://api-acca.azurewebsites.net";
    const [appendixes, setAppendixes] = useState([]);
    const [id, setId] = useState("");
    const [projectName, setProjectName] = useState("");
    const [assignment, setAssignment] = useState("");
    const [consultorName, setConsultorName] = useState("");
    const [horasTrabajadas, setHorasTrabajadas] = useState("");
    const [costoEstimado, setCostoEstimado] = useState("");
    const [montoFacturado, setMontoFacturado] = useState("");
    const [clientName, setClientName] = useState("");
    const [contractId, setContractId] = useState("");
    const [response, setResponse] = useState(null);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState("");
  
    useEffect(() => {
      handleGetAppendixes();
    }, []);
  
    async function handleCreateAppendix() {
      const data = {
        id: id,
        projectName: projectName,
        assignment: assignment,
        consultorName: consultorName,
        horasTrabajadas: horasTrabajadas,
        costoEstimado: costoEstimado,
        montoFacturado: montoFacturado,
        clientName: clientName,
        contractId: contractId,
      };
  
      const response = await fetch(
        "https://api-acca.azurewebsites.net/CreateAppendix",
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
      handleGetAppendixes();
  
      // Mostrar alerta
      Swal.fire({
        icon: "success",
        title: "Anexo creado!",
        text: "El anexo se ha creado correctamente.",
      });
    }
  
    async function handleGetAppendixes() {
      const response = await fetch(
        "https://api-acca.azurewebsites.net/GetAppendixes"
      );
      const data = await response.json();
      setAppendixes(data);
    }
  
    async function handleUpdateAppendixes(appendix) {
      const data = {
        id: appendix.id,
        projectName: appendix.projectName,
        assignment: appendix.assignment,
        consultorName: appendix.consultorName,
        horasTrabajadas: appendix.horasTrabajadas,
        costoEstimado: appendix.costoEstimado,
        montoFacturado: appendix.montoFacturado,
        clientName: appendix.clientName,
        contractId: appendix.contractId,
      };
  
      const response = await fetch(
        `https://api-acca.azurewebsites.net/UpdateAppendix/${appendix.id}`,
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
      handleGetAppendixes();
  
      // Mostrar alerta
      Swal.fire({
        icon: "success",
        title: "Anexo actualizado!",
        text: "El anexo se ha actualizado correctamente.",
      });
    }
  
    async function handleDeleteAppendix(appendix) {
      const response = await fetch(
        `https://api-acca.azurewebsites.net/DeleteAppendixById/${appendix.id}`,
        {
          method: "DELETE",
        }
      );
  
      const responseData = await response.json();
      setResponse(responseData);
  
      // Actualizar la lista de clientes después de eliminar uno existente
      handleGetAppendixes();
  
      // Mostrar alerta
      Swal.fire({
        icon: "success",
        title: "Anexo eliminado!",
        text: "El anexo se ha eliminado correctamente.",
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
  
    const openModal = (op, id, projectName, category) => {
      setId("");
      setProjectName("");
      setAssignment("");
      setConsultorName("");
      setHorasTrabajadas("");
      setCostoEstimado("");
      setMontoFacturado("");
      setClientName("");
      setContractId("");
      setOperation(op);
      if (op === 1) {
        setTitle("Agregar Consultor");
      } else if (op === 2) {
        setTitle("Editar Consultor");
        setId(id);
        setProjectName(projectName);
      setAssignment("");
      setConsultorName("");
      setHorasTrabajadas("");
      setCostoEstimado("");
      setMontoFacturado("");
      setClientName("");
      setContractId("");
      }
      window.setTimeout(() => {
        document.getElementById("nombre").focus();
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
                    <th>PROYECTO</th>
                    <th>ASIGNACION</th>
                    <th>CONSULTOR</th>
                    <th>HORAS TRABAJADAS</th>
                    <th>COSTO</th>
                    <th>MONTO</th>
                    <th>CLIENTE</th>
                    <th>CONTRATO</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {appendixes.map((appendix) => (
                    <tr key={appendix.id}>
                      <td>{appendix.id}</td>
                      <td>{appendix.projectName}</td>
                      <td>{appendix.assignment}</td>
                      <td>{appendix.consultorName}</td>
                      <td>{appendix.horasTrabajadas}</td>
                      <td>{appendix.costoEstimado}</td>
                      <td>{appendix.montoFacturado}</td>
                      <td>{appendix.clientName}</td>
                      <td>{appendix.contractId}</td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              appendix.id,
                              appendix.projectName,
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
                          onClick={() => handleDeleteAppendix(appendix)}
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
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="assignment"
                  className="form-control"
                  placeholder="Asignacion"
                  value={assignment}
                  onChange={(e) => setAssignment(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="consultorName"
                  className="form-control"
                  placeholder="Nombre de Consultor"
                  value={consultorName}
                  onChange={(e) => setConsultorName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="horasTrabajadas"
                  className="form-control"
                  placeholder="Horas Trabajadas"
                  value={horasTrabajadas}
                  onChange={(e) => setHorasTrabajadas(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="costoEstimado"
                  className="form-control"
                  placeholder="Costo Estimado"
                  value={costoEstimado}
                  onChange={(e) => setCostoEstimado(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="montoFacturado"
                  className="form-control"
                  placeholder="Monto Facturado"
                  value={montoFacturado}
                  onChange={(e) => setMontoFacturado(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="clientName"
                  className="form-control"
                  placeholder="Nombre de Cliente"
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
                  id="contractId"
                  className="form-control"
                  placeholder="Contrato"
                  value={contractId}
                  onChange={(e) => setContractId(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() => handleCreateAppendix()}
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
