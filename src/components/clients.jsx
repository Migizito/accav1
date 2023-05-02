import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from "../components/Navbar";
import { Outlet } from 'react-router-dom'
import { items } from "../data/items";
import { Link } from "react-router-dom";

export const Clients = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <h1>Clients</h1>
      <div>
      {items.map((item) => (<div>
        <Link to={`/clientes/${item.id}`}>{item.name}</Link>
        </div>))}
     </div>
      <div>
      <Outlet/>
     </div>
    </div>
  )
}
