const checkLineLength = function(string, maxLength) {
  return (string.length <= maxLength);
};
checkLineLength('проверяемая строка', 10);
const checkIfPalindrom = function (string) {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let emptyString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    emptyString += newString[i];
  }
  return (newString === emptyString);
};
checkIfPalindrom('топот');

