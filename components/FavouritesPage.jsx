import React from 'react';
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
    title: "Blue Denim Jacket",
    price: 50,
    color: "blue",
    category: "trousers",
    style: "casual",
    material: "denim",
    item_img_url: "https://i.imgur.com/OYkyR5m.jpg",
  },
  {
    item_id: 1,
    title: "Cat Print Shirt",
    price: 20,
    color: "white",
    category: "shirts",
    style: "casual",
    material: "cotton",
    item_img_url: "https://i.imgur.com/rVbTPTD.jpg",
  },
  {
    item_id: 2,
    title: "Trendy Red Shoes",
    price: 60,
    color: "red",
    category: "shoes",
    style: "casual",
    material: "leather",
    item_img_url: "https://i.imgur.com/ksRACaQ.jpg",
  },
  {
    item_id: 3,
    title: "Grey Ripped Jeans",
    price: 35,
    color: "grey",
    category: "trousers",
    style: "casual",
    material: "denim",
    item_img_url: "https://i.imgur.com/IXovKq2.jpg",
  },
  {
    item_id: 4,
    title: "Brown Bomber Jacket",
    price: 45,
    color: "brown",
    category: "jackets",
    style: "casual",
    material: "cotton",
    item_img_url: "https://i.imgur.com/cuO6Oro.jpg",
  },
  {
    item_id: 5,
    title: "Red Running Shoes",
    price: 45,
    color: "red",
    category: "shoes",
    style: "athletic",
    material: "polyester",
    item_img_url: "https://i.imgur.com/GLsHdA5.jpg",
  },
];

const handleAddToBasketButton = () => {
  console.log("press on button => now do smth");
}

const Item = ({item}) => (
  <View style={styles.item}>
  <View style={styles.top}>
  <View>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.title}>material: {item.material}</Text>
  </View>
    <Image style={styles.productImage} source={{
						uri: item.item_img_url
					}}></Image>
  </View>
  <View style={styles.bottom}>
    <Text style={styles.title}>price: £{item.price}</Text>
    <Pressable style={styles.button} onPress={handleAddToBasketButton}>
    <Text style={styles.text}>Add to basket</Text>
    </Pressable>
    </View>
  </View>
);

const FavouritesPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item =>item.item_id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f0ffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    paddingRight: 10,
  },
  productImage: {
		width: 150,
		height: 150,
		marginBottom: 10,
		borderRadius: 20,
	},
  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#ff8c00',

  },
  text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
  },
  top: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottom: {
    flex: 2,
    flexDirection: 'row',
  }
});

export default FavouritesPage;