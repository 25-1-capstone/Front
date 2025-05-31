import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const slides = [
  {
    id: 1,
    title: "자동 타이머로 집중 시간 측정",
    description:
      "홈 화면에서 자동 타이머 기능을 통해 별도의 조작 없이 사용자의 집중 시간을 정확하게 측정할 수 있습니다.",
    icon: "timer-outline",
  },
  {
    id: 2,
    title: "상태 표시창으로 실시간 상태 확인",
    description:
      "홈 화면의 상태 표시창에서 카메라가 인식한 사용자의 현재 상태(집중/이탈 등)를 실시간으로 확인할 수 있습니다.",
    icon: "eye-outline",
  },
  {
    id: 3,
    title: "허용 동작 설정",
    description:
      "허용 동작 설정을 통해 카메라가 사용자가 어떤 매체(책, 태블릿, 노트북 등)를 주시할 때 집중 중으로 간주할지 직접 선택할 수 있습니다.",
    icon: "settings-outline",
  },
  {
    id: 4,
    title: "학습 통계 확인",
    description:
      "통계 페이지에서 나의 학습 시간, 집중도 등 다양한 학습 통계를 한눈에 확인할 수 있습니다.",
    icon: "stats-chart-outline",
  },
  {
    id: 5,
    title: "플래너로 일정 관리",
    description:
      "플래너 페이지에서 나만의 학습 일정을 생성하고, 체계적으로 관리할 수 있습니다.",
    icon: "calendar-outline",
  },
  {
    id: 6,
    title: "그룹 기능으로 함께 성장",
    description:
      "그룹 기능을 통해 그룹원들과 학습 시간과 상태를 공유하며 서로 동기부여를 받을 수 있습니다.",
    icon: "people-outline",
  },
];

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      // 온보딩 완료 후 허용동작 설정 페이지로 이동
      router.push("/allow-action-settings");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Ionicons
          name={slides[currentSlideIndex].icon}
          size={90}
          color="#4CAF50"
          style={styles.icon}
        />
        <Text style={styles.title}>{slides[currentSlideIndex].title}</Text>
        <Text style={styles.description}>
          {slides[currentSlideIndex].description}
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <React.Fragment key={index}>
              <View
                style={[
                  styles.indicator,
                  currentSlideIndex === index && styles.activeIndicator,
                ]}
              />
            </React.Fragment>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentSlideIndex === slides.length - 1
              ? "허용동작 설정하기"
              : "다음"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: { fontSize: 16, textAlign: "center", color: "#666" },
  footer: { padding: 20 },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  activeIndicator: { backgroundColor: "#4CAF50" },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default OnboardingScreen;
