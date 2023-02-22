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
