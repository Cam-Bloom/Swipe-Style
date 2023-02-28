import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { getUser, patchUserPreferences } from "../utils/api";
import { UserContext } from "../contexts/userContext";

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
        console.log(err, "couldnt fetch existing user preferences");
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
    } catch (err) {
      console.error("error updating preferences:", err);
    }
  };

  return (
    <View>
      {Object.keys(topAndRandom).map((key) => (
        <View key={key}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{key} top:</Text>
            <Button
              title="-"
              onPress={() =>
                handleTopAndRandomChange(key, "n", +topAndRandom[key].n - 1)
              }
            />
            <TextInput
              value={topAndRandom[key].n.toString()}
              onChangeText={(text) =>
                handleTopAndRandomChange(key, "n", Number(text))
              }
            />
            <Button
              title="+"
              onPress={() =>
                handleTopAndRandomChange(key, "n", +topAndRandom[key].n + 1)
              }
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>{key} random:</Text>
            <Button
              title="-"
              onPress={() =>
                handleTopAndRandomChange(key, "r", +topAndRandom[key].r - 1)
              }
            />
            <TextInput
              value={topAndRandom[key].r.toString()}
              onChangeText={(text) =>
                handleTopAndRandomChange(key, "r", Number(text))
              }
            />
            <Button
              title="+"
              onPress={() =>
                handleTopAndRandomChange(key, "r", +topAndRandom[key].r + 1)
              }
            />
          </View>
        </View>
      ))}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default EditTagFrequency;
