import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Pressable,
  Text,
  Dimensions,
  Modal,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/planner/plannerStyles";
import { StyleSheet } from "react-native";

interface AlarmOptionSelectorProps {
  alarmOption: string;
  setAlarmOption: (opt: string) => void;
  showAlarmOptions: boolean;
  setShowAlarmOptions: (v: boolean) => void;
}

const options = ["없음", "5분 전", "10분 전", "30분 전", "1시간 전"];

export default function AlarmOptionSelector({
  alarmOption,
  setAlarmOption,
  showAlarmOptions,
  setShowAlarmOptions,
}: AlarmOptionSelectorProps) {
  return (
    <>
      <View style={localStyles.modalRow}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#888"
          style={localStyles.iconMargin}
        />
        <TouchableOpacity
          style={localStyles.rowTouchable}
          onPress={() => setShowAlarmOptions(true)}
          activeOpacity={0.7}
        >
          <Text
            style={
              alarmOption === "없음" ? styles.modalDisabled : styles.modalRepeat
            }
          >
            {alarmOption}
          </Text>
          <View style={localStyles.flex1} />
          <Ionicons name="chevron-expand-outline" size={24} color="#888" />
        </TouchableOpacity>
      </View>
      <View style={localStyles.paddingTop20} />
      <Modal
        visible={showAlarmOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAlarmOptions(false)}
        style={localStyles.modalLayout}
      >
        <View style={localStyles.modalBg}>
          <Pressable
            style={localStyles.modalBg}
            onPress={() => setShowAlarmOptions(false)}
          />
          <View style={localStyles.modalContent}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => {
                  setAlarmOption(opt);
                  setShowAlarmOptions(false);
                }}
                style={localStyles.optionTouchable}
              >
                <Text
                  style={[
                    localStyles.optionText,
                    alarmOption === opt && localStyles.optionTextSelected,
                  ]}
                >
                  {opt}
                </Text>
                {alarmOption === opt && (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color="#4CAF50"
                    style={localStyles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const localStyles = StyleSheet.create({
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    paddingTop: 20,
    marginLeft: 10,
    marginRight: 40,
  },
  iconMargin: {
    marginRight: 8,
  },
  rowTouchable: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  paddingTop20: {
    paddingTop: 20,
  },
  modalLayout: {
    flex: 1,
  },
  modalBg: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    minWidth: 220,
    left: 133,
    top: 277,
    position: "absolute",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
      },
    }),
  },
  optionTouchable: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    color: "#222",
    fontWeight: "normal",
    fontSize: 16,
  },
  optionTextSelected: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  checkIcon: {
    marginLeft: 8,
  },
});
