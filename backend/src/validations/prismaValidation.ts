import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handlePrismaError(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) {

    if (error.code === 'P2002') {
      const field = Array.isArray(error.meta?.target)
        ? error.meta?.target[0]
        : (error.meta?.target as string)?.split('_')[1] || 'campo'

      return {
        status: 400,
        error: 'Erro de validação',
        fields: {
          [field]: [`Já existe um registro com o mesmo ${field}`],
        },
      }
    }

    if (error.code === 'P2025') {
      return {
        status: 404,
        error: 'Registro não encontrado',
        fields: {},
      };
    }

  }

  return {
    status: 500,
    error: 'Erro interno no servidor',
    fields: {},
  }
}
