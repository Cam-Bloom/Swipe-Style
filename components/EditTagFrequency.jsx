import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, TextInput, ToastAndroid } from "react-native";
import { Button } from "@react-native-material/core";
import { getUser, patchUserPreferences } from "../utils/api";
import { UserContext } from "../contexts/userContext";

const DeveloperSettings = () => {
  const [showEditTagFrequency, setShowEditTagFrequency] = useState(false);

  return (
    <View style={styles.margin}>
      <Button
        title="Developer Settings"
        onPress={() => setShowEditTagFrequency(!showEditTagFrequency)}
      />
      {showEditTagFrequency && <EditTagFrequency />}
    </View>
  );
};

const EditTagFrequency = () => {
  const [topAndRandom, setTopAndRandom] = useState({});
  const { user } = useContext(UserContext);
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    // get user's preferences
    const fetchUserDataThenSetPreferences = async () => {
      try {
        const userFromAPI = await getUser(user);
        const existingUserPreferences = JSON.parse(
          userFromAPI.data.user.preferences
        );
        setPreferences(existingUserPreferences);
        setTopAndRandom(existingUserPreferences.topAndRandom);
      } catch (err) {
        console.log(err, "Couldnt fetch existing user preferences");
        ToastAndroid.show(
          "Error: Couldnt fetch existing user preferences",
          ToastAndroid.SHORT
        );
      }
    };

    fetchUserDataThenSetPreferences();
  }, []);

  const handleTopAndRandomChange = (key, type, value) => {
    if (value >= 0) {
      setTopAndRandom({
        ...topAndRandom,
        [key]: {
          ...topAndRandom[key],
          [type]: value,
        },
      });
    }
  };

  const handleSubmit = async () => {
    const updatedPreferences = {
      ...preferences,
      topAndRandom,
    };
    const updatedPreferencesString = JSON.stringify(updatedPreferences);
    try {
      await patchUserPreferences(user, {
        preferences: updatedPreferencesString,
      });
      console.log("preferences updated success:");
      ToastAndroid.show("Preferences updated successfully", ToastAndroid.SHORT);
    } catch (err) {
      console.error("error updating preferences:", err);
      ToastAndroid.show("Error updating preferences", ToastAndroid.SHORT);
    }
  };

  return (
    <View>
      {Object.keys(topAndRandom).map((key) => (
        <View key={key}>
          <View style={styles.rows}>
            <Text>{key} top:</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="-"
                style={styles.button}
                onPress={() =>
                  handleTopAndRandomChange(key, "n", +topAndRandom[key].n - 1)
                }
              />
              <TextInput
                value={" " + topAndRandom[key].n.toString() + " "}
                onChangeText={(text) =>
                  handleTopAndRandomChange(key, "n", Number(text))
                }
              />
              <Button
                title="+"
                style={styles.button}
                onPress={() =>
                  handleTopAndRandomChange(key, "n", +topAndRandom[key].n + 1)
                }
              />
            </View>
          </View>
          <View style={styles.rows}>
            <Text>{key} random:</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="-"
                style={styles.button}
                onPress={() =>
                  handleTopAndRandomChange(key, "r", +topAndRandom[key].r - 1)
                }
              />
              <TextInput
                value={" " + topAndRandom[key].r.toString() + " "}
                onChangeText={(text) =>
                  handleTopAndRandomChange(key, "r", Number(text))
                }
              />
              <Button
                title="+"
                style={styles.button}
                onPress={() =>
                  handleTopAndRandomChange(key, "r", +topAndRandom[key].r + 1)
                }
              />
            </View>
          </View>
        </View>
      ))}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default DeveloperSettings;

const styles = StyleSheet.create({
  rows: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 2,
    backgroundColor: "white",
    paddingLeft: 2,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "black",
  },
  margin: {
    margin: 10,
  },
});
