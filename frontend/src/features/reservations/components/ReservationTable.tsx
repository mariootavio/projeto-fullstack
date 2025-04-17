// src/features/reservations/components/ReservationTable.tsx
import { useReservationStore } from "../store/reservationStore";
import { useRentalStore } from "../../rentals/store/rentalStore";
import { useEffect } from "react";
import { Pencil, Trash } from "lucide-react";
import { Table } from "../../../components/styles/SharedTableStyles";
import EditButton from "../../../components/Button/EditButton";
import DeleteButton from "../../../components/Button/DeleteButton";

interface ReservationTableProps {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ReservationTable = ({ onEdit, onDelete }: ReservationTableProps) => {
  const { reservations, fetchReservations, clients, fetchClients } =
    useReservationStore();

  const { rentals, fetchRentals } = useRentalStore();

  useEffect(() => {
    fetchReservations();
    fetchClients();
    fetchRentals();
  }, []);

  const getClientName = (id: number) =>
    clients.find((c) => c.id === id)?.name || "-";

  const getRental = (id: number) => rentals.find((r) => r.id === id);

  const getHours = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Locação</th>
          <th>Início</th>
          <th>Término</th>
          <th>Horas</th>
          <th>Preço</th>
          <th>Valor Hora</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => {
          const rental = getRental(reservation.rentalId);
          return (
            <tr key={reservation.id}>
              <td data-label="Cliente">
                {getClientName(reservation.clientId)}
              </td>
              <td data-label="Locação">{rental?.name || "-"}</td>
              <td data-label="Início">
                {new Date(reservation.startDate).toLocaleString("pt-BR")}
              </td>
              <td data-label="Término">
                {new Date(reservation.endDate).toLocaleString("pt-BR")}
              </td>
              <td data-label="Horas">
                {getHours(reservation.startDate, reservation.endDate)}
              </td>
              <td data-label="Preço">R$ {reservation.finalPrice.toFixed(2)}</td>
              <td data-label="Valor Hora">
                R$ {rental?.pricePerHour.toFixed(2) || "-"}
              </td>
              <td data-label="Status">{reservation.status}</td>
              <td data-label="Ações">
                <EditButton onClick={() => onEdit(reservation.id!)}>
                  <Pencil size={16} />
                </EditButton>
                <DeleteButton onClick={() => onDelete(reservation.id!)}>
                  <Trash size={16} />
                </DeleteButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ReservationTable;
