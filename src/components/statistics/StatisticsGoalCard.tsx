// @ts-nocheck
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatisticsGoalCardProps {
  percent: number;
  goal: string;
  achieved: number;
  total: number;
  color: string;
}

const StatisticsGoalCard: React.FC<StatisticsGoalCardProps> = ({
  percent,
  goal,
  achieved,
  total,
  color,
}) => (
  <View style={styles.card}>
    <Text style={styles.goalTitle}>{goal}</Text>
    <View style={styles.percentRow}>
      <Text style={[styles.percent, { color }]}>{percent}%</Text>
      <Text
        style={styles.goalDesc}
      >{`(목표 ${total}일 중 ${achieved}일 달성)`}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  goalTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    color: "#222",
  },
  percentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  percent: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 8,
  },
  goalDesc: {
    color: "#888",
    fontSize: 13,
  },
});

export default StatisticsGoalCard;
