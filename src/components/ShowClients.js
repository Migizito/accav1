import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../functions";
import { ClientsCategory } from "./enums";

export const ShowClients = () => {
  const url = "https://api-acca.azurewebsites.net";
  const [clients, setClients] = useState([]);
  const [tablaCliente, setTablaCliente] = useState([]); // eslint-disable-line no-unused-vars
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState(1);
  const [response, setResponse] = useState(null);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const [busqueda, setBusqueda]= useState("");

  useEffect(() => {
    handleGetClients();
  }, []);

  const handleChange=(e)=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaCliente.filter((client)=>{
      if(client.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return client;
      }
    });
    setClients(resultadosBusqueda);
  }

  async function handleCreateClient() {
    const data = {
      id: id,
      name: name,
      clienteCategory: category,
    };

    const response = await fetch(
      "https://api-acca.azurewebsites.net/CreateClient",
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
    // Actualizar la lista de clientes después de crear uno nuevo
    handleGetClients();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "¡Cliente creado!",
      text: "El cliente se ha creado correctamente.",
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

  async function handleDeleteClient(client) {
    const response = await fetch(
      `https://api-acca.azurewebsites.net/DeleteClienteById/${client.id}`,
      {
        method: "DELETE",
      }
    );

    const responseData = await response.json();
    setResponse(responseData);

    // Actualizar la lista de clientes después de eliminar uno existente
    handleGetClients();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "¡Cliente eliminado!",
      text: "El cliente se ha eliminado correctamente.",
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

  async function handleUpdateClient(id, name, category) {
    const data = {
      id: id,
      name: name,
      clienteCategory: category
    };
  
    try {
      const response = await fetch(
        `https://api-acca.azurewebsites.net/EditClienteById/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      if (response.ok) {
        // Actualización exitosa
        handleGetClients();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "¡Cliente actualizado!",
      text: "El cliente se ha actualizado correctamente.",
    });
        // Aquí puedes realizar cualquier otra acción necesaria después de la actualización exitosa
      } else {
        // Manejo de errores si la respuesta no es exitosa
        console.log("Error al actualizar el cliente");
      }
    } catch (error) {
      // Manejo de errores en caso de una excepción durante la petición
      console.log("Error en la petición: ", error);
    }
  }
  
  

  const openModal = (op, id, name, category) => {
    setId("");
    setName("");
    setCategory("");
    setOperation(op);
    if (op === 1) {
      setTitle("Agregar Cliente");
    } else if (op === 2) {
      setTitle("Editar Cliente");
      setId(id);
      setName(name);
      setCategory(category);
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
                    <th>CLIENTES</th>
                    <th>CATEGORIA</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {clients && clients.map((client) => (
                    <tr key={client.id}>
                      <td>{client.id}</td>
                      <td>{client.name}</td>
                      <td>{ClientsCategory[client.clienteCategory]}</td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              client.id,
                              client.name,
                              ClientsCategory[client.clienteCategory]
                            )
                          }
                          className="btn btn-warning"
                        >
                          <i
                            className="fa-solid fa-edit"
                            data-bs-toggle="modal"
                            data-bs-target="#modalClients"
                          ></i>
                        </button>
                        &nbsp;
                        <button
                          onClick={() => handleDeleteClient(client)}
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
      <div id="modalClients" className="modal fade" aria-hidden="true">
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-comment"></i>
                </span>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(parseInt(e.target.value))}
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                >
                  <option selected>Selecciona Categoría</option>
                  <option value={1}>Gobierno</option>
                  <option value={2}>Industria</option>
                  <option value={3}>Petróleo</option>
                  <option value={4}>Comercio</option>
                  <option value={5}>Banco</option>
                  <option value={6}>Seguros</option>
                </select>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() => handleUpdateClient(id, name, category)}
                  className="btn btn-success"
                >
                  <i className="fa-solid fa-check"></i>Editar
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-comment"></i>
                </span>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(parseInt(e.target.value))}
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                >
                  <option selected>Selecciona Categoría</option>
                  <option value={1}>Gobierno</option>
                  <option value={2}>Industria</option>
                  <option value={3}>Petróleo</option>
                  <option value={4}>Comercio</option>
                  <option value={5}>Banco</option>
                  <option value={6}>Seguros</option>
                </select>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() => handleCreateClient()}
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
