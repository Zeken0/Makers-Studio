export const saveToLocalStorage = function (
	keyNameToSaveInLocalStorage,
	valueToSaveInLocalStorage
) {
	localStorage.setItem(
		keyNameToSaveInLocalStorage,
		JSON.stringify(valueToSaveInLocalStorage)
	);
};

export const getFromLocalStorage = function (keyNameToGetFromLocalStorage) {
	if (localStorage.getItem(keyNameToGetFromLocalStorage) !== null) {
		return JSON.parse(localStorage.getItem(keyNameToGetFromLocalStorage));
	} else {
		return [];
	}
};
