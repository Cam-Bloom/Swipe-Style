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
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<View style={styles.textfields}>
				<TextInput
					label="Email"
					variant="outlined"
					leading={props => <Icon name="account" {...props} />}
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
					title="Sign In"
					onPress={handleSignIn}/>
				<Button
					title="Sign Up"
					variant="outlined"
					onPress={() => navigation.navigate('Sign Up')}/>
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
	},
	buttonContainer: {
		flexDirection: 'row',
		width: 250,
		justifyContent: 'space-evenly'
	}
});