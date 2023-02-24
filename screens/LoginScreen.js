import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
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

	const handleSignIn = () => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<View>
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
				></TextInput>
				<TextInput
					placeholder="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
				></TextInput>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={handleSignIn}>
					<Text>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleSignUp}>
					<Text>Create Account</Text>
				</TouchableOpacity>
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
});