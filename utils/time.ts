const months = [
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
  'December'
];

export const dayInWords = (date?: Date | number | null) => {
  if (typeof date == 'string' || typeof date == 'number') {
    date = new Date(date);
  }

  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }

  const now = new Date(Date.now());
  if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth() && date.getDate() == now.getDate()) {
    return 'Today';
  }

  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  if (
    date.getFullYear() == tomorrow.getFullYear() &&
    date.getMonth() == tomorrow.getMonth() &&
    date.getDate() == tomorrow.getDate()
  ) {
    return 'Tomorrow';
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  if (
    date.getFullYear() == yesterday.getFullYear() &&
    date.getMonth() == yesterday.getMonth() &&
    date.getDate() == yesterday.getDate()
  ) {
    return 'Yesterday';
  }

  if (date.getFullYear() == now.getFullYear()) {
    return months[date.getMonth()] + ' ' + date.getDate();
  }

  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
};
