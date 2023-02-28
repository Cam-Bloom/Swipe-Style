import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import { patchClothesCount, postClothesToBasket} from '../utils/api';

const AddToBasketButton = ({ basket, setBasket, clothes }) => {
	const [isAddedToBasket, setIsAddedToBasket] = useState(false);

	//just hardcoded userId temporarily => this should be changed later
	const [userId, setUserId] = useState("12342341")

	useEffect(() => {
		const existingClothes = currentBasket.filter(x => x.clothes_id === clothes.clothes_id);
		if (existingClothes) {
			setIsAddedToBasket(true);
		}
	}, []);

	const addNewClothesToBasket = () => {
		const currentBasket = [...basket];
		const existingClothes = currentBasket.filter(x => x.clothes_id === clothes.clothes_id);

		if (existingClothes.length > 0) {
			setIsAddedToBasket(true);

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
					setIsAddedToBasket(false);

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
			})
			.catch((err) => {
				// need to add error handling here
				console.log("clothes hasn't been added to basket");
				console.log(err);
			});
		}
	};

  return (
		<View>
			{!isAddedToBasket} 
				? <Pressable style={styles.adderButton} onPress={() => addNewClothesToBasket()}> <Text style={styles.text}>Add to basket</Text></Pressable>
				: <Pressable style={styles.removerButton} onPress={() => removeClothesFromBasket()}><Text style={styles.text}>Remove from basket</Text></Pressable> 
		</View>
	);
};

const styles = StyleSheet.create({
	adderButton: {
    height: 65,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 6,
    backgroundColor: '#008C83',
  },
	removerButton: {
		height: 65,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 6,
    backgroundColor: '#B8354E',
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