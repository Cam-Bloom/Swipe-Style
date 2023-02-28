import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from "@react-native-material/core";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext'
import { patchUserPreferences } from "../utils/api.js";

const SettingsPage = () => {

    const {user} = useContext(UserContext)

    const handleSignOut = () => {
        signOut(auth).then(() => {
          console.log('Signed out')
        }).catch((error) => {
          console.log(error)
        });
      }

    const resetRecommendations = async () => {
        try {
            const data = 'cheese'
            console.log(user);
            await patchUserPreferences(user, {preferences: data});

        } catch (err) {
            console.log(err);
        }
     };

  return (
    <View style={styles.buttons}>
        <Button onPress={resetRecommendations} title="Reset Recommendations?" style={styles.reset}></Button>
        <Button onPress={handleSignOut} title="Sign Out" style={styles.signout}></Button>
    </View>
  )
}

export default SettingsPage

const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    reset: {
      margin: 10
    },
    
    signout: {
      margin: 10
    }
})