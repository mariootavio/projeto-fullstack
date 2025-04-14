import { z } from 'zod'

export const createReservationSchema = z.object({
  clientId: z.coerce.number({
    required_error: 'Cliente é obrigatório',
    invalid_type_error: 'Cliente deve ser um número',
  }),
  rentalId: z.coerce.number({
    required_error: 'Locação é obrigatória',
    invalid_type_error: 'Locação deve ser um número',
  }),
  startDate: z.string({ required_error: 'Data de início é obrigatória' })
    .refine(val => !isNaN(Date.parse(val)), {
      message: 'Data de início inválida',
    })
    .transform(val => new Date(val)),

  endDate: z.string({ required_error: 'Data de fim é obrigatória' })
    .refine(val => !isNaN(Date.parse(val)), {
      message: 'Data de fim inválida',
    })
    .transform(val => new Date(val)),

  finalPrice: z.coerce.number({
    required_error: 'Preço final é obrigatório',
    invalid_type_error: 'Preço deve ser um número',
  }),
  status: z.string().min(1, 'Status é obrigatório'),
});
