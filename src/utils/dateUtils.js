import { intervalToDuration } from "date-fns";

export const calculateAge = (date) => {
  if (date) {
    return intervalToDuration({
      start: new Date(date),
      end: new Date(),
    }).years;
  }
};
