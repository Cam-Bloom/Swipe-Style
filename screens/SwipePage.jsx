import React, { useState, useRef, createRef, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import data from "../data.js";
import Swiper from "react-native-deck-swiper";
import { IconButton } from "@react-native-material/core";
import { colors, listOfAvoidWords } from "../utils/variables.js";
import {
  suggestedClothes,
  patchUserPreferences,
  getUser,
} from "../utils/api.js";
import { useContext } from 'react';
import {UserContext} from '../contexts/userContext'

const SwipePage = ({ setFavourites }) => {
  const {user} = useContext(UserContext)
  const swiperRef = createRef();
  const [clothesData, setClothesData] = useState(data);
  const [index, setIndex] = useState(1);
  const [tapCount, setTapCount] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [preferences, setPreferences] = useState({});
  const [error, setError] = useState(null);

  //this fetches the initial array of 10 items. user.uid needs passing in
  //this gets the user object from the api, the user object will be passed in here and the user.uid will be put in the getUser
  useEffect(() => {
    const fetchInitialSuggestedClothes = async () => {
      try {
        const clothesFromAPI = await suggestedClothes(user);
        setClothesData(clothesFromAPI.data.suggestedClothes);
      } catch (err) {
        setError(err);
        console.log(err, "couldnt fetch suggested clothes");
      }
    };

    const fetchUserDataThenSetPreferences = async () => {
      try {
        const userFromAPI = await getUser(user);
        const existingUserPreferences = JSON.parse(
          userFromAPI.data.user.preferences
        );
        setPreferences(existingUserPreferences);
      } catch (err) {
        console.log(err, "couldnt fetch existing user preferences");
      }
    };

    fetchInitialSuggestedClothes();
    fetchUserDataThenSetPreferences();
  }, []);

  //user.uid will need passing in to these functions
  useEffect(() => {
    const fetchSuggestedClothesAndConcat = async () => {
      try {
        const clothesFromAPI = await suggestedClothes(user);
        const newData = clothesData.concat(
          clothesFromAPI.data.suggestedClothes
        );
        setClothesData(newData);
      } catch (err) {
        console.log(err);
      }
    };

    const patchUserPreferencesUseEffect = async () => {
      try {
        const data = JSON.stringify(preferences);
        const res = await patchUserPreferences(user, { preferences: data });
        // console.log(res.data.user.preferences, "---- reply from server");
      } catch (err) {
        console.log(err);
      }
    };

    //on every 10th index
    if (index % 10 === 0) {
      patchUserPreferencesUseEffect();
      //every 10+5 index
    } else if (index % 10 !== 0 && index % 5 === 0) {
      fetchSuggestedClothesAndConcat();
    }
  }, [index]);

  //this will add an item to user preferences
  const addToPreferences = (item) => {
    //create a copy of preferences object from state
    let newPreferences = Object.assign({}, preferences);

    //init the object, make sure it has correct keys
    newPreferences.brand = newPreferences.brand || {};
    newPreferences.category = newPreferences.category || {};
    newPreferences.color = newPreferences.color || {};
    newPreferences.title = newPreferences.title || {};

    //sometimes getting error, crashing program, item.brand = undefined, so i added if statements
    if (item.brand) {
      //make everything lowercase
      let lowerCaseBrand = item.brand.toLowerCase();
      newPreferences.brand[lowerCaseBrand] =
        //if it doesnt exist, create it and set it to 0, then increment by 1
        //this means if it doesnt exist, it will be 1. if it exists it will be +=1
        (newPreferences.brand[lowerCaseBrand] || 0) + 1;
    }
    if (item.category) {
      let lowerCaseCategory = item.category.toLowerCase();
      newPreferences.category[lowerCaseCategory] =
        (newPreferences.category[lowerCaseCategory] || 0) + 1;
    }
    if (item.color) {
      let lowerCaseColor = item.color.toLowerCase();
      newPreferences.color[lowerCaseColor] =
        (newPreferences.color[lowerCaseColor] || 0) + 1;
    }
    if (item.title) {
      //if the brand, color or category already exist in title, dont add them
      let lowerCaseBrand = item.brand.toLowerCase();
      let lowerCaseColor = item.color.toLowerCase();
      let lowerCaseCategory = item.category.toLowerCase();
      let title = item.title
        .replace(lowerCaseBrand, "")
        .replace(lowerCaseColor, "")
        .replace(lowerCaseCategory, "")
        .trim();
      let titleWords = title.split(" ");
      titleWords.forEach((word) => {
        let lowerCaseWord = word.toLowerCase();
        if (!listOfAvoidWords.includes(lowerCaseWord) && word.length > 2) {
          newPreferences.title[lowerCaseWord] =
            (newPreferences.title[lowerCaseWord] || 0) + 1;
        }
      });
    }
    setPreferences(newPreferences);
    // console.log(preferences, "-----preferences");
  };

  const removeFromPreferences = (item) => {
    let newPreferences = Object.assign({}, preferences);
    newPreferences.brand = newPreferences.brand || {};
    newPreferences.category = newPreferences.category || {};
    newPreferences.color = newPreferences.color || {};
    newPreferences.title = newPreferences.title || {};

    if (item.brand) {
      item.brand = item.brand.toLowerCase();
      if (newPreferences.brand[item.brand]) {
        newPreferences.brand[item.brand]--;
        if (newPreferences.brand[item.brand] === 0) {
          delete newPreferences.brand[item.brand];
        }
      }
    }
    if (item.category) {
      item.category = item.category.toLowerCase();
      if (newPreferences.category[item.category]) {
        newPreferences.category[item.category]--;
        if (newPreferences.category[item.category] === 0) {
          delete newPreferences.category[item.category];
        }
      }
    }
    if (item.color) {
      item.color = item.color.toLowerCase();
      if (newPreferences.color[item.color]) {
        newPreferences.color[item.color]--;
        if (newPreferences.color[item.color] === 0) {
          delete newPreferences.color[item.color];
        }
      }
    }
    if (item.title) {
      item.title = item.title.toLowerCase();
      let titleWords = item.title.split(" ");
      titleWords.forEach((word) => {
        word = word.toLowerCase();
        if (newPreferences.title[word]) {
          newPreferences.title[word]--;
          if (newPreferences.title[word] === 0) {
            delete newPreferences.title[word];
          }
        }
      });
    }
    setPreferences(newPreferences);
    // console.log(preferences, "----preferences after delete");
  };

  // GESTURES
  const handleSwipeOnPress = (preference) => {
    preference === 1
      ? swiperRef.current.swipeRight()
      : swiperRef.current.swipeLeft();
  };

  const handleSwipe = (preference) => {
    console.log(index);
    if (preference === 1) {
      //console.log("like");
      addToPreferences(clothesData[index]);
    } else {
      //console.log("nope");
      removeFromPreferences(clothesData[index]);
    }
    setIndex((currentIndex) => currentIndex + 1);
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
    //console.log("Added to favourite");
    setFavourites((currCards) => [card, ...currCards]);
    //console.log(card);
    handleSwipeOnPress(1);
    setTapCount(0);
  };

  //added some error handling if img_url undefined
  const Card = ({ card }) => {
    return (
      <View style={styles.card}>
        {card.item_img_url ? (
          <Image
            source={{ uri: `https://${card.item_img_url}` }}
            style={styles.cardImage}
          />
        ) : (
          <Text style={styles.cardTitle}>Error: Image URL is undefined</Text>
        )}
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
      {/* DISPLAY ERROR  */}
      {error && (
        <Text style={styles.errorText}>
          An error occurred trying to fetch the data. Put a button here, try
          again?
        </Text>
      )}
      {!error && (
        <>
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
        </>
      )}
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
