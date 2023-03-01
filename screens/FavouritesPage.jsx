import React from "react";
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
import { colors } from "../utils/variables.js";
import AddToBasketButton from "../components/AddToBasketButton";
import RemoveFavouriteButton from "../components/RemoveFavouriteButton";

const FavouritesPage = ({
  navigation,
  basket,
  setBasket,
  favourites,
  setFavourites,
}) => {
  const handleNavigateToBasketPage = () => {
    navigation.navigate("Basket");
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.bottom}>
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
          </View>
        </View>
        <View style={styles.buttonArea}>
          <AddToBasketButton
            basket={basket}
            setBasket={setBasket}
            clothes={item}
          />
          <RemoveFavouriteButton
            style={styles.buttonRemove}
            setFavourites={setFavourites}
            favouriteId={item.favourite_id}
          />
        </View>
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
    flex: 2,
    // paddingTop: StatusBar.currentHeight || 0,
    paddingTop: 20,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  item: {
    backgroundColor: colors.lightgrey,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.border,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  top: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  bottom: {
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    paddingRight: 5,
    fontWeight: "bold",
    color: colors.darkgrey,
  },
  productImage: {
    width: "auto",
    height: 160,
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
  buttonArea: {
    marginTop: 20,
    flexDirection: "row",
  },
  buttonRemove: {
    color: colors.darkviolet,
    marginLeft: 20,
  },
});

export default FavouritesPage;
