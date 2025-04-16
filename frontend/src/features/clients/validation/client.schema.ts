import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(8, "Telefone é obrigatório"),
  cpf: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 11, {
      message: "CPF deve conter exatamente 11 dígitos",
    }),
});

export type ClientFormData = z.infer<typeof clientSchema>;
