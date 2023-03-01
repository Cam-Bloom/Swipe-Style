import React, { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { deleteClothesFromBasket, patchClothesCount } from "../utils/api";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../utils/variables";

const EditClothesAmountButton = ({
  basket,
  setBasket,
  item,
  setTotalAmount,
}) => {
  const [amount, setAmount] = useState(item?.basket_count ?? 0);
  const [itemPrice, setItemPrice] = useState(
    parseFloat(item?.price?.substr(1)) ?? 0
  );

  //errors should be handled later
  const [isRemoving, setIsRemoving] = useState(false);
  const [err, setError] = useState(null);

  const increaseAmount = () => {
    setAmount(amount + 1);

    setTotalAmount((currentTotalAmount) => currentTotalAmount + itemPrice);

    patchClothesCount(item.basket_id, { clothes_count: 1 })
      .then((clothesWithIncreasedCount) => {
        const currentBasket = [...basket];

        currentBasket.forEach((clothes) => {
          if (clothes.basket_id === item.basket_id) {
            clothes.basket_count += 1;
          }
        });

        setBasket(currentBasket);
      })
      .catch((err) => {
        setAmount(amount - 1);
        setTotalAmount((currentTotalAmount) => currentTotalAmount - itemPrice);

        // need to add error handling here
        console.log("clothes count hasn't been updated");
        console.log(err);
      });
  };

  const decreaseAmount = () => {
    if (item.basket_count === 1) {
      setTotalAmount((currentTotalAmount) => currentTotalAmount - itemPrice);
      setIsRemoving(true);

      deleteClothesFromBasket(item.basket_id)
        .then(() => {
          setBasket((currentBasket) =>
            currentBasket.filter(
              (basket) => basket.basket_id !== item.basket_id
            )
          );
          setIsRemoving(false);
        })
        .catch((err) => {
          setTotalAmount(
            (currentTotalAmount) => currentTotalAmount + itemPrice
          );

          // need to add error handling here
          console.log(err);
          setError(err);
        });
    } else {
      setAmount(amount - 1);
      setTotalAmount((currentTotalAmount) => currentTotalAmount - itemPrice);

      patchClothesCount(item.basket_id, { clothes_count: -1 })
        .then((clothesWithDecreasedCount) => {
          const currentBasket = [...basket];

          currentBasket.forEach((clothes) => {
            if (clothes.basket_id === item.basket_id) {
              clothes.basket_count -= 1;
            }
          });

          setBasket(currentBasket);
        })
        .catch((err) => {
          setAmount(amount + 1);
          setTotalAmount(
            (currentTotalAmount) => currentTotalAmount + itemPrice
          );

          // need to add error handling here
          console.log("clothes count hasn't been updated");
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.currentAmount}>
      <Icon
        name="minuscircle"
        color={colors.grey}
        size={26}
        onPress={() => decreaseAmount()}
      />
      <Text style={styles.basketCount}> {amount} </Text>
      <Icon
        name="pluscircle"
        color={colors.grey}
        size={26}
        onPress={() => increaseAmount()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  currentAmount: {
    flex: 3,
    flexDirection: "row",
  },
  basketCount: {
    color: colors.darkgrey,
    fontSize: 18,
    marginRight: 3,
    marginLeft: 3,
    fontWeight: "bold",
  },
});

export default EditClothesAmountButton;
