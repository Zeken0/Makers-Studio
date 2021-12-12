export const BASE_URL = `https://makers-studio.herokuapp.com`;

export const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
};
