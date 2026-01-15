import { format } from "date-fns";

export const formatDateDDMMYYY = (date: any) =>
  date ? format(date, "dd-MM-yyyy") : "";
