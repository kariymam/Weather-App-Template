import { DateTime } from "luxon";

const formatDate = (string) => {
  return DateTime.fromISO(string).toFormat('LLL dd');
};

const getTime = (string) => {
  const date = new Date(string);
  return date.toLocaleString(DateTime.DATE_SHORT);
};

const cardColor = (num) => {
    const colorMap = [
      {
        range: [0, 10],
        color: "bg-(--color-link-water-500)",
        text: "text-(--color-link-water-50)",
      },
      {
        range: [10, 20],
        color: "bg-(--color-link-water-300)",
        text: "text-(--color-link-water-950)",
      },
      {
        range: [20, 30],
        color: "bg-(--color-link-water-200)",
        text: "text-(--color-link-water-950)",
      },
      {
        range: [30, 40],
        color: "bg-(--color-link-water-100)",
        text: "text-(--color-link-water-950)",
      },
      {
        range: [40, 50],
        color: "bg-(--color-link-water-50)",
        text: "text-(--color-link-water-950)",
      },
      {
        range: [50, 60],
        color: "bg-(--color-light-apricot-50)",
        text: "text-(--color-light-apricot-950)",
      },
      {
        range: [60, 70],
        color: "bg-(--color-light-apricot-100)",
        text: "text-(--color-light-apricot-950)",
      },
      {
        range: [70, 80],
        color: "bg-(--color-light-apricot-200)",
        text: "text-(--color-light-apricot-950)",
      },
      {
        range: [80, 90],
        color: "bg-(--color-light-apricot-300)",
        text: "text-(--color-light-apricot-950)",
      },
      {
        range: [90, 100],
        color: "bg-(--color-light-apricot-500)",
        text: "text-(--color-light-apricot-50)",
      },
    ];

    for (const { range, color, text } of colorMap) {
      if (num >= range[0] && num < range[1]) {
        return [color, text];
      }
    }

    return "bg-stone-50"; // Default color
  };

export { formatDate, getTime, cardColor };
