import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Rental } from "../types/Rental";
import { Table } from "../../../components/styles/SharedTableStyles";
import EditButton from "../../../components/Button/EditButton";
import DeleteButton from "../../../components/Button/DeleteButton";
import { Formatter } from "../../../utils/formatter";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";

interface RentalTableProps {
  rentals: Rental[];
  onEdit: (rental: Rental) => void;
  onDelete: (id: number) => void;
}

const RentalTable = ({ rentals, onEdit, onDelete }: RentalTableProps) => {
  const [rentalIdToDelete, setRentalIdToDelete] = useState<number | null>(null);

  const handleConfirmDelete = () => {
    if (rentalIdToDelete !== null) {
      onDelete(rentalIdToDelete);
      setRentalIdToDelete(null);
    }
  };

  return (
    <>
      {rentals.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Preço Hora</th>
              <th>Tempo Mínimo</th>
              <th>Tempo Máximo</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td data-label="Nome">{rental.name}</td>
                <td data-label="Tipo">{rental.type}</td>
                <td data-label="Descrição">{rental.description || "-"}</td>
                <td data-label="Preço Hora">
                  {Formatter.currency(rental.pricePerHour)}
                </td>
                <td data-label="Tempo Mínimo">
                  {Formatter.hours(rental.minTime)}
                </td>
                <td data-label="Tempo Máximo">
                  {Formatter.hours(rental.maxTime)}
                </td>
                <td data-label="Data de Criação">
                  {Formatter.formatDate(rental.createdAt)}
                </td>
                <td data-label="Ações">
                  <EditButton onClick={() => onEdit(rental)}>
                    <Pencil size={16} />
                  </EditButton>
                  <DeleteButton onClick={() => setRentalIdToDelete(rental.id)}>
                    <Trash size={16} />
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#666" }}>
          Nenhuma locação cadastrada.
        </p>
      )}

      {rentalIdToDelete !== null && (
        <DeleteConfirmationModal
          title="Excluir locação"
          description="Tem certeza que deseja excluir esta locação?"
          onCancel={() => setRentalIdToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default RentalTable;
