import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../functions";

export const Contracts = () => {
  const url = "https://api-acca.azurewebsites.net";
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [tablaCliente, setTablaCliente] = useState([]); 
  const [contracts, setContracts] = useState([]);
  const [tableContracts, setTableContracts] = useState([]);
  const [id, setId] = useState("");
  const [clase, setClase] = useState("");
  const [clienteName, setClienteName] = useState("");
  const [montoMax, setMontoMax] = useState("");
  const [fianza, setFianza] = useState(true);
  const [response, setResponse] = useState(null);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    handleGetContracts();
    handleGetClients();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tableContracts.filter((contract) => {
      if (
        contract.clienteName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return contract;
      }
    });
    setContracts(resultadosBusqueda);
  };

  async function handleCreateContracts() {
    const data = {
      id: id,
      clase: clase,
      clienteName: clienteName,
      montoMax: montoMax,
      fianza: fianza,
    };

    const response = await fetch(
      "https://api-acca.azurewebsites.net/CreateContrato",
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
    handleGetContracts();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "¡Contrato creado!",
      text: "El contrato se ha creado correctamente.",
    });
  }

  async function handleGetClients() {
    const response = await fetch(
      "https://api-acca.azurewebsites.net/GetClients"
    );
    const data = await response.json();
    setClients(data);
    setTablaCliente(data);
  }

  async function handleGetContracts() {
    const response = await fetch(
      "https://api-acca.azurewebsites.net/GetContracts"
    );
    const data = await response.json();
    setContracts(data);
    setTableContracts(data);
  }

  async function handleUpdateContracts(contract) {
    const data = {
      id: contract.id,
      clase: contract.clase,
      clienteName: contract.clienteName,
      montoMax: contract.montoMax,
      fianza: contract.fianza,
    };

    const response = await fetch(
      `https://api-acca.azurewebsites.net/UpdateContracts/${contract.id}`,
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
    handleGetContracts();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "¡Contrato actualizado!",
      text: "El contrato se ha actualizado correctamente.",
    });
  }

  async function handleDeleteContracts(contract) {
    const response = await fetch(
      `https://api-acca.azurewebsites.net/DeleteContratoById/${contract.id}`,
      {
        method: "DELETE",
      }
    );

    const responseData = await response.json();
    setResponse(responseData);

    // Actualizar la lista de clientes después de eliminar uno existente
    handleGetContracts();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "¡Contrato eliminado!",
      text: "El contrato se ha eliminado correctamente.",
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

  function fianzaValidator(fianza) {
    if (fianza) {
      return "Si";
    } else {
      return "No";
    }
  }

  const openModal = (op, id, name, category) => {
    setId("");
    setClase("");
    setMontoMax("");
    setFianza(true);
    setClienteName("");
    setOperation(op);
    if (op === 1) {
      setTitle("Agregar Contrato");
    } else if (op === 2) {
      setTitle("Editar Contrato");
      setId(id);
      setClase("");
      setMontoMax("");
      setFianza(true);
      setClienteName("");
    }
    window.setTimeout(() => {
      document.getElementById("clase").focus();
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
                    <th>CLASE</th>
                    <th>MONTO</th>
                    <th>FIANZA</th>
                    <th>CLIENTE</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {contracts &&
                    contracts.map((contract) => (
                      <tr key={contract.id}>
                        <td>{contract.id}</td>
                        <td>{contract.clase}</td>
                        <td>{contract.montoMax}</td>
                        <td>{fianzaValidator(contract.fianza)}</td>
                        <td>{contract.clienteName}</td>
                        <td>
                          <button
                            onClick={() =>
                              openModal(
                                2,
                                contract.id,
                                contract.clase,
                                contract.montoMax,
                                contract.fianza,
                                contract.clienteName
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
                            onClick={() => handleDeleteContracts(contract)}
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
                  id="clase"
                  className="form-control"
                  placeholder="Clase"
                  value={clase}
                  onChange={(e) => setClase(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="montoMax"
                  className="form-control"
                  placeholder="Monto Maximo"
                  value={montoMax}
                  onChange={(e) => setMontoMax(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="fianza"
                  className="form-control"
                  placeholder="Fianza"
                  value={fianza}
                  onChange={(e) => setFianza(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-comment"></i>
                </span>
                <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Buscar..." />
                <select
                  id="category"
                  value={clienteName}
                  onChange={(e) => setClienteName(e.target.value)}
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                >
                  <option selected>Selecciona Cliente</option>
                  {filteredOptions.map((client) => (
                    <option key={client.id} value={client.name}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() => handleCreateContracts()}
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
