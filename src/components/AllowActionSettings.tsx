import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const AllowActionSettings = () => {
  const [phone, setPhone] = useState(false);
  const [book, setBook] = useState(true);
  const [pc, setPc] = useState(false);
  const router = useRouter();

  const handleProfileSetting = () => {
    // 프로필 설정 완료 후 프로필 설정 페이지로 이동
    router.push("/profile-setting");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>허용할 동작</Text>
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>핸드폰</Text>
        <Switch value={phone} onValueChange={setPhone} />
      </View>
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>책 읽기</Text>
        <Switch value={book} onValueChange={setBook} />
      </View>
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>PC 보기</Text>
        <Switch value={pc} onValueChange={setPc} />
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.button} onPress={handleProfileSetting}>
        <Text style={styles.buttonText}>프로필 설정하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#E5E0DF",
    borderRadius: 5,
    margin: 2,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AllowActionSettings;
