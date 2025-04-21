import { useState } from "react";
import { useReservationStore } from "../store/reservationStore";
import ReservationTable from "../components/ReservationTable";
import ReservationForm from "../components/ReservationForm";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import Modal from "../../../components/Modal/Modal";
import {
  PageWrapper,
  HeaderWrapper,
  TopActions,
} from "../../../components/styles/SharedScreenStyles";

const Reservations = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingReservationId, setEditingReservationId] = useState<
    number | null
  >(null);
  const { deleteReservationById, fetchReservations } = useReservationStore();

  const openNewReservationModal = () => {
    setEditingReservationId(null);
    setShowModal(true);
  };

  const openEditModal = (id: number) => {
    setEditingReservationId(id);
    setShowModal(true);
  };

  return (
    <PageWrapper>
      <HeaderWrapper>
        <h1 style={{ margin: 0 }}>Reservas</h1>
        <TopActions>
          <PrimaryButton onClick={openNewReservationModal}>
            + Nova Reserva
          </PrimaryButton>
        </TopActions>
      </HeaderWrapper>

      <ReservationTable
        onEdit={openEditModal}
        onDelete={deleteReservationById}
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReservationForm
            reservationId={editingReservationId}
            onSubmitSuccess={() => {
              setShowModal(false);
              fetchReservations();
            }}
          />
        </Modal>
      )}
    </PageWrapper>
  );
};

export default Reservations;
