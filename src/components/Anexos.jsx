import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../functions";

export const Anexos = () => {
  const url = "https://api-acca.azurewebsites.net";
  const [searchService, setSearchService] = useState("");
  const [searchConsultant, setSearchConsultant] = useState("");
  const [searchContract, setSearchContract] = useState("");
    const [appendixes, setAppendixes] = useState([]);
    const [tableAppendixes, setTableAppendixes] = useState([]);
    const [services, setServices] = useState([]);
    const [tableServices, setTableServices] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [tableConsultants, setTableConsultants] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [tableContracts, setTableContracts] = useState([]);
    const [id, setId] = useState("");
    const [projectName, setProjectName] = useState("");
    const [serviceName, setServiceName] = useState("");	
    const [assignment, setAssignment] = useState("");
    const [consultorName, setConsultorName] = useState("");
    const [horasTrabajadas, setHorasTrabajadas] = useState("");
    const [costoEstimado, setCostoEstimado] = useState("");
    const [clientName, setClientName] = useState("");
    const [contractId, setContractId] = useState("");
    const [response, setResponse] = useState(null);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState("");
    const [busqueda, setBusqueda]= useState("");
  
    useEffect(() => {
      handleGetAppendixes();
      handleGetServices();
      handleGetConsultants();
      handleGetContracts();
    }, []);
  
    const handleChange=(e)=>{
      setBusqueda(e.target.value);
      filtrar(e.target.value);
    }

    const filtrar=(terminoBusqueda)=>{
      var resultadosBusqueda=tableAppendixes.filter((appendix)=>{
        if(appendix.consultorName.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ){
          return appendix;
        }
      });
      setAppendixes(resultadosBusqueda);
    }
    const filteredOptionsService = services.filter((service) =>
    service.name.toLowerCase().includes(searchService.toLowerCase())
  );

  const filteredOptionsConsultant = consultants.filter((consultant) =>
    consultant.name.toLowerCase().includes(searchConsultant.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchService(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setSearchConsultant(event.target.value);
  };
  const handleInputChange3 = (event) => {
    setSearchContract(event.target.value);
  };
    

    async function handleCreateAppendix() {
      const data = {
        id: id,
        projectName: projectName,
        serviceName: serviceName,
        assignment: assignment,
        consultorName: consultorName,
        horasTrabajadas: horasTrabajadas,
        costoEstimado: costoEstimado,
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
      setTableAppendixes(data);
    }

    async function handleGetConsultants() {
      const response = await fetch(
        "https://api-acca.azurewebsites.net/GetConsultants"
      );
      const data = await response.json();
      setConsultants(data);
      setTableConsultants(data);
    }

    async function handleGetServices() {
      const response = await fetch(
        "https://api-acca.azurewebsites.net/GetServices"
      );
      const data = await response.json();
      setServices(data);
      setTableServices(data);
    }

    async function handleGetContracts() {
      const response = await fetch(
        "https://api-acca.azurewebsites.net/GetContracts"
      );
      const data = await response.json();
      setContracts(data);
      setTableContracts(data);
    }

    async function handleUpdateAppendixes(appendix) {
      const data = {
        id: appendix.id,
        projectName: appendix.projectName,
        serviceName: appendix.serviceName,
        assignment: appendix.assignment,
        consultorName: appendix.consultorName,
        horasTrabajadas: appendix.horasTrabajadas,
        costoEstimado: appendix.costoEstimado,
        contractId: appendix.contractId,
      };
  
      const response = await fetch(
        `https://api-acca.azurewebsites.net/EditAppendixById/${appendix.id}`,
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
  
    const openModal = (op, id, projectName, assignment, serviceName, consultorName, horasTrabajadas,costoEstimado, contractId) => {
      setId("");
      setProjectName("");
      setServiceName("");
      setAssignment("");
      setConsultorName("");
      setHorasTrabajadas("");
      setCostoEstimado("");
      setContractId("");
      setOperation(op);
      if (op === 1) {
        setTitle("Agregar Anexo");
      } else if (op === 2) {
        setTitle("Editar Anexo");
        setId(id);
        setProjectName(projectName);
      setAssignment(assignment);
      setServiceName(serviceName);
      setConsultorName(consultorName);
      setHorasTrabajadas(horasTrabajadas);
      setCostoEstimado(costoEstimado);
      setContractId(contractId);
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
                    <th>PROYECTO</th>
                    <th>SERVICIO</th>
                    <th>ASIGNACION</th>
                    <th>CONSULTOR</th>
                    <th>HORAS TRABAJADAS</th>
                    <th>COSTO</th>
                    <th>CONTRATO</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {appendixes.map((appendix) => (
                    <tr key={appendix.id}>
                      <td>{appendix.id}</td>
                      <td>{appendix.projectName}</td>
                      <td>{appendix.serviceName}</td>
                      <td>{appendix.assignment}</td>
                      <td>{appendix.consultorName}</td>
                      <td>{appendix.horasTrabajadas}</td>
                      <td>{appendix.costoEstimado}</td>
                      <td>{appendix.contractId}</td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              appendix.id,
                              appendix.projectName,
                              appendix.serviceName,
                              appendix.assignment,
                              appendix.consultorName,
                              appendix.horasTrabajadas,
                              appendix.costoEstimado,
                              appendix.contractId
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
                <i class="fa-solid fa-circle-nodes"></i>
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
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={searchService}
                  onChange={handleInputChange}
                  placeholder="Buscar Servicio..."
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-user-plus"></i>
                </span>
                <select
                  id="serviceName"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  class="form-select"
                  aria-label=".form-select-sm example"
                >
                  <option selected>Selecciona Servicio</option>
                  {filteredOptionsService.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i class="fa-sharp fa-solid fa-link"></i>                </span>
                <input
                  type="text"
                  id="assignment"
                  className="form-control"
                  placeholder="Asignacion"
                  value={assignment}
                  onChange={(e) => setAssignment(parseInt(e.target.value))}
                ></input>
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
                  id="consultorName"
                  value={consultorName}
                  onChange={(e) => setConsultorName(e.target.value)}
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
                <i class="fa-solid fa-clock"></i>
                </span>
                <input
                  type="text"
                  id="horasTrabajadas"
                  className="form-control"
                  placeholder="Horas Trabajadas"
                  value={horasTrabajadas}
                  onChange={(e) => setHorasTrabajadas(parseInt(e.target.value))}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i class="fa-solid fa-money-check-dollar"></i>
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
                  <i class="fa-solid fa-user-plus"></i>
                </span>
                <select
                  id="contractId"
                  value={contractId}
                  onChange={(e) => setContractId(parseInt(e.target.value))}
                  class="form-select"
                  aria-label=".form-select-sm example"
                >
                  <option selected>Selecciona Contrato</option>
                  {contracts.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      {contract.id}
                    </option>
                  ))}
                </select>
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
