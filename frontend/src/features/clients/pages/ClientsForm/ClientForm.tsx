import { useEffect, useState } from "react";
import { useClientStore } from "../../store/clientStore";
import { FormWrapper, Form, Input, SubmitButton } from "./ClientForm.styles";

interface ClientFormProps {
  clientId: number | null;
  onClose: () => void;
}

const ClientForm = ({ clientId, onClose }: ClientFormProps) => {
  const isEditMode = !!clientId;
  const {
    selectedClient,
    fetchClientById,
    createNewClient,
    updateClientById,
    clearSelectedClient,
  } = useClientStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  });

  useEffect(() => {
    if (isEditMode && clientId) {
      fetchClientById(clientId);
    }
    return () => clearSelectedClient();
  }, [clientId]);

  useEffect(() => {
    if (selectedClient) {
      const { name, email, phone, cpf } = selectedClient;
      setForm({ name, email, phone, cpf });
    }
  }, [selectedClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && clientId) {
      await updateClientById(clientId, form);
    } else {
      await createNewClient(form);
    }

    onClose();
  };

  return (
    <FormWrapper>
      <h2>{isEditMode ? "Editar Cliente" : "Novo Cliente"}</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          name="phone"
          placeholder="Telefone"
          value={form.phone}
          onChange={handleChange}
        />
        <Input
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
        />
        <SubmitButton type="submit">
          {isEditMode ? "Salvar Alterações" : "Cadastrar Cliente"}
        </SubmitButton>
      </Form>
    </FormWrapper>
  );
};

export default ClientForm;
