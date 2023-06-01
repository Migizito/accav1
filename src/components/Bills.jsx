import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../functions";

export const Bills = () => {
  const url = "https://api-acca.azurewebsites.net";
    const [bills, setBills] = useState([]);
    const [id, setId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
    const [issueDate, setIssueDate] = useState("");
    const [code, setCode] = useState("");
    const [note, setNote] = useState("");
    const [total, setTotal] = useState("");
    const [clientName, setClientName] = useState("");
    const [response, setResponse] = useState(null);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState("");
  
    useEffect(() => {
      handleGetBills();
      handleGetClients();
    }, []);
  
    async function handleCreateBill() {
      const data = {
        id: id,
        issueDate: issueDate,
        code: code,
        note: note,
        total: total,
        clientName: clientName,
      };
  
      const response = await fetch(
        "https://api-acca.azurewebsites.net/CreateBill",
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
      handleGetBills();
  
      // Mostrar alerta
      Swal.fire({
        icon: "success",
        title: "¡Factura creada!",
        text: "La Factura se ha creado correctamente.",
      });
    }
  
    async function handleGetClients() {
      const response = await fetch(
        "https://api-acca.azurewebsites.net/GetClients"
      );
      const data = await response.json();
      setClients(data);
    }

    async function handleGetBills() {
      const response = await fetch(
        "https://api-acca.azurewebsites.net/GetBills"
      );
      const data = await response.json();
      setBills(data);
    }
  
    async function handleDeleteBill(bill) {
      const response = await fetch(
        `https://api-acca.azurewebsites.net/DeleteBillById/${bill.id}`,
        {
          method: "DELETE",
        }
      );
  
      const responseData = await response.json();
      setResponse(responseData);
  
      // Actualizar la lista de clientes después de eliminar uno existente
      handleGetBills();
  
      // Mostrar alerta
      Swal.fire({
        icon: "success",
        title: "Factura eliminada!",
        text: "La Factura se ha eliminado correctamente.",
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
  
    const filteredOptionsClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const openModal = (op, id, issueDate, code, note, total, clientName) => {
      setId("");
      setIssueDate("");
      setCode("");
      setNote("");
      setTotal("");
      setClientName("");
      setOperation(op);
      if (op === 1) {
        setTitle("Agregar Consultor");
      } else if (op === 2) {
        setTitle("Editar Consultor");
        setId(id);
        setIssueDate(issueDate);
        setCode(code);
        setNote(note);
        setTotal(total);
        setClientName(clientName);
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
                    <th>FECHA</th>
                    <th>CÓDIGO FACTURA</th>
                    <th>GLOSA</th>
                    <th>TOTAL A PAGAR</th>
                    <th>CLIENTE</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {bills.map((bill) => (
                    <tr key={bill.id}>
                      <td>{bill.id}</td>
                      <td>{bill.issueDate}</td>
                      <td>{bill.code}</td>
                      <td>{bill.note}</td>
                      <td>{bill.total}</td>
                      <td>{bill.clientName}</td>
                      <td>
                        
                        &nbsp;
                        <button
                          onClick={() => handleDeleteBill(bill)}
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
                  placeholder="Fecha de Emisión"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="code"
                  className="form-control"
                  placeholder="Código"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="note"
                  className="form-control"
                  placeholder="Nota"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="total"
                  className="form-control"
                  placeholder="Total"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                ></input>
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
              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() => handleCreateBill()}
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
