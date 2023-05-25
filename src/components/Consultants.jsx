import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../functions";

export const Consultants = () => {

    const url = "https://api-acca.azurewebsites.net";
    const [consultants, setConsultants] = useState([]);
    const [tableConsultants, setTableConsultants] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [response, setResponse] = useState(null);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState("");
    const [busqueda, setBusqueda]= useState("");

    useEffect(() => {
      handleGetConsultants();
    }, []);
  
    const handleChange=(e)=>{
      setBusqueda(e.target.value);
      filtrar(e.target.value);
    }

    const filtrar=(terminoBusqueda)=>{
      var resultadosBusqueda=tableConsultants.filter((consultant)=>{
        if(consultant.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ){
          return consultant;
        }
      });
      setConsultants(resultadosBusqueda);
    }

    async function handleCreateConsultant() {
      const data = {
        id: id,
        name: name,
      };
  
      const response = await fetch(
        "https://api-acca.azurewebsites.net/CreateConsultant",
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
      handleGetConsultants();
  
      // Mostrar alerta
      Swal.fire({
        icon: "success",
        title: "¡Consultor creado!",
        text: "El consultor se ha creado correctamente.",
      });
    }
  
    async function handleGetConsultants() {
      const response = await fetch(
        "https://api-acca.azurewebsites.net/GetConsultants"
      );
      const data = await response.json();
      setConsultants(data);
      setTableConsultants(data);
    }
  
    async function handleUpdateConsultants(consultant) {
      const data = {
        id: consultant.id,
        name: consultant.name,
      };
  
      const response = await fetch(
        `https://api-acca.azurewebsites.net/UpdateConsultant/${consultant.id}`,
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
      handleGetConsultants();
  
      // Mostrar alerta
      Swal.fire({
        icon: "success",
        title: "¡Consultor actualizado!",
        text: "El consultor se ha actualizado correctamente.",
      });
    }
  
    async function handleDeleteConsultants(consultant) {
      const response = await fetch(
        `https://api-acca.azurewebsites.net/DeleteConsultantById/${consultant.id}`,
        {
          method: "DELETE",
        }
      );
  
      const responseData = await response.json();
      setResponse(responseData);
  
      // Actualizar la lista de clientes después de eliminar uno existente
      handleGetConsultants();
  
      // Mostrar alerta
      Swal.fire({
        icon: "success",
        title: "¡Consultor eliminado!",
        text: "El consultor se ha eliminado correctamente.",
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
      setName("");
      setOperation(op);
      if (op === 1) {
        setTitle("Agregar Consultor");
      } else if (op === 2) {
        setTitle("Editar Consultor");
        setId(id);
        setName(name);
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
                    <th>CONSULTOR</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {consultants.map((consultant) => (
                    <tr key={consultant.id}>
                      <td>{consultant.id}</td>
                      <td>{consultant.name}</td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              consultant.id,
                              consultant.name,
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
                          onClick={() => handleDeleteConsultants(consultant)}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() => handleCreateConsultant()}
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

