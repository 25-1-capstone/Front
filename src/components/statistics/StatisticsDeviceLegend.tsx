// @ts-nocheck
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatisticsDeviceLegendProps {
  deviceColors: string[];
  devicePercents: number[];
  deviceNames: string[];
}

const StatisticsDeviceLegend: React.FC<StatisticsDeviceLegendProps> = ({
  deviceColors,
  devicePercents,
  deviceNames,
}) => (
  <View style={styles.legendRow}>
    {deviceColors.map((color: string, idx: number) => (
      <View key={idx} style={styles.legendItem}>
        <View style={[styles.colorBox, { backgroundColor: color }]} />
        <Text style={styles.percent}>{devicePercents[idx]}%</Text>
        <Text style={styles.deviceName}>{deviceNames[idx]}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 6,
  },
  percent: {
    fontWeight: "bold",
    color: "#4CAF50",
    marginRight: 4,
  },
  deviceName: {
    color: "#888",
    fontSize: 13,
  },
});

export default StatisticsDeviceLegend;
