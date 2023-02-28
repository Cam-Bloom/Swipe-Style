import React, { useState } from 'react';
import Icon from "react-native-vector-icons/AntDesign";
import { deleteClothesFromBasket, patchClothesCount } from '../assets/utils/api';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

const EditClothesAmountButton = ({ basket, setBasket, item, setTotalAmount }) => {
  const [amount, setAmount] = useState(item?.basket_count ?? 0);
  const [itemPrice, setItemPrice] = useState(parseFloat(item?.price?.substr(1)) ?? 0);

  //errors should be handled later
  const [isRemoving, setIsRemoving] = useState(false);
  const [err, setError] = useState(null);

  const increaseAmount = () => {
    setAmount(amount + 1);

    console.log(itemPrice);

    setTotalAmount(currentTotalAmount => currentTotalAmount + itemPrice);

    patchClothesCount(item.basket_id, {clothes_count: 1})
				.then((clothesWithIncreasedCount) => {
          const currentBasket = [...basket];

					currentBasket.forEach(clothes => {
						if (clothes.basket_id === item.basket_id) {
							clothes.basket_count += 1;
						}
					});

					setBasket(currentBasket);

					console.log(basket);
					console.log("the amount of this clothes was increased by one!");
				})
				.catch((err) => {
          setAmount(amount - 1);
          setTotalAmount(currentTotalAmount => currentTotalAmount - itemPrice);

          // need to add error handling here
          console.log("clothes count wasnt been updated");
          console.log(err);
				});
  };

  const decreaseAmount = () => {
    if (item.basket_count === 1) {
      setTotalAmount(currentTotalAmount => currentTotalAmount - itemPrice);
      setIsRemoving(true);

        console.log("we are trying to remove clothes from basket");
        console.log(item.basket_id);

        deleteClothesFromBasket(item.basket_id)
            .then(() => {
                setBasket(currentBasket => currentBasket.filter(basket => basket.basket_id !== item.basket_id));
                setIsRemoving(false);
            })
            .catch((err) => {
              setTotalAmount(currentTotalAmount => currentTotalAmount + itemPrice);

              console.log(err);

              setError(err);
            })
    } else {
      setAmount(amount - 1);
      setTotalAmount(currentTotalAmount => currentTotalAmount - itemPrice);

      patchClothesCount(item.basket_id, {clothes_count: -1})
				.then((clothesWithDecreasedCount) => {
          const currentBasket = [...basket];

					currentBasket.forEach(clothes => {
						if (clothes.basket_id === item.basket_id) {
							clothes.basket_count -= 1;
						}
					});

					setBasket(currentBasket);

					console.log(basket);
					console.log("the amount of this clothes was decreased by one!");
				})
				.catch((err) => {
          setAmount(amount + 1);
          setTotalAmount(currentTotalAmount => currentTotalAmount + itemPrice);
          
          // need to add error handling here
          console.log("clothes count wasnt been updated");
          console.log(err);
				});
    }
  };

  return (
    <View style={styles.currentAmount}>
      <Icon
        name="minuscircleo"
        style={styles.decreaseAmount}
        size={36}
        onPress={() => decreaseAmount()}
      />
      <Text style={styles.basketCount}> {amount} </Text>
      <Icon
        name="pluscircleo"
        style={styles.increaseAmount}
        size={36}
        onPress={() => increaseAmount()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  currentAmount: {
    flex: 3,
      flexDirection: 'row',
  },
  basketCount: {
    color: '#606476',
    fontSize: 26,
    fontWeight: 'bold',
    },
    decreaseAmount: {
    color: "#606476",
  },
  increaseAmount: {
    color: "#606476",
  },
});

export default EditClothesAmountButton;