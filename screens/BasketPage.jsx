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
  TouchableOpacity
} from 'react-native';
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const BasketPage = ({ basket }) => {
    
    const handleSignOut = () => {
        signOut(auth).then(() => {
          console.log('Signed out')
        }).catch((error) => {
          console.log(error)
        });
      }
    
    return (
        <View>
            <Text>You busket is empty! Please, buy something and then come here again!</Text>
            {/* <Text>{title}</Text> */}
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
					<Text style={styles.text}>Sign Out</Text>
			</TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
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
      text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        padding: 12,
      },
});

export default BasketPage;
