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

export const patchClothesCount = (basketId, data) => {
  return clothesAPI.patch(`/baskets/${basketId}`, data);
};

export const postClothesToBasket = (userId, data) => {
  return clothesAPI.post(`/baskets/${userId}`, data);
};

export const getFavouritesByUserId = (userId) => {
  return clothesAPI.get(`/favourites/${userId}`);
}

export const deleteClothesFromFavourites = (favouriteId) => {
  return clothesAPI.delete(`/favourites/${favouriteId}`);
}

export const getUserBasket = (userId) => {
  return clothesAPI.get(`/baskets/${userId}`);
}

export const deleteClothesFromBasket = (basketId) => {
  console.log(basketId);
  return clothesAPI.delete(`/baskets/${basketId}`);
}

export const postUser = (data) => {
  return clothesAPI.post('/users', data)
}
