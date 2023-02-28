import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SwipePage from "../screens/SwipePage";
import FavouritesPage from "../screens/FavouritesPage";
import BasketPage from "../screens/BasketPage";

export default function App() {
  const Tab = createMaterialTopTabNavigator();
  const [favourites, setFavourites] = useState([]);
  const [basket, setBasket] = useState([]);

  return (
    <Tab.Navigator style={styles.tab} screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen
        name="Home"
        children={(props) => (
          <SwipePage
            setFavourites={setFavourites}
            favourites={favourites}
            {...props}
          />
        )}
      />
      <Tab.Screen
        name="Favourites"
        children={(props) => (
          <FavouritesPage
            setBasket={setBasket}
            favourites={favourites}
            {...props}
          />
        )}
      />
      <Tab.Screen
        name="Basket"
        children={(props) => <BasketPage basket={basket} {...props} />}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingTop: 25,
  },
});
