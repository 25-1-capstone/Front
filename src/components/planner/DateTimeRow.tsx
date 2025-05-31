import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../styles/planner/plannerStyles";

interface DateTimeRowProps {
  date: string;
  time: string;
  onDatePress: () => void;
  onTimePress: () => void;
}

export default function DateTimeRow({
  date,
  time,
  onDatePress,
  onTimePress,
}: DateTimeRowProps) {
  return (
    <>
      <View style={{ paddingTop: 20 }} />
      <View style={styles.modalRow}>
        <TouchableOpacity onPress={onDatePress} style={{ flex: 1 }}>
          <Text style={styles.modalDate}>{date}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onTimePress}>
          <Text style={styles.modalTime}>{time}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
