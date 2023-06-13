import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../functions";

export const Servicios = () => {
  const url = "https://api-acca.azurewebsites.net";
  const [services, setServices] = useState([]);
  const [tableServices, setTableServices] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState(null);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    handleGetServices();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tableServices.filter((service) => {
      if (
        service.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return service;
      }
    });
    setServices(resultadosBusqueda);
  };

  async function handleCreateService() {
    const data = {
      id: id,
      name: name,
      price: price,
      description: description,
    };

    const response = await fetch(
      "https://api-acca.azurewebsites.net/CreateService",
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
    handleGetServices();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "Servicio creado!",
      text: "El servicio se ha creado correctamente.",
    });
  }

  async function handleGetServices() {
    const response = await fetch(
      "https://api-acca.azurewebsites.net/GetServices"
    );
    const data = await response.json();
    setServices(data);
    setTableServices(data);
  }

  async function handleUpdateServices(id, name) {
    const data = {
      id: id,
      name: name,
      price: price,
      description: description,
    };

    try {
      const response = await fetch(
        `https://api-acca.azurewebsites.net/UpdateServiceById/${id}`,
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
        handleGetServices();

        // Mostrar alerta
        Swal.fire({
          icon: "success",
          title: "Servicio actualizado!",
          text: "El Servicio se ha actualizado correctamente.",
        });
        // Aquí puedes realizar cualquier otra acción necesaria después de la actualización exitosa
      } else {
        // Manejo de errores si la respuesta no es exitosa
        console.log("Error al actualizar el servicio");
      }
    } catch (error) {
      // Manejo de errores en caso de una excepción durante la petición
      console.log("Error en la petición: ", error);
    }
  }

  async function handleDeleteServices(service) {
    const response = await fetch(
      `https://api-acca.azurewebsites.net/DeleteServiceById/${service.id}`,
      {
        method: "DELETE",
      }
    );

    const responseData = await response.json();
    setResponse(responseData);

    // Actualizar la lista de clientes después de eliminar uno existente
    handleGetServices();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "Servicio eliminado!",
      text: "El servicio se ha eliminado correctamente.",
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

  const openModal = (op, id, name, price, description) => {
    setId("");
    setName("");
    setPrice("");
    setDescription("");
    setOperation(op);
    if (op === 1) {
      setTitle("Agregar Servicio");
    } else if (op === 2) {
      setTitle("Editar Servicio");
      setId(id);
      setName(name);
      setPrice(price);
      setDescription(description);
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
                    <th>SERVICIO</th>
                    <th>PRECIO</th>
                    <th>DESCRIPCION</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td>{service.id}</td>
                      <td>{service.name}</td>
                      <td>{service.price}</td>
                      <td>{service.description}</td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              service.id,
                              service.name,
                              service.price,
                              service.description
                            )
                          }
                          className="btn btn-warning"
                        >
                          <i
                            className="fa-solid fa-edit"
                            data-bs-toggle="modal"
                            data-bs-target="#modalConsultants"
                          ></i>
                        </button>
                        &nbsp;
                        <button
                          onClick={() => handleDeleteServices(service)}
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
      <div id="modalConsultants" className="modal fade" aria-hidden="true">
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
                  id="name"
                  className="form-control"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i class="fa-solid fa-money-bills"></i>
                </span>
                <input
                  type="text"
                  id="price"
                  className="form-control"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i class="fa-solid fa-comments"></i>
                </span>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  placeholder="Descripcion"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() =>
                    handleUpdateServices(id, name, price, description)
                  }
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
                  <i class="fa-solid fa-user"></i>
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
                <i class="fa-solid fa-money-bills"></i>
                </span>
                <input
                  type="text"
                  id="price"
                  className="form-control"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                <i class="fa-solid fa-comments"></i>
                </span>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  placeholder="Descripcion"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() => handleCreateService()}
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
