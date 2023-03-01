import React, { useState } from 'react';
import Icon from "react-native-vector-icons/AntDesign";
import { deleteClothesFromBasket } from '../utils/api';
import RemoveConfirmationModal from '../components/RemoveConfirmationModal';
import { View } from 'react-native';

const RemoveClothesFromBasket = ({ setBasket, item, setTotalAmount }) => {
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

    const handleConfirmRemoveClothes = () => {
        setIsRemoveConfirmationModalVisible(false);
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
      <View>
        <Icon
          name="delete"
          size={22}
          color={'#606476'}
          onPress={handleRemoveItem}
        />
        <RemoveConfirmationModal
        isVisible={isRemoveConfirmationModalVisible}
        onConfirm={handleConfirmRemoveClothes}
        onCancel={handleCancelRemoveItem}
      />
      </View>
    );
};

export default RemoveClothesFromBasket;