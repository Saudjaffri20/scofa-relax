const token = "token";

export const getAuthHeader = () => {
  return {
    Authorization: localStorage.getItem(token),
  };
};

export const getAccessToken = () => localStorage.getItem(token);

export const removeAccessToken = () => localStorage.removeItem(token);

export const setAccessToken = (tokenValue) => {
  localStorage.setItem(token, tokenValue);
};
