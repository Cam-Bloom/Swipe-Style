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
import RemoveClothesFromBasket from '../components/RemoveClothesFromBasket';
import EditClothesAmountButton from '../components/EditClothesAmountButton';
import { colors } from "../utils/variables.js";

const BasketPage = ({ basket, setBasket }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let totalPrice = 0;

    basket.forEach(item => {
      let currentPrice = parseFloat(item?.price?.substr(1)) ?? 0;

      totalPrice += (item.basket_count * currentPrice);
    });

    setTotalAmount(totalPrice);
  }, [basket]);
    
    const renderItem = ({item}) => {
      return (
          <View style={styles.item}>
            <View style={styles.left}>
              <Image style={styles.productImage} source={{
                            uri: `https://${item.item_img_url}`
                          }} />
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.priceValue}>{item.price}</Text>
              <View style={styles.bottom}>
                <EditClothesAmountButton basket={basket} setBasket={setBasket} item={item} setTotalAmount={setTotalAmount} />
                <View>
                  <RemoveClothesFromBasket setBasket={setBasket} item={item} setTotalAmount={setTotalAmount} />
                </View>
              </View>
            </View> 
                
          </View>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={basket}
          renderItem={renderItem}
          keyExtractor={item =>item.basket_id}
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
        marginTop: StatusBar.currentHeight || 0,
        justifyContent: 'center',
    },
    item: {
      flex: 2,
      justifyContent: 'space-around',
      flexDirection: 'row',
      padding: 10,
    },
    checkoutButton: {
      height: 45,
      width: 300,
      alignItems: 'center',
      borderRadius: 8,
      elevation: 3,
      backgroundColor: colors.darkviolet,
      marginLeft: 60,
      marginTop: 5,
      marginBottom: 5,
    },
    checkoutTitle: {
      fontSize: 20,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      padding: 12,
    },
    productImage: {
      width: 70,
      height: 90,
      marginHorizontal: 4,
      marginRight: 5,
      marginLeft: 5,
    },
    left: {
      flex: 1,
      justifyContent: 'center',
    },
    right: {
      flex: 3,
      justifyContent: 'space-around',
    },
    title: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#606476',
      marginBottom: 5,
    },
    priceValue: {
      color: '#B8354E',
      fontSize: 16,
      fontWeight: 'bold',
    },
    bottom: {
      flex: 2,
      flexDirection: 'row',
      marginTop: 5,
    },
  }
);

export default BasketPage;