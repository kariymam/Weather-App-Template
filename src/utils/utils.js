import { DateTime } from "luxon";

const formatDate = (string) => {
  return DateTime.fromISO(string).toFormat('LLL dd');
};

const getTime = (string) => {
  const date = new Date(string);
  return date.toLocaleString(DateTime.DATE_SHORT);
};

export { formatDate, getTime };
