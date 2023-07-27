const UtTime = {

  getISOStringFromTimestamp(tm: number): string {
    const td = new Date(tm);
    return td.toISOString();
  },
  getToday() {
    const td = new Date();
    const timestamp = Math.floor(td.getTime() / 1000); // convert from milliseconds to seconds
    const today = td.toISOString().slice(0, 10).replace(/-/g, ''); // UTC timezon and date format is  "yyyyMMdd"
    return { today, timestamp };
  },
  getPastDayToday(numberOfDays: number) {
    const today = UtTime.getToday();
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - numberOfDays);
    const pastDateString = pastDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, ''); // UTC timezon and date format is  "yyyyMMdd"
    return { pastDateString, today };
  },
};
export default UtTime;