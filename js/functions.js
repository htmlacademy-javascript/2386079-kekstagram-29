const checkLineLength = function(string, maxLength) {
  return (string.length <= maxLength);
};
console.log(checkLineLength('проверяемая строка', 20));
console.log(checkLineLength('проверяемая строка', 18));
console.log(checkLineLength('проверяемая строка', 10));
const checkIfPalindrom = function (string) {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let emptyString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    emptyString += newString[i];
}
  return (newString === emptyString);
};
console.log(checkIfPalindrom('топот'));
console.log(checkIfPalindrom('ДовОд'));
console.log(checkIfPalindrom('Кекс'));
