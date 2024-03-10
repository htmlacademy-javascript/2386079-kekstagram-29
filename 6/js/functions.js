const checkStringLength = (string, maxLength) => string.length <= maxLength;
const checkPalindrom = (string) => {
  const formattedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += formattedString[i];
  }
  return (formattedString === reversedString);
};
checkStringLength('проверяемая строка', 10);
checkPalindrom('hello');

