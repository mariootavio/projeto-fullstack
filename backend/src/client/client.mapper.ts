import { ClientEntity, ClientResponseDTO } from './client.types';
import { formatDateToBrazil } from '../util/formatDate';

export const toClientResponseDTO = (client: ClientEntity): ClientResponseDTO => ({
  id: client.id,
  name: client.name,
  email: client.email,
  phone: client.phone,
  cpf: client.cpf,
  createdAt: formatDateToBrazil(client.createdAt),
});
