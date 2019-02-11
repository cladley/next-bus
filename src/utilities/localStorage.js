export const getLocalStorageValuesByKey = key => {
  let valuesString = localStorage.getItem(key);

  if (!valuesString) return null;

  try {
    const values = JSON.parse(valuesString);
    return values;
  } catch (error) {
    throw error;
  }
};
