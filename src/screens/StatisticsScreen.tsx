import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import CategoryAnalysis from "../components/statistics/CategoryAnalysis";
import { Period } from "../types/common";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Statistics">;

const StatisticsScreen: React.FC<Props> = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("week");

  const periods: Period[] = ["day", "week", "month"];

  const periodLabels: Record<Period, string> = {
    day: "일간",
    week: "주간",
    month: "월간",
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.selectedPeriod,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.selectedPeriodText,
                ]}
              >
                {periodLabels[period]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <CategoryAnalysis period={selectedPeriod} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  periodSelector: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  selectedPeriod: {
    backgroundColor: "#4CAF50",
  },
  periodButtonText: {
    fontSize: 16,
    color: "#666",
  },
  selectedPeriodText: {
    color: "#fff",
    fontWeight: "500",
  },
});

export default StatisticsScreen;
