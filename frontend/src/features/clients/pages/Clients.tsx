import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllClients } from "../services/clientService";
import { Client } from "../types/client";
import ClientTable from "../components/ClientTable";

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getAllClients().then(setClients).catch(console.error);
  }, []);

  const handleDelete = (id: number) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ margin: 0 }}>Clientes</h1>
        <button
          onClick={() => navigate("/clients/new")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#6a0dad",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          + Novo Cliente
        </button>
      </div>

      <ClientTable clients={clients} onDelete={handleDelete} />
    </div>
  );
};

export default Clients;
