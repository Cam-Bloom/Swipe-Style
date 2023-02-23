import React, { useState, useRef, createRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import data from "../data.js";
import Swiper from "react-native-deck-swiper";
import { IconButton } from "@react-native-material/core";
import { colors } from "../assets/utils/variables.js";
import { suggestedClothes, patchUserPrefference } from "../assets/utils/api.js";

const SwipePage = ({ setFavourites }) => {
  const swiperRef = createRef();
  const [clothesData, setClothesData] = useState(data);
  const [index, setIndex] = useState(1);
  const [tapCount, setTapCount] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [preferrences, setPreferrences] = useState("");

  useEffect(() => {
    try {
      suggestedClothes(12342341).then((clothesFromAPI) => {
        console.log(clothesFromAPI.data);
        setClothesData(clothesFromAPI.data.suggestedClothes);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (index % 5 === 0 && index % 10 !== 0) {
      try {
        suggestedClothes(12342341).then((clothesFromAPI) => {
          const newdata = clothesData.concat(
            clothesFromAPI.data.suggestedClothes
          );
          setClothesData(newdata);
        });
        console.log(clothesData, "length:---", clothesData.length);
      } catch (err) {
        console.log(err);
      }
    }
  }, [index]);

  useEffect(() => {
    if (index % 5 !== 0 && index % 10 === 0) {
      try {
        patchUserPrefference(12342341, { preferences: preferrences });
      } catch (err) {
        console.log(err);
      }
    }
  }, [index]);

  const handleSwipeOnPress = (preference) => {
    preference === 1
      ? swiperRef.current.swipeRight()
      : swiperRef.current.swipeLeft();
  };

  const handleSwipe = (preference) => {
    preference === 1 ? console.log("like") : console.log("nope");
    setIndex((currentIndex) => currentIndex + 1);
    console.log(index);
    if (preference === 1) {
      updatePreferrence(clothesData[index]);
    }
  };

  const updatePreferrence = (item) => {
    const preferrenceStr = `${item.title} ${item.color} ${item.brand} ${item.gender} `;
    const newPreferrences = preferrences.concat(preferrenceStr);
    setPreferrences(newPreferrences);
    console.log(preferrences);
  };

  const handleSwipeBack = () => {
    swiperRef.current.swipeBack();
    setIndex((currentIndex) => currentIndex - 1);
  };

  const handleDoubleTap = (card) => {
    const myTime = new Date();
    const mySec = myTime.getTime();
    if (mySec - lastTime < 250) {
      handleAddToFavorite(card);
      setTapCount(2);
    }
    setLastTime(mySec);
  };

  const handleAddToFavorite = (card) => {
    console.log("Added to favourite");
    setFavourites((currCards) => [card, ...currCards]); //check for error in adding favourites
    console.log(card);
    handleSwipeOnPress(1);
    setTapCount(0);
  };

  const Card = ({ card }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: `https://${card.item_img_url}` }}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>{card.title}</Text>
      </View>
    );
  };

  const Buttons = () => {
    return (
      <View style={styles.icons}>
        <IconButton
          icon={(props) => <Icon name="back" {...props} />}
          color={colors.darkgrey}
          size={30}
          backgroundColor={colors.white}
          borderWidth={1}
          borderColor={colors.border}
          onPress={() => handleSwipeBack()}
        />
        <Icon
          name="closecircle"
          size={70}
          color={colors.red}
          onPress={() => handleSwipeOnPress(-1)}
        />
        <Icon
          name="checkcircle"
          size={70}
          color={colors.green}
          onPress={() => handleSwipeOnPress(1)}
        />
        <IconButton
          icon={(props) => <Icon name="heart" {...props} />}
          color={colors.red}
          size={30}
          backgroundColor={colors.white}
          borderWidth={1}
          borderColor={colors.border}
          onPress={() => handleAddToFavorite(clothesData[index])}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={clothesData}
        cardIndex={index}
        renderCard={(card) => <Card card={card} />}
        onSwipedRight={() => handleSwipe(1)}
        onSwipedLeft={() => handleSwipe(-1)}
        onTapCard={(cardIndex) => handleDoubleTap(clothesData[cardIndex])}
        stackSize={5}
        stackSeparation={10}
        infinite={false}
        backgroundColor={colors.white}
        verticalSwipe={false}
        disableBottomSwipe
        disableTopSwipe
        style={styles.swiper}
        animateCardOpacity
        overlayLabels={{
          left: {
            title: "NOPE",
            style: {
              label: styles.overlayLabelsLeftLabel,
              wrapper: styles.overlayLabelsLeftWrapper,
            },
          },
          right: {
            title: "LIKE",
            style: {
              label: styles.overlayLabelsRightLabel,
              wrapper: styles.overlayLabelsRightWrapper,
            },
          },
        }}
      />
      <Buttons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  swiper: {
    position: "relative",
  },
  overlayLabelsLeftLabel: {
    color: colors.white,
    backgroundColor: colors.red,
    padding: 15,
    fontSize: 26,
  },
  overlayLabelsLeftWrapper: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  overlayLabelsRightLabel: {
    color: colors.white,
    backgroundColor: colors.green,
    padding: 15,
    fontSize: 26,
  },
  overlayLabelsRightWrapper: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  card: {
    flex: 0.65,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingBottom: 25,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
  },
  cardImage: {
    position: "relative",
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
  },
  icons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 50,
  },
  heartContainer: {
    position: "absolute",
    top: "30%",
    left: "45%",
    zIndex: 500,
  },
});

export default SwipePage;
