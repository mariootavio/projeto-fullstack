import { toZonedTime, format } from 'date-fns-tz';

export const formatDateToBrazil = (date: Date | string) => {
  const timeZone = 'America/Sao_Paulo';
  const zoned = toZonedTime(new Date(date), timeZone);

  // Retorna como 2025-04-14T18:00:00 (sem Z no final)
  return format(zoned, "yyyy-MM-dd'T'HH:mm:ss");
};
