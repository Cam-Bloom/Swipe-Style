import React, { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { deleteClothesFromFavourites } from "../utils/api";
import { colors } from "../utils/variables.js";
import RemoveConfirmationModal from '../components/RemoveConfirmationModal';
import { View } from 'react-native';
import { IconButton } from "@react-native-material/core";

const RemoveFavouriteButton = ({ setFavourites, favouriteId }) => {
    const [isRemoveConfirmationModalVisible, setIsRemoveConfirmationModalVisible] = useState(false);

    //errors should be handled later
    const [isRemoving, setIsRemoving] = useState(false);
    const [err, setError] = useState(null);


    const handleRemoveItem = () => {
      setIsRemoveConfirmationModalVisible(true);
    };

    const handleCancelRemoveItem = () => {
      setIsRemoveConfirmationModalVisible(false);
    };

    const deleteCurrentClothes = () => {
      setIsRemoveConfirmationModalVisible(false);
      setIsRemoving(true);
      console.log(favouriteId);  
        deleteClothesFromFavourites(favouriteId)
            .then(() => {
                setFavourites(currentFavourite => currentFavourite.filter(favourite => favourite.favourite_id !== favouriteId));
                setIsRemoving(false);
            })
            .catch((err) => {
                // need to add error handling
                console.log(err);
                setError(err);
            })
    };

    return (
      <View>
        <IconButton
          icon={(props) => <Icon name="delete" color={colors.white} size={26} />}
          color={colors.darkgrey}
          backgroundColor={colors.violet}
          onPress={() => handleRemoveItem()}
      />
      <RemoveConfirmationModal
        isVisible={isRemoveConfirmationModalVisible}
        onConfirm={deleteCurrentClothes}
        onCancel={handleCancelRemoveItem}
      />
    </View>
    );
};

export default RemoveFavouriteButton;