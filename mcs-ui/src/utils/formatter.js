import moment from "moment";

export const dateTimefromNow = (value) => moment(value).fromNow();

export const momentValue = (value) => moment(value);

export const disabledLaterDate = (current) =>
  current && current > moment().endOf("day");

export const restrictOneMonth = (current, from) =>
  current && current > moment(from).add(1, "M");

export const currency = (value) =>
  parseFloat(value)
    ?.toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

export const thousand = (value) =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const monthStart = () => moment().startOf("month");

export const monthCurrent = () => moment();

export const llFormat = (value) => moment(value).format("LL");

export const yearStart = () => moment().startOf("year");

export const yearEnd = () => moment().endOf("year");

export const mmDdYyyy = (value) => moment(value).format("MM/DD/YYYY");

export const yyyyMmDd = (value) => moment(value).format("YYYY-MM-DD");

export const mmDdYyyyWTimeCurrent = () =>
  moment().format("MM/DD/YYYY HH:MM:SS");

export const mmDdYyyyWTime = (value) =>
  moment(value).format("MM/DD/YYYY HH:MM:SS");

export const amPmTime = (value) => moment(value).format("MM/DD/YYYY h:mm a");

export const mmDdYyyyNoSeparator = (value) => moment(value).format("MMDDYYYY");

export const mysqlFormat = (value) =>
  moment(value).format("YYYY-MM-DD hh:mm:ss");

export const daysEllapsed = (value) =>
  parseInt(moment.duration(moment().diff(value)).asDays());

export const secondsToTime = (secs) => {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  return `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${(
    "0" + seconds
  ).slice(-2)}`;
};

export const getUnixTime = () => Math.round(new Date().getTime() / 1000);

export const addDays = (date, days) => moment(date).add(days, "days");

export const sundayCount = (fromDate, toDate) => {
  var from = new Date(fromDate);
  var to = new Date(toDate);

  var weekendDayCount = 0;

  while (from < to) {
    from.setDate(from.getDate() + 1);
    if (from.getDay() === 0) {
      ++weekendDayCount;
    }
  }

  return weekendDayCount;
};

export const capitalizeString = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const generateUniqueCode = (base) => {
  const extension = base.split(".").pop();

  var now = new Date().getTime();
  var random = Math.floor(Math.random() * 100000);
  // zero pad random
  random = "-" + random;
  while (random.length < 5) {
    random = "0" + random;
  }
  return `${now + random}.${extension}`;
};

export const compareStringsLocaleInsensitive = (str1, str2) => {
  return str1.localeCompare(str2, undefined, { sensitivity: "base" }) === 0;
};
