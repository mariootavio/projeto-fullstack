import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, ClientFormData } from "../ClientsForm/client.schema";
import {
  FormWrapper,
  Form,
  Input,
  SubmitButton,
  ErrorMessage,
} from "./ClientForm.styles";
import { useClientStore } from "../../store/clientStore";
import { Formatter } from "../../../../utils/formatter";

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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
    },
  });

  useEffect(() => {
    if (isEditMode && clientId) {
      fetchClientById(clientId);
    }
    return () => clearSelectedClient();
  }, [clientId]);

  useEffect(() => {
    if (selectedClient) {
      reset({
        name: selectedClient.name,
        email: selectedClient.email,
        phone: Formatter.formatPhone(selectedClient.phone),
        cpf: Formatter.formatCPF(selectedClient.cpf),
      });
    }
  }, [selectedClient, reset]);

  const onSubmit = async (data: ClientFormData) => {
    const cleanedData = {
      ...data,
      phone: data.phone.replace(/\D/g, ""),
      cpf: data.cpf.replace(/\D/g, ""),
    };

    if (isEditMode && clientId) {
      await updateClientById(clientId, cleanedData);
    } else {
      await createNewClient(cleanedData);
    }

    onClose();
  };

  return (
    <FormWrapper>
      <h2>{isEditMode ? "Editar Cliente" : "Novo Cliente"}</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("name" as const)} placeholder="Nome" />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

        <Input {...register("email" as const)} placeholder="Email" />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          {...register("phone" as const)}
          placeholder="Telefone"
          value={Formatter.formatPhone(watch("phone") || "")}
          onChange={(e) => setValue("phone", e.target.value)}
        />
        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

        <Input
          {...register("cpf" as const)}
          placeholder="CPF"
          value={Formatter.formatCPF(watch("cpf") || "")}
          onChange={(e) => setValue("cpf", e.target.value)}
        />
        {errors.cpf && <ErrorMessage>{errors.cpf.message}</ErrorMessage>}

        <SubmitButton type="submit">
          {isEditMode ? "Salvar Alterações" : "Cadastrar Cliente"}
        </SubmitButton>
      </Form>
    </FormWrapper>
  );
};

export default ClientForm;
