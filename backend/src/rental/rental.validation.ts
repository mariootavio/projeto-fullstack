import { z } from "zod";

export const createRentalSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.string().min(1, "Tipo é obrigatório"),
  description: z.string().optional(),

  pricePerHour: z.coerce
    .number({
      required_error: "Preço por hora é obrigatório",
      invalid_type_error: "Preço por hora deve ser um número",
    })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Preço por hora deve ser maior que 0",
    }),

  minTime: z.coerce
    .number({
      required_error: "Tempo mínimo é obrigatório",
      invalid_type_error: "Deve ser um número",
    })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Tempo mínimo deve ser maior que 0",
    }),

  maxTime: z.coerce
    .number({
      required_error: "Tempo máximo é obrigatório",
      invalid_type_error: "Deve ser um número",
    })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Tempo máximo deve ser maior que 0",
    }),
});

export const updateRentalSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nome deve ser uma string",
    })
    .min(1, "Nome é obrigatório")
    .optional(),

  type: z
    .string({
      invalid_type_error: "Tipo deve ser uma string",
    })
    .min(1, "Tipo é obrigatório")
    .optional(),

  description: z.string().optional(),

  pricePerHour: z.coerce
    .number({
      invalid_type_error: "Preço por hora deve ser um número",
    })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Preço por hora deve ser maior que 0",
    })
    .optional(),

  minTime: z.coerce
    .number({
      invalid_type_error: "Tempo mínimo deve ser um número",
    })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Tempo mínimo deve ser maior que 0",
    })
    .optional(),

  maxTime: z.coerce
    .number({
      invalid_type_error: "Tempo máximo deve ser um número",
    })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Tempo máximo deve ser maior que 0",
    })
    .optional(),
});
