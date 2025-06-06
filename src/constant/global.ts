export const genders = ['Male', 'Female', 'Other'];

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];



export const genderOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));

export const designation = ['Professior', 'Associate Prof', 'Assistant Prof', 'Lecturer'];

export const designationOptions = designation.map((item) => ({
  value: item,
  label: item,
}));


const weekdays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const weekDaysOptions = weekdays.map((item) => ({
  value: item,
  label: item,
}));