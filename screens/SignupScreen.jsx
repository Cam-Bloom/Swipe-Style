import { KeyboardAvoidingView, StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { postUser } from "../utils/api";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(undefined);
  const charRegex = /^\w+$/;
  const letterRegex = /^[a-z]+$/i;

  const handleSignUp = () => {
    setError(undefined);

    if (!username) {
      setError("Please enter a username.");
    } else if (!charRegex.test(username)) {
      setError("Usernames should only contain letters and numbers.");
    } else if (!name) {
      setError("Please enter your name.");
    } else if (!letterRegex.test(name)) {
      setError("Name should only contain letters.");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const body = {
            uid: userCredential.user.uid,
            username: username,
            firstname: name,
            preferences:
              '{"title":{"cat":1,"dog":1,"rekive":1,"techno":1,"aloxe":1,"ess":1,"t-shirt":1,"sage":1,"green":1,"reclaimed":1,"vintage":1,"unisex":1,"stone":1,"active":1,"boxer":1,"shorts":1,"polo":1,"ralph":1,"lauren":1,"icon":1,"logo":1,"heavyweight":1,"classic":1,"fit":1,"white":1},"color":{"red":1,"green":1,"stone":1,"white":1},"category":{"shirt":1,"activewear":1},"brand":{"asos":1,"adidas Originals":1,"Reclaimed Vintage":1,"Polo Ralph Lauren":1}}',
          };

          postUser(body)
            .then(() => {
              console.log("User Added");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          console.log(error.message);

          if (error.message === "Firebase: Error (auth/invalid-email).") {
            setError("Please enter an valid email address.");
          } else if (
            error.message ===
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            setError("Password should be at least 6 characters.");
          } else if (
            error.message === "Firebase: Error (auth/missing-email)."
          ) {
            setError("Please enter an email address");
          } else if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            setError("Email address already in use");
          } else if (
            error.message === "Firebase: Error (auth/internal-error)."
          ) {
            setError("Please enter a password");
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.textfields}>
        <TextInput
          label="Username"
          variant="outlined"
          leading={(props) => <Icon name="account" {...props} />}
          value={username}
          onChangeText={(text) => setUsername(text)}
        ></TextInput>
        <TextInput
          label="Name"
          variant="outlined"
          leading={(props) => <Icon name="account-details" {...props} />}
          value={name}
          onChangeText={(text) => setName(text)}
        ></TextInput>
        <TextInput
          label="Email"
          variant="outlined"
          leading={(props) => <Icon name="email" {...props} />}
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          label="Password"
          variant="outlined"
          leading={(props) => <Icon name="lock" {...props} />}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSignUp} title="Create Account"></Button>
      </View>
      {error && <Text style={styles.errMessage}>{error}</Text>}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textfields: {
    width: 250,
    margin: 10,
  },
  errMessage: {
    marginTop: 10,
    fontWeight: "500",
    fontSize: 15,
    color: "red",
  },
});
