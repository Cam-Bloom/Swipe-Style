import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {

	return (
		<Stack.Navigator>
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>
	);
};

export default AuthStack;

const styles = StyleSheet.create({});