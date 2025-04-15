import { z } from "zod";

export const createClientSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
      invalid_type_error: "Nome deve ser uma string",
    })
    .min(1, "Nome é obrigatório"),

  email: z
    .string({
      required_error: "E-mail é obrigatório",
      invalid_type_error: "E-mail deve ser uma string",
    })
    .email("E-mail inválido"),

  phone: z
    .string({
      required_error: "Telefone é obrigatório",
      invalid_type_error: "Telefone deve ser uma string",
    })
    .min(1, "Telefone é obrigatório"),

  cpf: z
    .string({
      required_error: "CPF é obrigatório",
      invalid_type_error: "CPF deve ser uma string",
    })
    .regex(/^\d{11}$/, "CPF deve conter exatamente 11 números"),
});

export const updateClientSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nome deve ser uma string",
    })
    .min(1, "Nome é obrigatório")
    .optional(),

  email: z
    .string({
      invalid_type_error: "E-mail deve ser uma string",
    })
    .email("E-mail inválido")
    .optional(),

  phone: z
    .string({
      invalid_type_error: "Telefone deve ser uma string",
    })
    .min(1, "Telefone é obrigatório")
    .optional(),

  cpf: z
    .string({
      invalid_type_error: "CPF deve ser uma string",
    })
    .regex(/^\d{11}$/, "CPF deve conter exatamente 11 números")
    .optional(),
});
