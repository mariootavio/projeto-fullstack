import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Client } from "../types/client";
import { Table } from "../../../components/styles/SharedTableStyles";
import EditButton from "../../../components/Button/EditButton";
import DeleteButton from "../../../components/Button/DeleteButton";
import { Formatter } from "../../../utils/formatter";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";

interface ClientTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: number) => void;
}

const ClientTable = ({ clients, onEdit, onDelete }: ClientTableProps) => {
  const [clientIdToDelete, setClientIdToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setClientIdToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (clientIdToDelete !== null) {
      onDelete(clientIdToDelete);
      setClientIdToDelete(null);
    }
  };

  return (
    <>
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
              <td data-label="Telefone">
                {Formatter.formatPhone(client.phone)}
              </td>
              <td data-label="CPF">{Formatter.formatCPF(client.cpf)}</td>
              <td data-label="Data de Criação">
                {Formatter.formatDate(client.createdAt)}
              </td>
              <td data-label="Ações">
                <EditButton onClick={() => onEdit(client)}>
                  <Pencil size={16} />
                </EditButton>
                <DeleteButton onClick={() => handleDeleteClick(client.id)}>
                  <Trash size={16} />
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {clientIdToDelete !== null && (
        <DeleteConfirmationModal
          title="Excluir cliente"
          description="Tem certeza que deseja excluir este cliente?"
          onCancel={() => setClientIdToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default ClientTable;
