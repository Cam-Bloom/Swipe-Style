import { SafeAreaView, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { colors } from "../utils/variables.js";
import { useRef } from "react";

const LoadingSpinner = () => {
  const animation = useRef(null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 150,
            backgroundColor: colors.white,
          }}
          source={require("../assets/loading-green-dots.json")}
          // Change animation here
        />
      </View>
    </SafeAreaView>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});
