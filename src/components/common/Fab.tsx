import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FabProps {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  style?: ViewStyle;
  backgroundColor?: string;
  onPress: () => void;
}

const Fab: React.FC<FabProps> = ({
  iconName,
  iconSize = 36,
  iconColor = "#fff",
  style,
  backgroundColor = "#4CAF50",
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.fab, { backgroundColor }, style]}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Ionicons name={iconName as any} size={iconSize} color={iconColor} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 24,
    bottom: 48,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});

export default Fab;
