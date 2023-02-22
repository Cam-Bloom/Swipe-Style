import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SwipePage from "./components/SwipePage";
import FavouritesPage from "./components/FavouritesPage";

export default function App() {
  const Tab = createMaterialTopTabNavigator();
  const [favourites, setFavourites] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator style={styles.tab} screenOptions={{ swipeEnabled: false }}>
        <Tab.Screen
          name="Home"
          component={SwipePage}
          setFavourites={setFavourites}
        />
        <Tab.Screen
          name="Favourites"
          component={FavouritesPage}
          favourites={favourites}
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
