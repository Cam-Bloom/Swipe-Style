import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Pressable, Text, ToastAndroid } from "react-native";
import { postClothesToBasket, deleteClothesFromBasket } from "../utils/api";
import { UserContext } from "../contexts/userContext";
import { IconButton } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Fontisto";
import { colors } from "../utils/variables";

const AddToBasketButton = ({ basket, setBasket, clothes }) => {
  const currentBasket = [...basket];
  const existingClothes = currentBasket?.filter(
    (x) => x.clothes_id === clothes.clothes_id
  );

  const [isAddedToBasket, setIsAddedToBasket] = useState(
    existingClothes?.length > 0 ? true : false
  );
  const [existingClothesInBasket, setExistingClothesInBasket] = useState(
    existingClothes[0]
  );

  const { user } = useContext(UserContext);

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  useEffect(() => {
    const currentUpdatedBasket = [...basket];
    const existingCurrentClothes = currentUpdatedBasket.filter(
      (x) => x.clothes_id === clothes.clothes_id
    );

    setExistingClothesInBasket(existingCurrentClothes);

    if (existingCurrentClothes[0]) {
      setIsAddedToBasket(true);
    } else {
      setIsAddedToBasket(false);
    }
  }, [basket]);

  const addNewClothesToBasket = () => {
    setIsAddedToBasket(true);

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

        setBasket([newClothesAddedToBasket, ...basket]);
        showToast("Added to basket!");
      })
      .catch((err) => {
        setIsAddedToBasket(false);

        // need to add error handling here
        console.log("clothes hasn't been added to basket");
        console.log(err);
      });
  };

  const removeClothesFromBasket = () => {
    deleteClothesFromBasket(existingClothesInBasket[0].basket_id)
      .then(() => {
        setIsAddedToBasket(false);
        setBasket((currentBasket) =>
          currentBasket.filter(
            (basket) =>
              basket.basket_id !== existingClothesInBasket[0].basket_id
          )
        );
        showToast("Removed from basket!");
        // setIsRemoving(false);
      })
      .catch((err) => {
        // need to add error handling here
        console.log(err);
        // setError(err);
      });
  };

  return (
    <View style={styles.adderToBasket}>
      {!isAddedToBasket ? (
        <IconButton
          icon={(props) => (
            <Icon name="shopping-basket-add" size={26} color={colors.white} />
          )}
          size={30}
          backgroundColor={colors.green}
          onPress={() => addNewClothesToBasket()}
        />
      ) : (
        <IconButton
          icon={(props) => (
            <Icon
              name="shopping-basket-remove"
              size={26}
              color={colors.white}
            />
          )}
          size={30}
          backgroundColor={colors.red}
          onPress={() => removeClothesFromBasket()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  adderToBasket: {
    marginRight: 20,
  },
});

export default AddToBasketButton;
