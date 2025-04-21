import { useEffect, useState } from "react";
import ClientTable from "../components/ClientTable";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import {
  PageWrapper,
  HeaderWrapper,
  TopActions,
} from "../../../components/styles/SharedScreenStyles";
import ClientForm from "../components/ClientForm";
import Modal from "../../../components/Modal/Modal";
import { useClientStore } from "../store/clientStore";

const Clients = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingClientId, setEditingClientId] = useState<number | null>(null);

  const { clients, fetchClients, deleteClientById } = useClientStore();

  useEffect(() => {
    fetchClients();
  }, []);

  const openNewClientModal = () => {
    setEditingClientId(null);
    setShowModal(true);
  };

  const openEditModal = (client: any) => {
    setEditingClientId(client.id);
    setShowModal(true);
  };

  return (
    <PageWrapper>
      <HeaderWrapper>
        <h1 style={{ margin: 0 }}>Clientes</h1>
        <TopActions>
          <PrimaryButton onClick={openNewClientModal}>
            + Novo Cliente
          </PrimaryButton>
        </TopActions>
      </HeaderWrapper>

      <ClientTable
        clients={clients}
        onEdit={openEditModal}
        onDelete={deleteClientById}
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ClientForm
            clientId={editingClientId}
            onClose={() => {
              setShowModal(false);
            }}
          />
        </Modal>
      )}
    </PageWrapper>
  );
};

export default Clients;
