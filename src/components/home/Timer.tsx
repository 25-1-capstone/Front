import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ICategory, StudyStatus } from "../../types/common";

interface ITimerProps {
  status: StudyStatus;
  category: ICategory | null;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

const Timer: React.FC<ITimerProps> = ({
  status,
  category,
  onPause,
  onResume,
  onStop,
}) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (status === StudyStatus.STUDYING) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [status]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.category}>
        {category ? category.name : "카테고리를 선택하세요"}
      </Text>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
      <View style={styles.buttonContainer}>
        {status === StudyStatus.STUDYING && (
          <TouchableOpacity style={styles.button} onPress={onPause}>
            <Text style={styles.buttonText}>일시정지</Text>
          </TouchableOpacity>
        )}
        {status === StudyStatus.PAUSED && (
          <TouchableOpacity style={styles.button} onPress={onResume}>
            <Text style={styles.buttonText}>계속하기</Text>
          </TouchableOpacity>
        )}
        {status !== StudyStatus.IDLE && (
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={onStop}
          >
            <Text style={styles.buttonText}>종료</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 2,
    alignItems: "center",
  },
  category: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  stopButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Timer;
