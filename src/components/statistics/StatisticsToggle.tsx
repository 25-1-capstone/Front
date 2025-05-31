// @ts-nocheck
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface StatisticsToggleProps {
  tab: string;
  setTab: (tab: string) => void;
}

const StatisticsToggle: React.FC<StatisticsToggleProps> = ({ tab, setTab }) => (
  <View style={styles.toggleRow}>
    <TouchableOpacity
      style={[styles.toggleBtn, tab === "주" && styles.toggleBtnActive]}
      onPress={() => setTab("주")}
    >
      <Text
        style={[styles.toggleText, tab === "주" && styles.toggleTextActive]}
      >
        주
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.toggleBtn, tab === "일" && styles.toggleBtnActive]}
      onPress={() => setTab("일")}
    >
      <Text
        style={[styles.toggleText, tab === "일" && styles.toggleTextActive]}
      >
        일
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#4CAF5080",
    borderRadius: 14,
    overflow: "hidden",
    width: "90%",
    left: "5%",
    height: 30,
    marginBottom: 20,
  },
  toggleBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 14,
  },
  toggleBtnActive: {
    backgroundColor: "#4CAF50",
  },
  toggleText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "400",
  },
  toggleTextActive: {
    color: "#fff",
    fontWeight: "400",
  },
});

export default StatisticsToggle;
