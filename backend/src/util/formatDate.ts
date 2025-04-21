import { toZonedTime, format } from "date-fns-tz";

export const formatDateToBrazil = (date: Date | string) => {
  const timeZone = "America/Sao_Paulo";
  const zoned = toZonedTime(new Date(date), timeZone);

  return format(zoned, "yyyy-MM-dd'T'HH:mm:ss");
};
