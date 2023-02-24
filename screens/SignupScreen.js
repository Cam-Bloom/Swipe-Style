import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import {
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUp = () => {
		console.log("signup clicked");
		createUserWithEmailAndPassword(auth, email, password)
			.catch((error) => {
				console.log(error)
			});
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<View style={styles.textfields}>
				<TextInput
					label="Email"
					variant="outlined"
					leading={props => <Icon name="email" {...props} />}
					value={email}
					onChangeText={(text) => setEmail(text)}
				></TextInput>
                <TextInput
					label="Username"
					variant="outlined"
					leading={props => <Icon name="account" {...props} />}
					value={email}
					onChangeText={(text) => setEmail(text)}
				></TextInput>
                <TextInput
					label="Name"
					variant="outlined"
					leading={props => <Icon name="account-details" {...props} />}
					value={email}
					onChangeText={(text) => setEmail(text)}
				></TextInput>
				<TextInput
					label="Password"
					variant="outlined"
                    leading={props => <Icon name="lock" {...props} />}
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
				></TextInput>
			</View>
			<View style={styles.buttonContainer}>
				<Button 
                    onPress={handleSignUp}
					title="Create Account">
				</Button>
			</View>
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
        margin: 10
	}
});