import React from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../utils/variables";

const RemoveConfirmationModal = ({ isVisible, onConfirm, onCancel }) => (
  <Modal visible={isVisible} transparent>
    <View style={styles.errorModal}>
      <View style={styles.errorModalBorder}>
        <Text style={styles.additionalQuestion}>
          Are you sure you want to remove this item?
        </Text>
        <View style={styles.cancelButtonLayout}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
            <Text style={styles.confirmText}>Yes, remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  errorModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  errorModalBorder: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 30,
  },
  additionalQuestion: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 15,
  },
  cancelButtonLayout: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cancelButton: {
    backgroundColor: colors.darkgrey,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  cancelText: {
    color: colors.white,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: colors.red,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  confirmText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default RemoveConfirmationModal;
