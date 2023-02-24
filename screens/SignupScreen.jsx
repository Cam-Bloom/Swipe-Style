import {
	KeyboardAvoidingView,
	StyleSheet,
	View,
} from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import {
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { postUser } from "../utils/api";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");

	const handleSignUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const body = {
					uid: userCredential.user.uid,
					username: username,
					firstname: name,
					preferences: '{"title":{"cat":1,"dog":1,"rekive":1,"techno":1,"aloxe":1,"ess":1,"t-shirt":1,"sage":1,"green":1,"reclaimed":1,"vintage":1,"unisex":1,"stone":1,"active":1,"boxer":1,"shorts":1,"polo":1,"ralph":1,"lauren":1,"icon":1,"logo":1,"heavyweight":1,"classic":1,"fit":1,"white":1},"color":{"red":1,"green":1,"stone":1,"white":1},"category":{"shirt":1,"activewear":1},"brand":{"asos":1,"adidas Originals":1,"Reclaimed Vintage":1,"Polo Ralph Lauren":1}}',
				}

				console.log(body)

				// May need revision when enpoint is complete

				// useEffect(() => {
				// 	postUser(data)
				// 	.then(() => {
				// 		console.log('User Added')
				// 	})
				// 	.catch((err) => {
				// 		console.log(err);
				// 	  })
				// }, [])

			})
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
					value={username}
					onChangeText={(text) => setUsername(text)}
				></TextInput>
                <TextInput
					label="Name"
					variant="outlined"
					leading={props => <Icon name="account-details" {...props} />}
					value={name}
					onChangeText={(text) => setName(text)}
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