import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface DescriptionInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function DescriptionInput({
  value,
  onChangeText,
}: DescriptionInputProps) {
  return (
    <View style={styles.descriptionRow}>
      <Ionicons
        name="reorder-three"
        size={24}
        color="#888"
        style={{ marginRight: 8 }}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="설명 추가"
        placeholderTextColor="#bbb"
        value={value}
        onChangeText={onChangeText}
        multiline
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionRow: {
    flexDirection: "row",
    paddingTop: 20,
    marginLeft: 10,
    marginRight: 40,
    height: 100,
  },
  descriptionInput: {
    flex: 1,
    color: "#222",
    fontSize: 16,
  },
});
