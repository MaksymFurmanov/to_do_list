import isYearDiff from "./isYearDiff";

const Months: Record<number, string> = {
    1: "JAN",
    2: "FEB",
    3: "MAR",
    4: "APR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AUG",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC"
};

const getDeadlineFormatted = (due_date: Date | undefined | null): string => {
    if (!(due_date instanceof Date)) return "Set deadline";
    const today = new Date();
    if (isYearDiff(today, due_date)) return "Next year";

    const day = due_date.getDate();
    const month = Months[due_date.getMonth()];
    return `Due ${day} ${month}`;
};

export default getDeadlineFormatted;