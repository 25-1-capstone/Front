import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/planner/plannerStyles";

const hours = [
  ...Array.from({ length: 12 }, (_, i) => `${i + 1} AM`),
  ...Array.from({ length: 11 }, (_, i) => `${i + 1} PM`),
];

const PlannerGrid = () => {
  return (
    <View style={styles.gridContainer}>
      {/* 시간 라벨 */}
      <View style={styles.timeCol}>
        {hours.map((h, i) => (
          <Text key={i} style={styles.timeText}>
            {h}
          </Text>
        ))}
      </View>
      {/* 그리드와 일정 */}
      <View style={styles.gridContent}>
        {/* 수학 일정 블록 (예시: 2AM~3AM, 화요일) */}
        <View style={[styles.eventBlock, { top: 40, left: 48 }]}>
          <Text style={styles.eventText}>수학</Text>
        </View>
        {/* 그리드 라인 */}
        {[...Array(23)].map((_, row) => (
          <View key={row} style={[styles.gridRow, { top: 40 * row }]} />
        ))}
        {[...Array(7)].map((_, col) => (
          <View key={col} style={[styles.gridCol, { left: 48 * col }]} />
        ))}
      </View>
    </View>
  );
};

export default PlannerGrid;
