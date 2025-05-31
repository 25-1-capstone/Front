import * as React from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StatisticsBarChart from "../../src/components/statistics/StatisticsBarChart";
import StatisticsTimeChart from "../../src/components/statistics/StatisticsTimeChart";
import Card from "../../src/components/common/Card";

const getTodayString = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${month}월 ${date}일`;
};

const HomeScreen: React.FC = () => {
  const router = useRouter();

  // 웹 환경에서 body minHeight를 동적으로 조정
  useEffect(() => {
    if (Platform.OS === "web") {
      const prev = document.body.style.minHeight;
      document.body.style.minHeight = "100vh";
      return () => {
        document.body.style.minHeight = prev;
      };
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* 상단 날짜 및 상태 */}
        <View style={styles.header}>
          <Text style={styles.date}>{getTodayString()}</Text>
          <Text style={styles.status}>휴대폰 감상</Text>
        </View>
        {/* 프로필/타이머 */}
        <View style={styles.profileTimerRow}>
          <View style={styles.profileCircle}>
            <Ionicons name="person-outline" size={64} color="#BDBDBD" />
          </View>
          <Text style={styles.timer}>00:00:04</Text>
        </View>
        {/* 일정 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>예정된 일정</Text>
          <Card
            title="모의고사 풀기"
            time="오후 5시 ~ 오후 7시"
            duration="1h 30m"
            progress={0.6}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>진행 중인 일정</Text>
          <Card
            title="영단어 공부"
            time="오후 8시 ~ 오후 9시"
            duration="30m"
            progress={0.8}
            active
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>완료된 일정</Text>
          <Card
            title="물리 복습"
            time="오후 10시 30분 ~ 오후 11시 15분"
            duration="20m"
            progress={0.2}
          />
        </View>
        {/* 플래너 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>플래너</Text>
          <TouchableOpacity
            style={styles.plannerBtn}
            onPress={() => router.push("/planner")}
          >
            <Text style={styles.plannerBtnText}>플래너 편집하기</Text>
          </TouchableOpacity>
        </View>
        {/* 일간 통계 요약 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>일간 통계</Text>
          <View
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                marginBottom: 8,
                color: "#222",
              }}
            >
              {getTodayString()}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "400", marginBottom: 12 }}>
              8시간 5분
            </Text>
            {/* 주간 막대그래프: 토요일만 stacked */}
            <StatisticsBarChart
              data={[
                { day: "일", values: [2, 1, 1], total: 5 },
                { day: "월", values: [2, 1, 1], total: 4 },
                { day: "화", values: [2, 1, 1], total: 8 },
                { day: "수", values: [2, 1, 1], total: 7 },
                { day: "목", values: [2, 1, 1], total: 6 },
                { day: "금", values: [2, 1, 1], total: 6 },
                { day: "토", values: [2, 1, 1], total: 6 },
              ]}
              deviceColors={["#2196F3", "#FFC107", "#4CAF50"]}
              yLabels={["8시간", "4시간", "0"]}
              height={56}
              stacked={false}
              labelKey="day"
              valueKey="values"
              barWidth={18}
              highlightDay="토"
            />
            {/* 시간대별 막대그래프 */}
            <StatisticsTimeChart
              data={Array.from({ length: 24 }, (_, i) => ({
                label: [
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
                ][i],
                values: [
                  Math.random() * 0.5 + 0.1,
                  Math.random() * 0.5 + 0.1,
                  Math.random() * 0.5 + 0.1,
                ],
              }))}
              deviceColors={["#2196F3", "#FFC107", "#4CAF50"]}
              yLabels={["60분", "30분", "0"]}
              height={40}
              barWidth={6}
            />
            {/* 디바이스별 시간 */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons
                  name="book"
                  size={18}
                  color="#2196F3"
                  style={{ marginBottom: 2 }}
                />
                <Text style={{ fontSize: 12, color: "#222", marginBottom: 2 }}>
                  교재/책
                </Text>
                <Text style={{ fontSize: 12, color: "#888", marginBottom: 2 }}>
                  4시간 15분
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons
                  name="laptop"
                  size={18}
                  color="#FFC107"
                  style={{ marginBottom: 2 }}
                />
                <Text style={{ fontSize: 12, color: "#222", marginBottom: 2 }}>
                  PC/태블릿
                </Text>
                <Text style={{ fontSize: 12, color: "#888", marginBottom: 2 }}>
                  2시간 1분
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons
                  name="phone-portrait"
                  size={18}
                  color="#4CAF50"
                  style={{ marginBottom: 2 }}
                />
                <Text style={{ fontSize: 12, color: "#222", marginBottom: 2 }}>
                  스마트폰
                </Text>
                <Text style={{ fontSize: 12, color: "#888", marginBottom: 2 }}>
                  1시간 46분
                </Text>
              </View>
            </View>
          </View>
          {/* 목표 달성률 */}
          <View
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 16, marginBottom: 8, color: "#222" }}>
              일간 목표 달성률
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 12,
                  backgroundColor: "#E6F4EA",
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
                <View
                  style={{
                    height: 12,
                    backgroundColor: "#4CAF50",
                    borderRadius: 8,
                    width: "88%",
                  }}
                />
              </View>
              <Text style={{ fontSize: 16, color: "#222" }}>88%</Text>
            </View>
          </View>
        </View>
        {/* 통계 요약 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주간 통계</Text>
          <View
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 16, marginBottom: 8, color: "#222" }}>
              일일 평균
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "400", marginBottom: 12 }}>
              6시간 2분
            </Text>
            {/* 막대그래프 */}
            <StatisticsBarChart
              data={[
                { day: "일", values: [2, 1, 1], total: 5 },
                { day: "월", values: [2, 1, 1], total: 4 },
                { day: "화", values: [2, 1, 1], total: 8 },
                { day: "수", values: [2, 1, 1], total: 7 },
                { day: "목", values: [2, 1, 1], total: 6 },
                { day: "금", values: [2, 1, 1], total: 6 },
                { day: "토", values: [2, 1, 1], total: 6 },
              ]}
              deviceColors={["#2196F3", "#FFC107", "#4CAF50"]}
              yLabels={["8시간", "4시간", "0"]}
              height={72}
              stacked={true}
              labelKey="day"
              valueKey="values"
              barWidth={18}
            />
            {/* 디바이스별 시간 */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons
                  name="book"
                  size={20}
                  color="#2196F3"
                  style={{ marginBottom: 2 }}
                />
                <Text style={{ fontSize: 13, color: "#222", marginBottom: 2 }}>
                  교재/책
                </Text>
                <Text style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>
                  10시간 15분
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons
                  name="laptop"
                  size={20}
                  color="#FFC107"
                  style={{ marginBottom: 2 }}
                />
                <Text style={{ fontSize: 13, color: "#222", marginBottom: 2 }}>
                  PC/태블릿
                </Text>
                <Text style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>
                  11시간 1분
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons
                  name="phone-portrait"
                  size={20}
                  color="#4CAF50"
                  style={{ marginBottom: 2 }}
                />
                <Text style={{ fontSize: 13, color: "#222", marginBottom: 2 }}>
                  스마트폰
                </Text>
                <Text style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>
                  9시간 52분
                </Text>
              </View>
            </View>
          </View>
          {/* 목표 달성률 */}
          <View
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 16, marginBottom: 8, color: "#222" }}>
              주간 목표 달성률 평균
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 12,
                  backgroundColor: "#E6F4EA",
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
                <View
                  style={{
                    height: 12,
                    backgroundColor: "#4CAF50",
                    borderRadius: 8,
                    width: "88%",
                  }}
                />
              </View>
              <Text style={{ fontSize: 16, color: "#222" }}>88%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    width: "90%",
    left: "5%",
  },
  date: {
    fontSize: 24,
    fontWeight: "500",
  },
  status: {
    fontSize: 24,
    fontWeight: "500",
  },
  profileTimerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    left: "5%",
    marginBottom: 40,
  },
  profileCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    letterSpacing: 2,
    marginLeft: 10,
  },
  section: {
    width: "90%",
    left: "5%",
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  plannerBtn: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  plannerBtnText: {
    fontSize: 16,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E0DF",
    paddingVertical: 8,
    marginTop: 10,
  },
  tabItem: {
    alignItems: "center",
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    color: "#BDBDBD",
    marginTop: 2,
  },
});

export default HomeScreen;
