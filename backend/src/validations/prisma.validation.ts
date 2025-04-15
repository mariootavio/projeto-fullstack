import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function handlePrismaError(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) {
    const { code, meta } = error;

    switch (code) {
      case "P2002": {
        const field = Array.isArray(meta?.target)
          ? meta?.target[0]
          : (meta?.target as string)?.split("_")[1] || "campo";

        return {
          status: 400,
          error: "Erro de validação",
          fields: {
            [field]: [`Já existe um registro com o mesmo ${field}`],
          },
        };
      }

      case "P2003": {
        const field = String(meta?.field_name || "relacionamento");

        return {
          status: 409,
          error: "Erro de integridade referencial",
          fields: {
            [field]: [
              "Não é possível remover este registro pois está sendo referenciado por outro.",
            ],
          },
        };
      }

      case "P2025": {
        return {
          status: 404,
          error: "Registro não encontrado",
          fields: {},
        };
      }
    }
  }

  return {
    status: 500,
    error: "Erro interno no servidor",
    fields: {},
  };
}
