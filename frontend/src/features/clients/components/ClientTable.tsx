import { useNavigate } from "react-router-dom";
import { Client } from "../types/client";
import styled from "styled-components";
import axios from "axios";

interface Props {
  clients: Client[];
  onDelete: (id: number) => void; // novo
}

const TableWrapper = styled.div`
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th,
    td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }

    tr:hover {
      background-color: #f9f9f9;
    }

    button {
      margin-right: 0.5rem;
    }
  }
`;

const ClientTable = ({ clients, onDelete }: Props) => {
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este cliente?")) {
      try {
        await axios.delete(`http://localhost:3001/api/clients/${id}`);
        onDelete(id); // notifica a lista
      } catch (error) {
        alert("Erro ao deletar cliente.");
        console.error(error);
      }
    }
  };

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.cpf}</td>
              <td>
                <button onClick={() => navigate(`/clients/${client.id}/edit`)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(client.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default ClientTable;
