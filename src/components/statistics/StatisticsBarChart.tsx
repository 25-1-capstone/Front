import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BarChartProps {
  data: any[];
  deviceColors: string[];
  yLabels: string[];
  height?: number;
  stacked?: boolean;
  labelKey?: string;
  valueKey?: string;
  barWidth?: number;
  highlightDay?: string | string[];
}

const StatisticsBarChart: React.FC<BarChartProps> = ({
  data,
  deviceColors,
  yLabels,
  height = 106,
  stacked = true,
  labelKey = "day",
  valueKey = "values",
  barWidth = 18,
  highlightDay,
}: BarChartProps) => {
  const maxHour = 8; // 8시간 기준만 사용
  // highlightDay를 배열로 변환
  const highlightDays =
    highlightDay === undefined
      ? []
      : Array.isArray(highlightDay)
      ? highlightDay
      : [highlightDay];
  return (
    <View style={styles.barChartRow}>
      {data.map((item: any, idx: number) => {
        // 해당 요일만 스택형, 나머지는 단일형
        const isStacked =
          highlightDays.length === 0
            ? stacked
            : highlightDays.includes(item[labelKey])
            ? true
            : false;
        const totalHour =
          item.total ??
          (isStacked
            ? item[valueKey].reduce((a: number, b: number) => a + b, 0)
            : item[valueKey]);
        const barHeight = (totalHour / maxHour) * height;
        return (
          <View key={item[labelKey] || idx} style={styles.barCol}>
            <View
              style={[styles.barBg, { width: barWidth, height: barHeight }]}
            >
              {isStacked ? (
                item[valueKey].map((v: number, i: number) => (
                  <View
                    key={i}
                    style={{
                      height: (v / maxHour) * height,
                      backgroundColor: deviceColors[i],
                      width: barWidth,
                    }}
                  />
                ))
              ) : (
                <View
                  style={{
                    height: (item[valueKey] / maxHour) * height,
                    backgroundColor: deviceColors[0],
                    width: barWidth,
                    position: "absolute",
                    bottom: 0,
                  }}
                />
              )}
            </View>
            <Text style={styles.barLabel}>{item[labelKey]}</Text>
          </View>
        );
      })}
      {/* y축 라벨 */}
      <View style={[styles.yAxis, { height: height + 20 }]}>
        {yLabels.map((l: string, i: number) => (
          <Text key={i} style={styles.yLabel}>
            {l}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barChartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  barCol: {
    alignItems: "center",
    marginLeft: 7,
    marginHorizontal: 14,
  },
  barBg: {
    backgroundColor: "#e0e0e0",
    justifyContent: "flex-end",
    marginBottom: 2,
    overflow: "hidden",
  },
  barLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  yAxis: {
    justifyContent: "space-between",
    marginLeft: 10,
    paddingBottom: 20,
  },
  yLabel: {
    fontSize: 12,
    color: "#bbb",
  },
});

export default StatisticsBarChart;
