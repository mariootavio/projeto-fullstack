import { useEffect, useState } from "react";
import { useRentalStore } from "../../store/rentalStore";
import RentalTable from "../../components/RentalTable";
import Modal from "../../../../components/Modal/Modal";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import RentalForm from "../RentalForm/RentalForm";
import {
  PageWrapper,
  HeaderWrapper,
  TopActions,
} from "../../../../components/styles/SharedScreenStyles";
import { Rental } from "../../types/rental";

const Rentals = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingRentalId, setEditingRentalId] = useState<number | null>(null);
  const { rentals, fetchRentals, deleteRentalById } = useRentalStore();

  useEffect(() => {
    fetchRentals();
  }, []);

  const openNewRentalModal = () => {
    setEditingRentalId(null);
    setShowModal(true);
  };

  const openEditModal = (rental: Rental) => {
    setEditingRentalId(rental.id);
    setShowModal(true);
  };

  return (
    <PageWrapper>
      <HeaderWrapper>
        <h1 style={{ margin: 0 }}>Locações</h1>
        <TopActions>
          <PrimaryButton onClick={openNewRentalModal}>
            + Nova Locação
          </PrimaryButton>
        </TopActions>
      </HeaderWrapper>

      <RentalTable
        rentals={rentals}
        onEdit={openEditModal}
        onDelete={deleteRentalById}
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <RentalForm
            rentalId={editingRentalId}
            onClose={() => {
              setShowModal(false);
              fetchRentals();
            }}
          />
        </Modal>
      )}
    </PageWrapper>
  );
};

export default Rentals;
