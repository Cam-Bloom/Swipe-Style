import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Button } from "@react-native-material/core";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { patchUserPreferences } from "../utils/api.js";
import DeveloperSettings from "../components/EditTagFrequency";
import { colors } from "../utils/variables.js";

const SettingsPage = () => {
  const { user } = useContext(UserContext);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetRecommendations = async () => {
    try {
      const data = JSON.stringify({
        title: {
          cat: 1,
          dog: 1,
          techno: 1,
          icon: 1,
          logo: 1,
          classic: 1,
          fit: 1,
          dreamy: 1,
        },
        color: {
          green: 1,
          white: 1,
          black: 1,
          orange: 1,
        },
        category: {},
        brand: {},
        topAndRandom: {
          title: { n: 4, r: 2 },
          color: { n: 0, r: 0 },
          brand: { n: 0, r: 0 },
          category: { n: 0, r: 0 },
        },
      });

      await patchUserPreferences(user, { preferences: data });
      ToastAndroid.show("Reset Successful", ToastAndroid.SHORT);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.buttons}>
      <DeveloperSettings />
      <Button
        color={colors.darkviolet}
        onPress={resetRecommendations}
        title="Reset Recommendations"
        style={styles.reset}
      ></Button>
      <Button
        onPress={handleSignOut}
        title="Sign Out"
        style={styles.signout}
      ></Button>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  reset: {
    margin: 10,
    backgroundColor: colors.red,
  },

  signout: {
    marginTop: 10,
    color: colors.white,
    backgroundColor: colors.darkgrey,
  },
});
