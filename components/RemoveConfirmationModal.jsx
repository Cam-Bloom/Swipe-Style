import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const RemoveConfirmationModal = ({ isVisible, onConfirm, onCancel }) => (
  <Modal visible={isVisible} transparent>
    <View style={styles.errorModal}>
      <View style={styles.errorModalBorder}>
        <Text style={styles.additionalQuestion}>Are you sure you want to remove this clothes?</Text>
        <View style={styles.cancelButtonLayout}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
    errorModal: { 
      flex: 1, 
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    errorModalBorder: { 
      backgroundColor: '#fff', 
      padding: 20, 
      borderRadius: 10, 
    },
    additionalQuestion: {
      fontSize: 18, 
      fontWeight: 'bold', 
      marginBottom: 10,
    },
    cancelButtonLayout: {
      flexDirection: 'row', 
      justifyContent: 'space-around',
    },
    cancelButton: {
      backgroundColor: '#ccc', 
      padding: 10,
      borderRadius: 5,
    },
    cancelText: {
      color: '#fff', 
      fontWeight: 'bold',
    },
    confirmButton: {
      backgroundColor: '#B8354E',
      padding: 10,
      borderRadius: 5
    },
    confirmText: {
      color: '#fff', 
      fontWeight: 'bold',
    },
});

export default RemoveConfirmationModal;