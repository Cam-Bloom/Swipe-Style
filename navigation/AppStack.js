import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SwipePage from "../screens/SwipePage";
import FavouritesPage from "../screens/FavouritesPage";
import BasketPage from "../screens/BasketPage";
import SettingsPage from "../screens/SettingsPage";
import Icon from "react-native-vector-icons/AntDesign";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { getFavouritesByUserId, getUserBasket } from "../utils/api";

export default function App() {
  const Tab = createMaterialTopTabNavigator();
  const [favourites, setFavourites] = useState([]);
  const [basket, setBasket] = useState([]);

  const { user } = useContext(UserContext);

//   const [userId, setUserId] = useState("12342341");
	console.log(user);
  useEffect(() => {
    getFavouritesByUserId(user)
      .then((favouritesFromApi) => {
        setFavourites(favouritesFromApi.data.userFavouriteClothes);
        console.log(favouritesFromApi.data.userFavouriteClothes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getUserBasket(user)
      .then((basketFromApi) => {
        setBasket(basketFromApi.data.userBasket);
        console.log("basket form API");
        console.log(basketFromApi.data.userBasket);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Tab.Navigator
      style={styles.tab}
      screenOptions={{ swipeEnabled: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Home"
        children={(props) => (
          <SwipePage setFavourites={setFavourites} {...props} />
        )}
        options={{
          tabBarIcon: () => <Icon name="home" size={25} />,
        }}
      />
      <Tab.Screen
        name="Favourites"
        children={(props) => (
          <FavouritesPage
            basket={basket}
            setBasket={setBasket}
            favourites={favourites}
            {...props}
          />
        )}
        options={{
          tabBarIcon: () => <Icon name="hearto" size={24} />,
        }}
      />
      <Tab.Screen
        name="Basket"
        children={(props) => <BasketPage basket={basket} setBasket={setBasket} {...props} />}
        options={{
          tabBarIcon: () => <Icon name="shoppingcart" size={25} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          tabBarIcon: () => <Icon name="setting" size={25} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingTop: 45,
  },
});
