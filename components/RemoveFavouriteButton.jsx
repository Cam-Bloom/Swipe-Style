import React, { useState } from 'react';
import Icon from "react-native-vector-icons/AntDesign";
import { deleteClothesFromFavourites} from '../assets/utils/api';
import { colors } from "../assets/utils/variables.js";

const RemoveFavouriteButton = ({ setFavourites, favouriteId }) => {
    //errors should be handled later
    const [isRemoving, setIsRemoving] = useState(false);
    const [err, setError] = useState(null);

    const deleteCurrentClothes = () => {
        setIsRemoving(true);

        console.log("we are trying to remove favourite");
        console.log(favouriteId);
        
        deleteClothesFromFavourites(favouriteId)
            .then(() => {
                setFavourites(currentFavourite => currentFavourite.filter(favourite => favourite.favourite_id !== favouriteId));
                setIsRemoving(false);
                console.log("favourite was removed");
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            })
    };

    return (
        <Icon
          name="delete"
          size={30}
          color={colors.red}
          onPress={() => deleteCurrentClothes()}
        />
    );
};

export default RemoveFavouriteButton;