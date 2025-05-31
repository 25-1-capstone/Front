import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/planner/plannerStyles";

const days = ["일", "월", "화", "수", "목", "금", "토"];
const dates = [27, 28, 29, 30, 1, 2, 3];

const PlannerDaysRow = () => {
  return (
    <View style={styles.daysRow}>
      {dates.map((date, idx) => (
        <View key={idx} style={styles.dayCol}>
          <Text style={styles.dayText}>{days[idx]}</Text>
          <Text style={idx === 2 ? styles.todayText : styles.dateText}>
            {date}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default PlannerDaysRow;
