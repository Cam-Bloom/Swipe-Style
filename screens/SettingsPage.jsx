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
      const data =
        '{"title":{"cat":1,"dog":1,"rekive":1,"techno":1,"aloxe":1,"ess":1,"t-shirt":1,"sage":1,"green":1,"reclaimed":1,"vintage":1,"unisex":1,"stone":1,"active":1,"boxer":1,"shorts":1,"polo":1,"ralph":1,"lauren":1,"icon":1,"logo":1,"heavyweight":1,"classic":1,"fit":1,"white":1},"color":{"red":1,"green":1,"stone":1,"white":1},"category":{"shirt":1,"activewear":1},"brand":{"asos":1,"adidas Originals":1,"Reclaimed Vintage":1,"Polo Ralph Lauren":1}}';
      await patchUserPreferences(user, { preferences: data });
      ToastAndroid.show("Reset Successful", ToastAndroid.SHORT);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.buttons}>
      <Button
        onPress={resetRecommendations}
        title="Reset Recommendations?"
        style={styles.reset}
      ></Button>
      <Button
        onPress={handleSignOut}
        title="Sign Out"
        style={styles.signout}
      ></Button>
      <DeveloperSettings />
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  reset: {
    margin: 10,
  },

  signout: {
    margin: 10,
  },
});
