import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  Pressable,
} from "react-native";
import RemoveClothesFromBasket from "../components/RemoveClothesFromBasket";
import EditClothesAmountButton from "../components/EditClothesAmountButton";
import { colors } from "../utils/variables.js";

const BasketPage = ({ basket, setBasket }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let totalPrice = 0;

    basket.forEach((item) => {
      let currentPrice = parseFloat(item?.price?.substr(1)) ?? 0;

      totalPrice += item.basket_count * currentPrice;
    });

    setTotalAmount(totalPrice);
  }, [basket]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.left}>
          <Image
            style={styles.productImage}
            source={{
              uri: `https://${item.item_img_url}`,
            }}
          />
        </View>
        <View style={styles.right}>
          <Text numberOfLines={4} ellipsizeMode="tail" style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.priceValue}>{item.price}</Text>
          <EditClothesAmountButton
            basket={basket}
            setBasket={setBasket}
            item={item}
            setTotalAmount={setTotalAmount}
          />
        </View>
        <View style={styles.remove}>
          <RemoveClothesFromBasket
            setBasket={setBasket}
            item={item}
            setTotalAmount={setTotalAmount}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={basket}
        renderItem={renderItem}
        keyExtractor={(item) => item.basket_id}
      />
      <View>
        <Pressable style={styles.checkoutButton}>
          <Text style={styles.checkoutTitle}>Checkout ${totalAmount}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  item: {
    position: "relative",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.border,
    backgroundColor: colors.lightgrey,
  },
  checkoutButton: {
    alignItems: "center",
    borderRadius: 8,
    elevation: 3,
    backgroundColor: colors.darkviolet,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 5,
    marginBottom: 5,
    padding: 12,
  },
  checkoutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.white,
  },
  productImage: {
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  left: {
    width: "35%",
  },
  right: {
    width: "60%",
    flexDirection: "column",
  },
  title: {
    width: 180,
    height: 80,
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.darkgrey,
    marginBottom: 10,
  },
  priceValue: {
    color: colors.darkviolet,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  remove: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default BasketPage;
