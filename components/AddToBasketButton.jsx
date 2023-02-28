import React, { useState } from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import { patchClothesCount, postClothesToBasket} from '../utils/api';

const AddToBasketButton = ({ basket, setBasket, clothes }) => {
	const [count, setCount] = useState(0);

	//just hardcoded userId temporarily => this should be changed later
	const [userId, setUserId] = useState("12342341")

	const addNewClothesToBasket = () => {
		const currentBasket = [...basket];
		const existingClothes = currentBasket.filter(x => x.clothes_id === clothes.clothes_id);

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
				})
				.catch((err) => {
					setCount(count - 1);

				// need to add error handling here
				console.log("clothes count hasn't been updated");
				console.log(err);
				});
		} else {
			postClothesToBasket(userId, {clothes_id: clothes.clothes_id})
				.then((clothesAddedToBasket) => {
					const { clothesBasket } = clothesAddedToBasket.data;

					const newClothesAddedToBasket = {
						"basket_id": clothesBasket.basket_id,
						"basket_count": clothesBasket.basket_count,
						"clothes_id": clothesBasket.clothes_id,
						"uid": clothesBasket.uid,
						"title": clothes.title,
						"item_img_url": clothes.item_img_url,
						"price": clothes.price,
					}

					setBasket(currentBasket => [newClothesAddedToBasket, ...basket]);
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