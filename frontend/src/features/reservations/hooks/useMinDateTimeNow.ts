import { useEffect, useState } from "react";

export const useMinDateTimeNow = () => {
  const [minDateTime, setMinDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setMinDateTime(now.toISOString().slice(0, 16));
  }, []);

  return minDateTime;
};
