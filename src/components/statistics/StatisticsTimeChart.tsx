import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TimeChartProps {
  data: { label: string; values: number[] }[];
  deviceColors: string[];
  yLabels?: string[];
  height?: number;
  barWidth?: number;
}

const chunkArray = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const StatisticsTimeChart: React.FC<TimeChartProps> = ({
  data,
  deviceColors,
  yLabels = ["60분", "30분", "0"],
  height = 60,
  barWidth = 16,
}: {
  data: { label: string; values: number[] }[];
  deviceColors: string[];
  yLabels?: string[];
  height?: number;
  barWidth?: number;
}) => {
  // 최대값(분 단위) 기준. 예시로 1.5시간(90분) 기준
  const maxMinute = 1.5;

  const showLabels = ["오전 12시", "오전 6시", "오후 12시", "오후 6시"];
  const groupedData = chunkArray(data, 6);

  return (
    <>
      <View style={styles.row}>
        {groupedData.map((group, groupIdx) => (
          <React.Fragment key={`group-${groupIdx}`}>
            <View style={styles.barLabel}>
              <View style={styles.barGroup}>
                {group.map((item, idx) => (
                  <View key={item.label || idx} style={styles.col}>
                    <View style={[styles.barBg, { height, width: barWidth }]}>
                      {item.values.map((v: number, i: number) => (
                        <View
                          key={i}
                          style={{
                            height: (v / maxMinute) * height,
                            backgroundColor: deviceColors[i],
                            width: barWidth,
                          }}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
              <Text style={styles.showLabel}>{showLabels[groupIdx]}</Text>
            </View>
          </React.Fragment>
        ))}
        {/* y축 라벨 */}
        <View style={[styles.yAxis, { height: height }]}>
          {yLabels.map((l) => (
            <Text key={l} style={styles.yLabel}>
              {l}
            </Text>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  col: {
    alignItems: "center",
    marginHorizontal: 2,
  },
  barBg: {
    backgroundColor: "#e0e0e0",
    justifyContent: "flex-end",
    marginBottom: 2,
    overflow: "hidden",
  },
  barLabel: {
    flexDirection: "column",
  },
  barGroup: {
    flexDirection: "row",
    marginHorizontal: 2,
    paddingHorizontal: 2,
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  showLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    paddingLeft: 4,
  },
  yAxis: {
    justifyContent: "space-between",
    marginLeft: 10,
    marginBottom: 20,
  },
  yLabel: {
    fontSize: 12,
    color: "#bbb",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingBottom: 20,
  },
});

export default StatisticsTimeChart;
