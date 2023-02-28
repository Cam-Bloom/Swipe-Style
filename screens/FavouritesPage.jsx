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
import AddToBasketButton from '../components/AddToBasketButton';
import RemoveFavouriteButton from '../components/RemoveFavouriteButton';

const FavouritesPage = ({ navigation, basket, setBasket, favourites,  setFavourites }) => {
  const handleNavigateToBasketPage = () => {
    navigation.navigate('Basket');
  };

  const renderItem = ({item}) => {
    

    return (
        <View style={styles.item}>
          <View style={styles.top}>
            <RemoveFavouriteButton setFavourites={setFavourites} favouriteId={item.favourite_id} />
          </View>
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
              <Image style={styles.productImage} source={{
                        uri: `https://${item.item_img_url}`
                      }} />
              <AddToBasketButton basket={basket} setBasket={setBasket} clothes={item} />
            </View>
          </View>
        </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={item =>item.clothes_id}
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
    flex: 2,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#F6F3F1',
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#606476',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottom: {
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
    marginLeft: 80,
    marginTop: 5,
    marginBottom: 5,
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
    fontSize: 15,
  },
  categoryValue: {
    color: '#B4A6AB',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default FavouritesPage;