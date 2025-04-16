import { Pencil, Trash } from "lucide-react";
import { Client } from "../types/client";
import { Table } from "../../../components/styles/SharedTableStyles";
import EditButton from "../../../components/common/EditButton";
import DeleteButton from "../../../components/common/DeleteButton";
import { Formatter } from "../../../utils/formatter";

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
            <td data-label="Telefone">{Formatter.formatPhone(client.phone)}</td>
            <td data-label="CPF">{Formatter.formatCPF(client.cpf)}</td>
            <td data-label="Data de Criação">
              {Formatter.formatDate(client.createdAt)}
            </td>
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
