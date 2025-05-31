import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface CardProps {
  title: string;
  time: string;
  duration: string;
  progress?: number; // 0~1
  active?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  time,
  duration,
  progress = 0,
  active = false,
}: CardProps) => {
  return (
    <View style={[styles.card, active && styles.cardActive]}>
      <View style={styles.cardRow}>
        <Text style={[styles.cardTitle, active && { color: "#fff" }]}>
          {title}
        </Text>
        <Text style={[styles.cardTime, active && { color: "#fff" }]}>
          {time}
        </Text>
      </View>
      <View style={active ? styles.progressBarBgActive : styles.progressBarBg}>
        <View
          style={[
            active ? styles.progressBarActive : styles.progressBar,
            { width: `${Math.round(progress * 100)}%` },
          ]}
        />
      </View>
      <Text style={[styles.cardDuration, active && { color: "#fff" }]}>
        {duration}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 6,
  },
  cardActive: {
    backgroundColor: "#4CAF50",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    color: "#222",
  },
  cardTime: {
    fontSize: 16,
    color: "#222",
  },
  cardDuration: {
    fontSize: 16,
    color: "#222",
    marginTop: 2,
    textAlign: "right",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginVertical: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  progressBarBgActive: {
    height: 8,
    backgroundColor: "#388E3C",
    borderRadius: 4,
    marginVertical: 4,
    overflow: "hidden",
  },
  progressBarActive: {
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
});

export default Card;
