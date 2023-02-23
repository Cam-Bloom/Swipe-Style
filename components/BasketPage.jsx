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

const BasketPage = ({ basket }) => {
    console.log(basket);
    
    return (
        <View>
            <Text>You busket is empty! Please, buy something and then come here again!</Text>
            {/* <Text>{title}</Text> */}
        </View>
    );
};

export default BasketPage;
