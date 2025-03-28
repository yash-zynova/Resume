//Function to generate a 6-digit code

function generateCode(digits = 6) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = generateCode;
