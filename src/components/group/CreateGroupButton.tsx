import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CreateGroupButton: React.FC = () => {
  const handleCreateGroup = () => {
    console.log("그룹 생성");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
      <Text style={styles.buttonText}>+ 새 스터디 그룹 만들기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CreateGroupButton;
