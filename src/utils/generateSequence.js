export const generateSequence = (length) => {
  const numbers = [];
  for (let i = 0; i < length; i++) {
    numbers.push(Math.floor(Math.random() * 10));
  }
  return numbers;
};