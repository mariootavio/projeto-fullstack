import { Pencil, Trash } from "lucide-react";

import { Client } from "../types/client";
import { Table } from "./ClientTable.styles";
import EditButton from "../../../components/common/EditButton";
import DeleteButton from "../../../components/common/DeleteButton";

interface ClientTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: number) => void;
}

const ClientTable = ({ clients, onEdit, onDelete }: ClientTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>CPF</th>
          <th>Data de Criação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td data-label="Nome">{client.name}</td>
            <td data-label="Email">{client.email}</td>
            <td data-label="Telefone">{client.phone}</td>
            <td data-label="CPF">{client.cpf}</td>
            <td data-label="Data de Criação">{client.createdAt}</td>
            <td data-label="Ações">
              <EditButton onClick={() => onEdit(client)}>
                <Pencil size={16} />
              </EditButton>
              <DeleteButton onClick={() => onDelete(client.id)}>
                <Trash size={16} />
              </DeleteButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClientTable;
