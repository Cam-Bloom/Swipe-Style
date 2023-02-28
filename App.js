import React from "react";
import { StyleSheet } from "react-native";
import { UserProvider } from "./contexts/userContext";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
	return (
		<UserProvider>
			<RootNavigator/>
		</UserProvider>
	);
}

const styles = StyleSheet.create({
  tab: {
    paddingTop: 25,
  },
});
