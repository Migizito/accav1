import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../functions";
import { useParams } from "react-router-dom";

export const Activities = () => {
  const url = "https://api-acca.azurewebsites.net";
  const [activities, setActivities] = useState([]);
  const [tableActivities, setTableActivities] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [response, setResponse] = useState(null);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const {activity} = useParams();

  useEffect(() => {
    handleGetActivitiesByReport();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tableActivities.filter((activity) => {
      if (
        activity.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return activity;
      }
    });
    setActivities(resultadosBusqueda);
  };

  async function handleGetActivitiesByReport() {
    const response = await fetch(
      `https://api-acca.azurewebsites.net/GetActivitiesByReport?reportId=${activity}`
    );
    const data = await response.json();
    setActivities(data);
    setTableActivities(data);
  }

  async function handleUpdateActivity(id, name, code, category) {
    const data = {
      id: id,
      name: name,
      code: code,
      category: category,
    };

    try {
      const response = await fetch(
        `https://api-acca.azurewebsites.net/EditActivityById/${id}`,
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
        handleGetActivitiesByReport();

        // Mostrar alerta
        Swal.fire({
          icon: "success",
          title: "Actividad actualizada!",
          text: "La actividad se ha actualizado correctamente.",
        });
        // Aquí puedes realizar cualquier otra acción necesaria después de la actualización exitosa
      } else {
        // Manejo de errores si la respuesta no es exitosa
        console.log("Error al actualizar la actividad");
      }
    } catch (error) {
      // Manejo de errores en caso de una excepción durante la petición
      console.log("Error en la petición: ", error);
    }
  }

  async function handleDeleteActivity(activity) {
    const response = await fetch(
      `https://api-acca.azurewebsites.net/DeleteActivtyById/${activity.id}`,
      {
        method: "DELETE",
      }
    );

    const responseData = await response.json();
    setResponse(responseData);

    // Actualizar la lista de clientes después de eliminar uno existente
    handleGetActivitiesByReport();

    // Mostrar alerta
    Swal.fire({
      icon: "success",
      title: "Actividad eliminada!",
      text: "La actividad se ha eliminado correctamente.",
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

  const openModal = (op, id, name, code, category) => {
    setId("");
    setName("");
    setCode("");
    setCategory("");
    setOperation(op);
    if (op === 1) {
      setTitle("Agregar Actividad");
    } else if (op === 2) {
      setTitle("Editar Actividad");
      setId(id);
      setName(name);
      setCode(code);
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
                    <th>NOMBRE</th>
                    <th>CODIGO</th>
                    <th>CATEGORIA</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.id}</td>
                      <td>{activity.name}</td>
                      <td>{activity.code}</td>
                      <td>{activity.category}</td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(2, activity.id, activity.name, activity.code, activity.category)
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
                          onClick={() => handleDeleteActivity(activity)}
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
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="code"
                  className="form-control"
                  placeholder="Codigo"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="category"
                  className="form-control"
                  placeholder="Categoria"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() => handleUpdateActivity(id, name, code, category)}
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
