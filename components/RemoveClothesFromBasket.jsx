import React, { useState } from 'react';
import Icon from "react-native-vector-icons/AntDesign";
import { deleteClothesFromBasket } from '../assets/utils/api';

const RemoveClothesFromBasket = ({ setBasket, item, setTotalAmount }) => {
    //errors should be handled later
    const [isRemoving, setIsRemoving] = useState(false);
    const [err, setError] = useState(null);

    const deleteCurrentClothes = () => {
        setIsRemoving(true);

        let currentPrice = parseFloat(item?.price?.substr(1)) ?? 0;
        setTotalAmount(currentTotalAmount => currentTotalAmount - (item.basket_count * currentPrice));

        console.log("we are trying to remove clothes from basket");
        console.log(item.basket_id);

        deleteClothesFromBasket(item.basket_id)
            .then(() => {
                setBasket(currentBasket => currentBasket.filter(basket => basket.basket_id !== item.basket_id));
                setIsRemoving(false);
            })
            .catch((err) => {
                setTotalAmount(currentTotalAmount => currentTotalAmount + (item.basket_count * item.price));
                
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