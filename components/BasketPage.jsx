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
    const tit = "empty";

    
    return (
        <View>
            <Text>You busket is empty! Please, buy something and then come here again!</Text>
            <Text>{tit}</Text>
        </View>
    );
};

export default BasketPage;
