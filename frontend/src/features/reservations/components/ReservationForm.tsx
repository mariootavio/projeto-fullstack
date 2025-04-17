import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReservationStore } from "../store/reservationStore";
import { useRentalStore } from "../../rentals/store/rentalStore";
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

interface ReservationFormProps {
  reservationId: number | null;
  onSubmitSuccess: () => void;
}

const truncateToMinutes = (date: Date) => {
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const formatDateTimeLocalInput = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const ReservationForm = ({
  reservationId,
  onSubmitSuccess,
}: ReservationFormProps) => {
  const { clients, createNewReservation, updateReservationById } =
    useReservationStore();

  const { availableRentals } = useRentalStore();

  const [finalPrice, setFinalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const rentalId = watch("rentalId");

  const isEditMode = !!reservationId;

  useClientsLoader();
  useLoadReservationForm(reservationId, setValue, setFinalPrice);
  useAvailableRentalsOnDateChange(startDate, endDate, isEditMode);
  useFinalPriceCalculator(rentalId, startDate, endDate, setFinalPrice);

  const onSubmit = (data: ReservationFormData) => {
    const payload = {
      ...data,
      finalPrice,
    };

    const action = reservationId
      ? updateReservationById(reservationId, payload)
      : createNewReservation(payload);

    action.then(onSubmitSuccess);
  };

  const now = truncateToMinutes(new Date());
  const minDateTime = formatDateTimeLocalInput(now);

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
          <Label>Data de Início</Label>
          <Input
            type="datetime-local"
            min={minDateTime}
            {...register("startDate")}
          />
          {errors.startDate && (
            <ErrorMessage>{errors.startDate.message}</ErrorMessage>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>Data de Término</Label>
          <Input
            type="datetime-local"
            min={minDateTime}
            {...register("endDate")}
          />
          {errors.endDate && (
            <ErrorMessage>{errors.endDate.message}</ErrorMessage>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>Locação Disponível</Label>
          <Select {...register("rentalId")}>
            <option value="">Selecione</option>
            {availableRentals.map((rental) => (
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
            <option value="PENDING">Pendente</option>
            <option value="CONFIRMED">Confirmada</option>
            <option value="CANCELLED">Cancelada</option>
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
