export const semesterOptions = [
  { value: '01', label: 'Autumn' },
  { value: '02', label: 'Summer' }, // Fixed typo from "summar" to "Summer"
  { value: '03', label: 'Fall' }
];

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const monthOptions = monthNames.map((month, index) => ({
  value: String(index + 1), // "1" to "12"
  label: month
}));