import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AllowedActionsScreen: React.FC = () => {
  const router = useRouter();
  const [phone, setPhone] = useState(false);
  const [book, setBook] = useState(true);
  const [pc, setPc] = useState(false);

  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>허용할 동작</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* 스위치 리스트 */}
      <View style={styles.switchList}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>핸드폰</Text>
          <Switch value={phone} onValueChange={setPhone} />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>책 읽기</Text>
          <Switch value={book} onValueChange={setBook} />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>PC 보기</Text>
          <Switch value={pc} onValueChange={setPc} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    width: "90%",
    left: "5%",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  switchList: {
    left: "5%",
    width: "90%",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 18,
  },
});

export default AllowedActionsScreen;
