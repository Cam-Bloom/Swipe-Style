import { SafeAreaView, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { colors } from "../utils/variables.js";

const LoadingSpinner = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <LottieView
          style={styles.loadingLottie}
          autoPlay={true}
          loop={true}
          source={require("../assets/lottie/loading.json")}
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
  spinnerTextStyle: {
    color: "#FFF",
  },
  loadingLottie: {
    width: 200,
  },
});
