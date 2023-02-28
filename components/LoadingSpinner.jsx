import {
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const LoadingSpinner = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
              <ActivityIndicator
                size='large'
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />
          </View>
        </SafeAreaView>
      );
    };

export default LoadingSpinner

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      paddingTop: 30,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    spinnerTextStyle: {
      color: '#FFF',
    },
  });