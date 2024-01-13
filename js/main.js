const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Архип',
  'Вениамин',
  'Джастин',
  'Прохор',
  'Людовик'
];
const PHOTOS_COUNT = 25;
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
function createRandomIdFromRange (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const createPhoto = () => {
  const createComments = () => {
    const messagesInComment = Array.from({length: getRandomInteger(1, 2)}, getRandomArrayElement(MESSAGES));
    const message = messagesInComment.join(', ');
    return {
      id: createRandomIdFromRange(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: message,
      name: getRandomArrayElement(NAMES)
    };
  };
  const comments = Array.from({length: getRandomInteger(0, 30)}, createComments);
  const generatePhotoId = createRandomIdFromRange(1, 25);
  return {
    id: generatePhotoId,
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: 'Фотография на память',
    likes: getRandomInteger(15, 200),
    comments: comments,
  };
};
const photos = Array.from({length: PHOTOS_COUNT}, (item, index) => createPhoto(index + 1));

// eslint-disable-next-line no-console
console.log(photos);
