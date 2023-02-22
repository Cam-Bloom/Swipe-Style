import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';

const DATA = [
  {
    item_id: 0,
    title: "Brown Bomber Jacket",
    price: 45,
    color: "Brown",
    category: "activewear",
    brand: "Columbia",
    gender: "male",
    item_img_url: "https://i.imgur.com/cuO6Oro.jpg",
  },
  {
    item_id: 1,
    title: "Cat Print Shirt",
    price: 20,
    color: "CREAM",
    category: "activewear",
    brand: "Vans",
    gender: "male",
    item_img_url: "https://i.imgur.com/rVbTPTD.jpg",
  },
  {
    item_id: 2,
    title: "Trendy Red Shoes",
    price: 60,
    color: "WHITE",
    category: "activewear",
    brand: "Vans",
    gender: "male",
    item_img_url: "https://i.imgur.com/ksRACaQ.jpg",
  },
  {
    item_id: 3,
    title: "Grey Ripped Jeans",
    price: 35,
    color: "Multi",
    category: "activewear",
    brand: "New Balance",
    gender: "male",
    item_img_url: "https://i.imgur.com/IXovKq2.jpg",
  },
  {
    item_id: 4,
    title: "Brown Bomber Jacket",
    price: 45,
    color: "WHITE",
    category: "activewear",
    brand: "Reebok",
    gender: "male",
    item_img_url: "https://i.imgur.com/cuO6Oro.jpg",
  },
  {
    item_id: 5,
    title: "Red Running Shoes",
    price: 45,
    color: "Black",
    category: "activewear",
    brand: "Quiksilver",
    gender: "male",
    item_img_url: "https://i.imgur.com/GLsHdA5.jpg",
  },
];

const FavouritesPage = ({ navigation, setBasket, favourites }) => {
  const handleNavigateToBasketPage = () => {
    navigation.navigate('Basket');
  };

  const handleAddToBasketButton = (item) => {
    console.log("See current busket!");
    console.log(item);
    if (item.title) {
      setBasket(currentBasket => [item, ...currentBasket]);
    }
  };

  const renderItem = ({item}) => {
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
              <Text style={styles.priceValue}>£{item.price}</Text>
            </View>
          </View>
          <View style={styles.right}>
            <Image style={styles.productImage} source={{
                      uri: `https://${item.item_img_url}`
                    }} />
            <Pressable style={styles.button} onPress={() => handleAddToBasketButton(item)}>
              <Text style={styles.text}>Add to basket</Text>
            </Pressable>
          </View>
        </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={item =>item.item_id}
      />
      <View>
        <Pressable style={styles.viewBasketButton} onPress={handleNavigateToBasketPage}>
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
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#F6F3F1',
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#606476',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
    paddingRight: 5,
    fontWeight: 'bold',
    color: '#606476',
  },
  productImage: {
		width: 130,
		height: 130,
		marginBottom: 10,
		borderRadius: 10,
	},
  viewBasketButton: {
    height: 45,
    width: 250,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#EE6E29',
    marginLeft: 70,
  },
  viewBasketTitle: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    padding: 12,
  },
  button: {
    height: 65,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 6,
    backgroundColor: '#008C83',
  },
  text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
  },
  left: {
    flex: 3,
    justifyContent: 'space-around',
  },
  right: {
    flex: 2,
    justifyContent: 'center',
  },
  description: {
    paddingBottom: 10,
  },
  price: {
    flexDirection: 'row',
  },
  priceTitle: {
    fontSize: 20,
    color: '#606476',
  },
  priceValue: {
    color: '#B8354E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  category: {
    marginTop: 15,
    flexDirection: 'row',
  },
  categoryTitle: {
    color: '#606476',
    fontSize: 20,
  },
  categoryValue: {
    color: '#B4A6AB',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default FavouritesPage;