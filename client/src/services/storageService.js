const keyName = "token";

const saveJwtToLocal = (jwt) => localStorage.setItem(keyName, jwt);

const getJwtFromLocal = () => localStorage.getItem(keyName);

const deleteJwtFromLocal = () => localStorage.removeItem(keyName);

export { saveJwtToLocal, getJwtFromLocal, deleteJwtFromLocal };
