export const useLocalStorage = (key, value) => {
  const storedValue = localStorage.getItem(key);
  const initialValue = storedValue !== null ? JSON.parse(storedValue) : value;
  let currentValue = initialValue;

  const setState = (newValue) => {
    if (newValue !== currentValue) {
      currentValue = newValue;
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  const getState = () => currentValue;

  return [getState, setState];
};
