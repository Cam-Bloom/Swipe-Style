import React from "react";
import { StyleSheet } from "react-native";
import { UserProvider } from "./contexts/userContext";
import { LoadingProvider } from "./contexts/loadingContext";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  return (
    <LoadingProvider>
      <UserProvider>
        <RootNavigator />
      </UserProvider>
    </LoadingProvider>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingTop: 25,
  },
});
