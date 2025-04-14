import { z } from 'zod';

export const createRentalSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.string().min(1, 'Tipo é obrigatório'),
  description: z.string().optional(),
  pricePerHour: z.coerce.number({
    required_error: 'Preço por hora é obrigatório',
    invalid_type_error: 'Preço por hora deve ser um número',
  }),
  minTime: z.coerce.number({
    required_error: 'Tempo mínimo é obrigatório',
    invalid_type_error: 'Deve ser um número',
  }),
  maxTime: z.coerce.number({
    required_error: 'Tempo máximo é obrigatório',
    invalid_type_error: 'Deve ser um número',
  }),
});
