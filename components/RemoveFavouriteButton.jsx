import React, { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { deleteClothesFromFavourites } from "../utils/api";
import { colors } from "../utils/variables.js";
import { IconButton } from "@react-native-material/core";

const RemoveFavouriteButton = ({ setFavourites, favouriteId }) => {
  //errors should be handled later
  const [isRemoving, setIsRemoving] = useState(false);
  const [err, setError] = useState(null);

  const deleteCurrentClothes = () => {
    setIsRemoving(true);

    deleteClothesFromFavourites(favouriteId)
      .then(() => {
        setFavourites((currentFavourite) =>
          currentFavourite.filter(
            (favourite) => favourite.favourite_id !== favouriteId
          )
        );
        setIsRemoving(false);
      })
      .catch((err) => {
        // need to add error handling
        console.log(err);
        setError(err);
      });
  };

  return (
    <IconButton
      icon={(props) => <Icon name="delete" color={colors.white} size={26} />}
      color={colors.darkgrey}
      backgroundColor={colors.violet}
      onPress={() => deleteCurrentClothes()}
    />
  );
};

export default RemoveFavouriteButton;
