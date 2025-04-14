import { z } from 'zod'

export const createClientSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  cpf: z
    .string()
    .length(11, 'CPF deve ter 11 dígitos'),
})

export const deleteClientSchema = z.object({
  id: z.coerce.number({
    required_error: 'ID é obrigatório',
   // invalid_type_error: 'ID deve ser um número',
  }),
});
