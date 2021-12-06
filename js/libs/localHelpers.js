export const saveToLocalStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = function (keyNameToGetFromLocalStorage) {
  if (localStorage.getItem(keyNameToGetFromLocalStorage) !== null) {
    return JSON.parse(localStorage.getItem(keyNameToGetFromLocalStorage));
  } else {
    return [];
  }
};

export const getUser = function (userKey) {
  return JSON.parse(localStorage.getItem(userKey));
};
