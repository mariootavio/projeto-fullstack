// src/features/rentals/components/RentalTable.tsx
import { Pencil, Trash } from "lucide-react";
import { Rental } from "../types/rental";
import { Table } from "./RentalTable.styles";
import EditButton from "../../../components/common/EditButton";
import DeleteButton from "../../../components/common/DeleteButton";
import { Formatter } from "../../../utils/formatter";

interface RentalTableProps {
  rentals: Rental[];
  onEdit: (rental: Rental) => void;
  onDelete: (id: number) => void;
}

const RentalTable = ({ rentals, onEdit, onDelete }: RentalTableProps) => {
  return (
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
            <td data-label="Tempo Mínimo">{Formatter.hours(rental.minTime)}</td>
            <td data-label="Tempo Máximo">{Formatter.hours(rental.maxTime)}</td>
            <td data-label="Data de Criação">
              {Formatter.formatDate(rental.createdAt)}
            </td>
            <td data-label="Ações">
              <EditButton onClick={() => onEdit(rental)}>
                <Pencil size={16} />
              </EditButton>
              <DeleteButton onClick={() => onDelete(rental.id)}>
                <Trash size={16} />
              </DeleteButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RentalTable;
