import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../styles/planner/plannerStyles";

interface ModalHeaderProps {
  onClose: () => void;
}

export default function ModalHeader({ onClose }: ModalHeaderProps) {
  return (
    <View style={styles.modalHeader}>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.modalCancel}>취소</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.modalSave}>저장</Text>
      </TouchableOpacity>
    </View>
  );
}
