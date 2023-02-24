import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {

	return (
		<Stack.Navigator>
			<Stack.Screen name="Log In" component={LoginScreen} />
			<Stack.Screen name="Sign Up" component={SignupScreen} />
		</Stack.Navigator>
	);
};

export default AuthStack;

const styles = StyleSheet.create({});