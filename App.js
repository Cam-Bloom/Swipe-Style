import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import data from "./data";

export default function App() {
	const [clothesData, setClothesData] = useState(data);
	const [index, setIndex] = useState(5);

	const currentItem = clothesData[index];

	const handlePress = (direction) => {
		setIndex((currentIndex) => currentIndex + direction);
	};

	return (
		<NavigationContainer>
			<View style={styles.container}>
				<Image
					style={styles.productImage}
					source={{
						uri: currentItem.item_img_url,
					}}
				/>
				<Text style={styles.title}>{currentItem.title}</Text>
				<Text style={styles.price}>£{currentItem.price.toFixed(2)}</Text>
				<View style={styles.buttonContainer}>
					<Button title="prev" onPress={() => handlePress(-1)} />
					<Button title="next" onPress={() => handlePress(1)} />
				</View>
				<View>
					<Icon onPress={() => handlePress(-1)} name="remove" style={styles.iconDislike} />
				</View>
				<StatusBar style="auto" />
			</View>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
	},
	productImage: {
		width: "100%",
		height: 400,
		marginBottom: 10,
		borderRadius: 100,
	},
	buttonContainer: {
		width: 200,
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginTop: 10,
	},
	title: {
		fontSize: 25,
		fontWeight: "bold",
	},
	price: {
		color: "#228B22",
	},
	iconDislike: {
		fontSize: 30,
		backgroundColor: "lightgrey",
		borderRadius: 10,
		padding: 10,
		borderColor: "black",
		borderWidth: 2,
	},
});
