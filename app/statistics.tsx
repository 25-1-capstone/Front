// @ts-nocheck
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StatisticsBarChart from "../src/components/statistics/StatisticsBarChart";
import StatisticsToggle from "../src/components/statistics/StatisticsToggle";
import StatisticsDeviceLegend from "../src/components/statistics/StatisticsDeviceLegend";
import StatisticsGoalCard from "../src/components/statistics/StatisticsGoalCard";
import StatisticsTimeChart from "../src/components/statistics/StatisticsTimeChart";

const weekData = [
  { day: "일", values: [2, 1, 1], total: 5 },
  { day: "월", values: [2, 1, 1], total: 4 },
  { day: "화", values: [2, 1, 1], total: 8 },
  { day: "수", values: [2, 1, 1], total: 7 },
  { day: "목", values: [2, 1, 1], total: 6 },
  { day: "금", values: [2, 1, 1], total: 6 },
  { day: "토", values: [2, 1, 1], total: 6 },
];
const deviceColors = ["#2196F3", "#FFC107", "#4CAF50"];
const deviceLabels = ["교재/책", "PC/태블릿", "스마트폰"];
const deviceTimes = ["10시간 15분", "11시간 1분", "9시간 52분"];

const deviceTotals = [0, 0, 0];
weekData.forEach((day) => {
  day.values.forEach((v, i) => {
    deviceTotals[i] += v;
  });
});
const total = deviceTotals.reduce((a, b) => a + b, 0);
const devicePercents = deviceTotals.map((v) => Math.round((v / total) * 100));
const deviceNames = deviceLabels;

const achievement = 88;

const goalCards = [
  {
    percent: 88,
    goal: "주간 목표 달성률 평균",
    achieved: 6,
    total: 7,
    color: "#4CAF50",
  },
  {
    percent: 75,
    goal: "일간 목표 달성률",
    achieved: 3,
    total: 4,
    color: "#2196F3",
  },
];

const StatisticsScreen: React.FC = () => {
  const router = useRouter();
  const [tab, setTab] = useState("주");
  const [showAllowed, setShowAllowed] = useState(false);

  // 일간 데이터로 토요일 데이터 사용 (예시)
  const selectedDayIndex = 6; // 토요일 index
  const selectedDay = weekData[selectedDayIndex];
  const selectedDate = "5월 3일"; // 예시 날짜
  const selectedTotal = `${selectedDay.values.reduce((a, b) => a + b, 0)}시간`;
  const selectedDeviceTimes = selectedDay.values.map((v) => `${v}시간`);

  // 시간대별 데이터 예시 (1시간 단위, 24개, label을 오전/오후 12시, 6시 등으로)
  const hourLabels = [
    "오전 12시",
    "오전 1시",
    "오전 2시",
    "오전 3시",
    "오전 4시",
    "오전 5시",
    "오전 6시",
    "오전 7시",
    "오전 8시",
    "오전 9시",
    "오전 10시",
    "오전 11시",
    "오후 12시",
    "오후 1시",
    "오후 2시",
    "오후 3시",
    "오후 4시",
    "오후 5시",
    "오후 6시",
    "오후 7시",
    "오후 8시",
    "오후 9시",
    "오후 10시",
    "오후 11시",
  ];
  const timeChartData = Array.from({ length: 24 }, (_, i) => ({
    label: hourLabels[i],
    values: [
      Math.random() * 0.5 + 0.1, // 교재/책
      Math.random() * 0.5 + 0.1, // PC/태블릿
      Math.random() * 0.5 + 0.1, // 스마트폰
    ],
  }));

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>통계</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* 주/일 토글 */}
      <StatisticsToggle tab={tab} setTab={setTab} />
      {/* 주간/일간 조건부 렌더링 */}
      {tab === "주" ? (
        <>
          {/* 주간 평균 */}
          <Text style={styles.sectionTitle}>주간</Text>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>일일 평균</Text>
              <TouchableOpacity onPress={() => setShowAllowed((v) => !v)}>
                <Text
                  style={[
                    styles.cardAction,
                    showAllowed && styles.cardActionActive,
                  ]}
                >
                  허용한 동작만 보기
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.avgTime}>6시간 2분</Text>
            {/* 바 차트 */}
            <StatisticsBarChart
              data={weekData}
              deviceColors={deviceColors}
              yLabels={["8시간", "4시간", "0"]}
              height={106}
              stacked={true}
              labelKey="day"
              valueKey="values"
              barWidth={18}
            />
            {/* 디바이스별 시간 */}
            <View style={styles.deviceRow}>
              {deviceLabels.map((label, i) => (
                <View key={label} style={styles.deviceCol}>
                  <Ionicons
                    name={
                      i === 0 ? "book" : i === 1 ? "laptop" : "phone-portrait"
                    }
                    size={24}
                    color={deviceColors[i]}
                    style={{ marginBottom: 2 }}
                  />
                  <Text style={styles.deviceLabel}>{label}</Text>
                  <Text style={styles.deviceTime}>{deviceTimes[i]}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* 목표 달성률 */}
          <Text style={styles.sectionTitle}>목표 달성률</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>주간 목표 달성률 평균</Text>
            <View style={styles.progressBarBg}>
              <View
                style={[styles.progressBar, { width: `${achievement}%` }]}
              />
            </View>
            <Text style={styles.achievementText}>{achievement}%</Text>
          </View>
        </>
      ) : (
        <>
          {/* 일간 카드 */}
          <Text style={styles.sectionTitle}>일간</Text>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{selectedDate}</Text>
              <TouchableOpacity onPress={() => setShowAllowed((v) => !v)}>
                <Text
                  style={[
                    styles.cardAction,
                    showAllowed && styles.cardActionActive,
                  ]}
                >
                  허용한 동작만 보기
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.avgTime}>{selectedTotal}</Text>
            {/* 주간 막대그래프: 토요일만 stacked */}
            <StatisticsBarChart
              data={weekData}
              deviceColors={deviceColors}
              yLabels={["8시간", "4시간", "0"]}
              height={72}
              stacked={false}
              labelKey="day"
              valueKey="values"
              barWidth={16}
              highlightDay="토"
            />
            {/* 시간대별 막대그래프 */}
            <StatisticsTimeChart
              data={timeChartData}
              deviceColors={deviceColors}
              yLabels={["60분", "30분", "0"]}
              height={60}
              barWidth={7}
            />
            {/* 디바이스별 시간 */}
            <View style={styles.deviceRow}>
              {deviceLabels.map((label, i) => (
                <View key={label} style={styles.deviceCol}>
                  <Ionicons
                    name={
                      i === 0 ? "book" : i === 1 ? "laptop" : "phone-portrait"
                    }
                    size={20}
                    color={deviceColors[i]}
                    style={{ marginBottom: 2 }}
                  />
                  <Text style={styles.deviceLabel}>{label}</Text>
                  <Text style={styles.deviceTime}>
                    {selectedDeviceTimes[i]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {/* 목표 달성률 */}
          <Text style={styles.sectionTitle}>목표 달성률</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>일간 목표 달성률</Text>
            <View style={styles.progressBarRow}>
              <View style={styles.progressBarBg}>
                <View
                  style={[styles.progressBar, { width: `${achievement}%` }]}
                />
              </View>
              <Text style={styles.achievementText}>{achievement}%</Text>
            </View>
          </View>
        </>
      )}
      {/* 디바이스별 범례 */}
      {/*
      <StatisticsDeviceLegend
        deviceColors={deviceColors}
        devicePercents={devicePercents}
        deviceNames={deviceNames}
      />
      */}
      {/* 목표 달성률 카드 */}
      {/*
      {goalCards.map((card, idx) => (
        <StatisticsGoalCard
          key={idx}
          percent={card.percent}
          goal={card.goal}
          achieved={card.achieved}
          total={card.total}
          color={card.color}
        />
      ))}
      */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 44,
    paddingBottom: 20,
    width: "90%",
    left: "5%",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
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
  },
  toggleBtnActive: {
    borderRadius: 13,
    backgroundColor: "#4CAF50",
  },
  toggleText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
  },
  toggleTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    width: "90%",
    left: "5%",
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    left: "5%",
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: "400" },
  cardAction: { fontSize: 16, color: "#b4b4b4" },
  cardActionActive: { color: "#4CAF50", fontWeight: "bold" },
  avgTime: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 20,
  },
  barChartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
    marginTop: 8,
  },
  barCol: {
    alignItems: "center",
    marginHorizontal: 2,
  },
  barBg: {
    width: 16,
    height: 72,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
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
    alignItems: "flex-end",
    height: 72,
    marginLeft: 8,
  },
  yLabel: {
    fontSize: 12,
    color: "#bbb",
  },
  deviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  deviceCol: {
    alignItems: "center",
    flex: 1,
  },
  deviceLabel: {
    fontSize: 13,
    color: "#222",
    marginBottom: 2,
  },
  deviceTime: {
    fontSize: 13,
    color: "#888",
    marginBottom: 2,
  },
  progressBarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  progressBarBg: {
    flexDirection: "row",
    width: 260,
    height: 12,
    backgroundColor: "#E6F4EA",
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
  },
  achievementText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "bold",
  },
});

export default StatisticsScreen;
