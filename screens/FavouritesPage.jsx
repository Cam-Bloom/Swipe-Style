import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../utils/variables.js";

const FavouritesPage = ({ navigation, setBasket, favourites }) => {
  const handleNavigateToBasketPage = () => {
    navigation.navigate("Basket");
  };

  const handleAddToBasketButton = (item) => {
    setBasket((currentBasket) => [item, ...currentBasket]);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.left}>
          <View style={styles.description}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.category}>
              <Text style={styles.categoryTitle}>category: </Text>
              <Text style={styles.categoryValue}>{item.category}</Text>
            </View>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceTitle}>price: </Text>
            <Text style={styles.priceValue}>{item.price}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Image
            style={styles.productImage}
            source={{
              uri: `https://${item.item_img_url}`,
            }}
          />
          <Pressable
            style={styles.button}
            onPress={() => handleAddToBasketButton(item)}
          >
            <Text style={styles.text}>Add to basket</Text>
          </Pressable>
        </View>
        {/* ICON BUTTONS: BASKET AND REMOVE */}
        {/* <View style={styles.buttonArea}>
          <IconButton
            icon={(props) => (
              <Icon name="shopping-basket" color={colors.white} size={25} />
            )}
            backgroundColor={colors.green}
            onPress={() => handleAddToBasketButton(item)}
          />
          <IconButton
            icon={(props) => (
              <Icon name="remove" color={colors.white} size={25} />
            )}
            color={colors.darkgrey}
            backgroundColor={colors.violet}
            onPress={() => {}}
          />
        </View> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={(item) => item.clothes_id}
      />
      <View>
        <Pressable
          style={styles.viewBasketButton}
          onPress={handleNavigateToBasketPage}
        >
          <Text style={styles.viewBasketTitle}>View Basket</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  item: {
    backgroundColor: colors.lightgrey,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.border,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    paddingRight: 5,
    fontWeight: "bold",
    color: colors.darkgrey,
  },
  productImage: {
    width: 130,
    height: 130,
    marginBottom: 10,
    borderRadius: 10,
  },
  viewBasketButton: {
    alignItems: "center",
    borderRadius: 8,
    elevation: 3,
    backgroundColor: colors.darkviolet,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  viewBasketTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.white,
    padding: 12,
  },
  button: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 6,
    backgroundColor: colors.green,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.white,
  },
  left: {
    flex: 3,
    justifyContent: "space-around",
  },
  right: {
    flex: 2,
    justifyContent: "center",
  },
  buttonArea: {
    flex: 1,
    flexDirection: "row",
  },
  description: {
    paddingBottom: 10,
  },
  price: {
    flexDirection: "row",
  },
  priceTitle: {
    fontSize: 16,
    color: colors.darkgrey,
  },
  priceValue: {
    color: colors.darkgrey,
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    marginTop: 16,
    flexDirection: "row",
  },
  categoryTitle: {
    color: colors.darkgrey,
    fontSize: 16,
  },
  categoryValue: {
    color: colors.darkgrey,
    fontSize: 16,
  },
});

export default FavouritesPage;
