export default class DateService {
  constructor() {}

  getCurrentDate() {
    return new Date();
  }

  getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
}

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
