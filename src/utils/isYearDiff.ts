const isYearDiff = (date1: Date, date2: Date): boolean => {
    const oneYear = 1000 * 60 * 60 * 24 * 365;
    return Math.abs(date2.getTime() - date1.getTime()) > oneYear;
}

export default isYearDiff;