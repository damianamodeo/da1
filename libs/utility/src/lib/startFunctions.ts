// a function that will run every time the app starts

export const startFunctions = () => {
  const currentTime = new Date().getTime();
  localStorage.getItem('user') ||
    localStorage.setItem('user', currentTime.toString());
};

export default startFunctions;
