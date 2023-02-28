import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { patchClothesCount, postClothesToBasket} from '../assets/utils/api';

const AddToBasketButton = ({ basket, setBasket, clothes_id }) => {
	const [count, setCount] = useState(0);

	//just hardcoded userId temporarily => this should be changed later
	const [userId, setUserId] = useState("12342341")

	console.log(count);

	const addNewClothesToBasket = () => {
		const currentBasket = [...basket];

		console.log("current basket");
		console.log(currentBasket);

		const existingClothes = currentBasket.filter(x => x.clothes_id === clothes_id);

		console.log("wether current clothes have already been added to basket");
		console.log(existingClothes);

		setCount(count + 1);
		if (existingClothes.length > 0) {
			patchClothesCount(existingClothes[0].basket_id, {clothes_count: 1})
				.then((clothesWithIncreasedCount) => {
					currentBasket.forEach(item => {
						if (existingClothes[0].basket_id === item.basket_id) {
							item.basket_count += 1;
						}
					});

					setBasket(currentBasket);
					console.log(basket);
					console.log("the amount of this clothes was increased by one!");
				})
				.catch((err) => {
					setCount(count - 1);

				// need to add error handling here
				console.log("clothes count wasnt been updated");
				console.log(err);
				});
		} else {
			// this should be changed => here clothes data such as image, price, count should be returned for rendering on basket page!
			postClothesToBasket(userId, {clothes_id: clothes_id})
				.then((clothesAddedToBasket) => {
					console.log("clothes were added!");
					console.log(clothesAddedToBasket.data.clothesBasket);
					setBasket(currentBasket => [clothesAddedToBasket.data.clothesBasket, ...basket]);
					setCount(count + 1);
			})
			.catch((err) => {
				setCount(count - 1);
				// need to add error handling here
				console.log("clothes wasnt been added to basket");
				console.log(err);
			});
		}
	};

  console.log(count);

  return (
	<Pressable style={styles.button} onPress={() => addNewClothesToBasket()}>
      <Text style={styles.text}>Add to basket ({count})</Text>
    </Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
    height: 65,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 6,
    backgroundColor: '#008C83',
  },
  text: {
      fontSize: 18,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
  },
});

export default AddToBasketButton;