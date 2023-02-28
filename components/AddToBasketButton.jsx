import React, { useState, useContext } from "react";
import { patchClothesCount, postClothesToBasket } from "../utils/api";
import { UserContext } from "../contexts/userContext";
import { IconButton } from "@react-native-material/core";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../utils/variables.js";

const AddToBasketButton = ({ basket, setBasket, clothes }) => {
  const [count, setCount] = useState(0);
  const { user } = useContext(UserContext);

  const addNewClothesToBasket = () => {
    const currentBasket = [...basket];
    console.log(basket);
    console.log(clothes);
    const existingClothes = currentBasket?.filter(
      (x) => x.clothes_id === clothes.clothes_id
    );
    console.log(existingClothes);
    setCount(count + 1);

    if (existingClothes.length > 0) {
      patchClothesCount(existingClothes[0].basket_id, { clothes_count: 1 })
        .then((clothesWithIncreasedCount) => {
          currentBasket.forEach((item) => {
            if (existingClothes[0].basket_id === item.basket_id) {
              item.basket_count += 1;
            }
          });

          setBasket(currentBasket);
        })
        .catch((err) => {
          setCount(count - 1);

          // need to add error handling here
          console.log("clothes count hasn't been updated");
          console.log(err);
        });
    } else {
      console.log("test");
      postClothesToBasket(user, { clothes_id: clothes.clothes_id })
        .then((clothesAddedToBasket) => {
          const { clothesBasket } = clothesAddedToBasket.data;

          const newClothesAddedToBasket = {
            basket_id: clothesBasket.basket_id,
            basket_count: clothesBasket.basket_count,
            clothes_id: clothesBasket.clothes_id,
            uid: clothesBasket.uid,
            title: clothes.title,
            item_img_url: clothes.item_img_url,
            price: clothes.price,
          };

          setBasket((currentBasket) => [newClothesAddedToBasket, ...basket]);
          setCount(count + 1);
        })
        .catch((err) => {
          setCount(count - 1);
          // need to add error handling here
          console.log("clothes hasn't been added to basket");
          console.log(err);
        });
    }
  };

  return (
    <IconButton
      icon={(props) => (
        <Icon name="shopping-basket" color={colors.white} size={26} />
      )}
      marginRight={10}
      backgroundColor={colors.green}
      onPress={() => addNewClothesToBasket()}
    />
  );
};

export default AddToBasketButton;
