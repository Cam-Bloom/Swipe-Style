import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SwipePage from "./components/SwipePage";
import FavouritesPage from "./components/FavouritesPage";
import BasketPage from "./components/BasketPage";
import { getFavouritesByUserId, getUserBasket } from "./assets/utils/api";

export default function App() {
	const Tab = createMaterialTopTabNavigator();
	const [favourites, setFavourites] = useState([]);
	const [basket, setBasket] = useState([]);

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
		<NavigationContainer>
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
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
  tab: {
    paddingTop: 25,
  },
});
