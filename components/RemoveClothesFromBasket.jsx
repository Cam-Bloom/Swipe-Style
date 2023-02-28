import React, { useState } from 'react';
import Icon from "react-native-vector-icons/AntDesign";
import { deleteClothesFromBasket } from '../utils/api';

const RemoveClothesFromBasket = ({ setBasket, item, setTotalAmount }) => {
    //errors should be handled later
    const [isRemoving, setIsRemoving] = useState(false);
    const [err, setError] = useState(null);

    const deleteCurrentClothes = () => {
        setIsRemoving(true);

        let currentPrice = parseFloat(item?.price?.substr(1)) ?? 0;
        setTotalAmount(currentTotalAmount => currentTotalAmount - (item.basket_count * currentPrice));

        deleteClothesFromBasket(item.basket_id)
            .then(() => {
                setBasket(currentBasket => currentBasket.filter(basket => basket.basket_id !== item.basket_id));
                setIsRemoving(false);
            })
            .catch((err) => {
                setTotalAmount(currentTotalAmount => currentTotalAmount + (item.basket_count * item.price));
                
                // need to add error handling here
                console.log(err);
                setError(err);
            })
    };

    return (
        <Icon
          name="delete"
          size={22}
          color={'#606476'}
          onPress={() => deleteCurrentClothes()}
        />
    );
};

export default RemoveClothesFromBasket;