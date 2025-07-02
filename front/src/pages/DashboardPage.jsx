import { useEffect, useState } from "react";
import LogoRT from "../images/LogoRT.png"; // Ajusta la ruta según tu estructura
import "../styles/Dashboard.css";

export default function DashboardPage() {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchLeads = async () => {
      try {
        const res = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/contacts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error al cargar leads");

        const data = await res.json();
        setLeads(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-top">
          <img src={LogoRT} alt="Riviera Travel Logo" className="sidebar-logo" />
          {/* <h1 className="sidebar-appname">Riviera Travel</h1> */}
          <h2 className="sidebar-title">Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="sidebar-link active">Solicitudes</button>
        </nav>
      </aside>

      <main className="main-content">
        <h2 className="dashboard-title">Solicitudes de Contacto</h2>
        {error && <p className="error">{error}</p>}

        {leads.length > 0 ? (
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Correo</th>
                  <th>Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id}>
                    <td>{lead.nombreCompleto}</td>
                    <td>{lead.correo}</td>
                    <td>{lead.mensaje}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hay leads disponibles.</p>
        )}
      </main>
    </div>
  );
}
