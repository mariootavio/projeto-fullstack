import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormWrapper,
  Form,
  Input,
  Label,
  SubmitButton,
  ErrorMessage,
  FieldGroup,
  Title,
} from "../../../../components/styles/SharedFormStyles";
import { rentalSchema, RentalFormData } from "../../validation/rental.schema";
import { useRentalStore } from "../../store/rentalStore";

interface RentalFormProps {
  rentalId: number | null;
  onClose: () => void;
}

const RentalForm = ({ rentalId, onClose }: RentalFormProps) => {
  const isEditMode = !!rentalId;

  const {
    selectedRental,
    fetchRentalById,
    createNewRental,
    updateRentalById,
    clearSelectedRental,
  } = useRentalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RentalFormData>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      name: "",
      type: "",
      description: "",
      pricePerHour: 0,
      minTime: 1,
      maxTime: 1,
    },
  });

  useEffect(() => {
    if (isEditMode && rentalId) {
      fetchRentalById(rentalId);
    }
    return () => clearSelectedRental();
  }, [rentalId]);

  useEffect(() => {
    if (selectedRental) {
      reset({
        name: selectedRental.name,
        type: selectedRental.type,
        description: selectedRental.description || "",
        pricePerHour: selectedRental.pricePerHour,
        minTime: selectedRental.minTime,
        maxTime: selectedRental.maxTime,
      });
    }
  }, [selectedRental, reset]);

  const onSubmit = async (data: RentalFormData) => {
    if (isEditMode && rentalId) {
      await updateRentalById(rentalId, data);
    } else {
      await createNewRental(data);
    }

    onClose();
  };

  return (
    <FormWrapper>
      <Title>{isEditMode ? "Editar Locação" : "Nova Locação"}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Label>Nome</Label>
          <Input {...register("name")} placeholder="Ex: Sala de reunião" />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FieldGroup>

        <FieldGroup>
          <Label>Tipo</Label>
          <Input {...register("type")} placeholder="Ex: Carro, Barco, Sala" />
          {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
        </FieldGroup>

        <FieldGroup>
          <Label>Descrição (opcional)</Label>
          <Input {...register("description")} placeholder="Descreva o item" />
        </FieldGroup>

        <FieldGroup>
          <Label>Preço por hora</Label>
          <Input
            type="number"
            min={1}
            {...register("pricePerHour", { valueAsNumber: true })}
            placeholder="Ex: 100"
          />
          {errors.pricePerHour && (
            <ErrorMessage>{errors.pricePerHour.message}</ErrorMessage>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>Tempo mínimo (horas)</Label>
          <Input
            type="number"
            min={1}
            {...register("minTime", { valueAsNumber: true })}
            placeholder="Ex: 1"
          />
          {errors.minTime && (
            <ErrorMessage>{errors.minTime.message}</ErrorMessage>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>Tempo máximo (horas)</Label>
          <Input
            type="number"
            min={1}
            {...register("maxTime", { valueAsNumber: true })}
            placeholder="Ex: 8"
          />
          {errors.maxTime && (
            <ErrorMessage>{errors.maxTime.message}</ErrorMessage>
          )}
        </FieldGroup>

        <SubmitButton type="submit">
          {isEditMode ? "Salvar Alterações" : "Cadastrar Locação"}
        </SubmitButton>
      </Form>
    </FormWrapper>
  );
};

export default RentalForm;
