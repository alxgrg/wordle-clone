// Get start date
const startDate = new Date(2023, 0, 7);
export const getStartDate = () => startDate;

// Get current date
const currentDate = new Date();

// Get difference between dates
export const difference = currentDate.getTime() - startDate.getTime();

// Get days since start date and subtract 1 for index
export const daysSinceStart = Math.ceil(difference / (1000 * 3600 * 24)) - 1;

console.log('days: ', daysSinceStart);
