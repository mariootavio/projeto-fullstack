import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReservationStore } from "../store/reservationStore";
import {
  FormWrapper,
  Form,
  FieldGroup,
  Label,
  Input,
  Select,
  SubmitButton,
  ErrorMessage,
  Title,
} from "../../../components/styles/SharedFormStyles";
import { useLoadReservationForm } from "../hooks/useLoadReservationForm";
import { useClientsLoader } from "../hooks/useClientsLoader";
import { useAvailableRentalsOnDateChange } from "../hooks/useAvailableRentalsOnDateChange";
import { useFinalPriceCalculator } from "../hooks/useFinalPriceCalculator";
import {
  ReservationFormData,
  reservationSchema,
} from "../validation/reservationSchema";
import { reservationStatusOptions } from "../type/reservationStatusOptions";
import { rentalTypeOptions } from "../../rentals/types/rentalTypeOptions";
import { useResetRentalOnTypeChange } from "../hooks/useResetRentalOnTypeChange";
import { useFilterRentalsByType } from "../hooks/useFilterRentalsByType";

interface ReservationFormProps {
  reservationId: number | null;
  onSubmitSuccess: () => void;
}

const ReservationForm = ({
  reservationId,
  onSubmitSuccess,
}: ReservationFormProps) => {
  const { clients, createNewReservation, updateReservationById } =
    useReservationStore();

  const [finalPrice, setFinalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const rentalId = watch("rentalId");
  const rentalTypeKey = watch("type");

  const isEditMode = !!reservationId;

  useClientsLoader();
  useLoadReservationForm(reservationId, setValue, setFinalPrice);
  useAvailableRentalsOnDateChange(startDate, endDate, isEditMode);
  useFinalPriceCalculator(rentalId, startDate, endDate, setFinalPrice);
  useResetRentalOnTypeChange(rentalTypeKey, setValue, clearErrors);
  const filteredRentals = useFilterRentalsByType(rentalTypeKey);

  const onSubmit = (data: ReservationFormData) => {
    const payload = { ...data, finalPrice };
    const action = reservationId
      ? updateReservationById(reservationId, payload)
      : createNewReservation(payload);
    action.then(onSubmitSuccess);
  };

  return (
    <FormWrapper>
      <Title>{reservationId ? "Editar Reserva" : "Nova Reserva"}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Label>Cliente</Label>
          <Select {...register("clientId")}>
            <option value="">Selecione</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </Select>
          {errors.clientId && (
            <ErrorMessage>{errors.clientId.message}</ErrorMessage>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>Tipo de Locação</Label>
          <Select {...register("type")}>
            <option value="">Selecione</option>
            {rentalTypeOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
        </FieldGroup>

        <FieldGroup>
          <Label>Data de Início</Label>
          <Input
            type="datetime-local"
            {...register("startDate")}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
          />
          {errors.startDate && (
            <ErrorMessage>{errors.startDate.message}</ErrorMessage>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>Data de Término</Label>
          <Input
            type="datetime-local"
            {...register("endDate")}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
          />
          {errors.endDate && (
            <ErrorMessage>{errors.endDate.message}</ErrorMessage>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>Locação Disponível</Label>
          <Select {...register("rentalId")}>
            <option value="">Selecione</option>
            {filteredRentals.map((rental) => (
              <option key={rental.id} value={rental.id}>
                {rental.name} - R$ {rental.pricePerHour}/h
              </option>
            ))}
          </Select>
          {errors.rentalId && (
            <ErrorMessage>{errors.rentalId.message}</ErrorMessage>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>Status</Label>
          <Select {...register("status")}>
            <option value="">Selecione</option>
            {reservationStatusOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>

          {errors.status && (
            <ErrorMessage>{errors.status.message}</ErrorMessage>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>Valor Total</Label>
          <p>R$ {finalPrice.toFixed(2)}</p>
        </FieldGroup>

        <SubmitButton type="submit">Salvar</SubmitButton>
      </Form>
    </FormWrapper>
  );
};

export default ReservationForm;
