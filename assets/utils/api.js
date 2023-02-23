import axios from "axios";

const clothesAPI = axios.create({
  baseURL: "https://clothes-backend-8uyx.onrender.com/api",
});

export const getClothesList = () => {
  return clothesAPI.get("/clothes");
};

export const suggestedClothes = (user_id) => {
  return clothesAPI.get(`/users/${user_id}/suggested_clothes`);
};

export const getUser = (user_id) => {
  return clothesAPI.get(`/users/${user_id}`);
};

export const patchUserPreferences = (user_id, data) => {
  return clothesAPI.patch(`/users/${user_id}/preferences`, data);
};
