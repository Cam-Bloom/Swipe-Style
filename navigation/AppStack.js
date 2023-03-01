import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SwipePage from "../screens/SwipePage";
import FavouritesPage from "../screens/FavouritesPage";
import BasketPage from "../screens/BasketPage";
import { useContext } from 'react';
import {UserContext} from '../contexts/userContext'
import { getFavouritesByUserId, getUserBasket } from '../utils/api';

export default function App() {
	const Tab = createMaterialTopTabNavigator();
	const [favourites, setFavourites] = useState([]);
	const [basket, setBasket] = useState([]);

	const {user} = useContext(UserContext);

	//just hardcoded userId temporarily => this should be changed later
	const [userId, setUserId] = useState("12342341");

	useEffect(() => {
		getFavouritesByUserId(userId)
			.then((favouritesFromApi) => {
				setFavourites(favouritesFromApi.data.userFavouriteClothes);
				console.log(favouritesFromApi.data.userFavouriteClothes);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		getUserBasket(userId)
			.then((basketFromApi) => {
				setBasket(basketFromApi.data.userBasket);
				console.log("basket form API");
				console.log(basketFromApi.data.userBasket);
			})
			.catch((err) => {
				console.log(err);
			})
	}, []);

	return (
		<Tab.Navigator style={styles.tab} screenOptions={{ swipeEnabled: false }}>
			<Tab.Screen
			name="Home"
			children={(props) => <SwipePage setFavourites={setFavourites} {...props} />}
			/>
			<Tab.Screen
			name="Favourites"
			children={(props) => <FavouritesPage basket={basket} setBasket={setBasket}  favourites={favourites} setFavourites={setFavourites} {...props}/>}
			/>
			<Tab.Screen
			 name="Basket" 
			 children={(props) => <BasketPage basket={basket} setBasket={setBasket} {...props} />}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
  tab: {
    paddingTop: 25,
  },
});