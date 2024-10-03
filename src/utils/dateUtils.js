import { intervalToDuration } from "date-fns";

export const calculateAge = (date) => {
  if (date) {
    return intervalToDuration({
      start: date,
      end: new Date(),
    }).years;
  }
};
