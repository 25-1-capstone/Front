import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Pressable,
  Text,
  Modal,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/planner/plannerStyles";
import { StyleSheet } from "react-native";

interface RepeatOptionSelectorProps {
  repeatOption: string;
  setRepeatOption: (opt: string) => void;
  showRepeatOptions: boolean;
  setShowRepeatOptions: (v: boolean) => void;
}

const options = ["반복 안함", "매일", "매주", "매월", "매년"];

export default function RepeatOptionSelector({
  repeatOption,
  setRepeatOption,
  showRepeatOptions,
  setShowRepeatOptions,
}: RepeatOptionSelectorProps) {
  const rowRef = useRef<View>(null);
  const [rowWindowLayout, setRowWindowLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // 버튼 클릭 시 전체 화면 기준 좌표 측정
  const handleOpenModal = () => {
    if (
      rowRef.current &&
      typeof rowRef.current.measureInWindow === "function"
    ) {
      rowRef.current.measureInWindow((x, y, width, height) => {
        setRowWindowLayout({ x, y, width, height });
        setShowRepeatOptions(true);
      });
    } else {
      setShowRepeatOptions(true);
    }
    console.log(rowWindowLayout);
  };

  // 모달 위치 계산 (아래에 띄우되, 화면을 넘기면 위에 띄움)
  const screenHeight = Dimensions.get("window").height;
  const modalHeight = options.length * 44 + 32; // option 1개당 44, padding 16*2
  const modalTop = rowWindowLayout.y + rowWindowLayout.height + 8;
  const isOverBottom = modalTop + modalHeight > screenHeight;
  const adjustedTop = isOverBottom
    ? rowWindowLayout.y - modalHeight - 8
    : modalTop;
  const adjustedLeft = rowWindowLayout.x;

  return (
    <>
      <View
        ref={rowRef as unknown as React.LegacyRef<View>}
        style={localStyles.modalRow}
      >
        <Ionicons
          name="refresh"
          size={24}
          color="#888"
          style={localStyles.iconMargin}
        />
        <TouchableOpacity
          style={localStyles.rowTouchable}
          onPress={handleOpenModal}
          activeOpacity={0.7}
        >
          <Text style={styles.modalRepeat}>{repeatOption}</Text>
          <View style={{ flex: 1 }} />
          <Ionicons name="chevron-expand-outline" size={24} color="#888" />
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 20 }} />
      <Modal
        visible={showRepeatOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRepeatOptions(false)}
        style={localStyles.modalLayout}
      >
        <View style={localStyles.modalBg}>
          <Pressable
            style={localStyles.modalBg}
            onPress={() => setShowRepeatOptions(false)}
          />
          <View style={localStyles.modalContent}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => {
                  setRepeatOption(opt);
                  setShowRepeatOptions(false);
                }}
                style={localStyles.optionTouchable}
              >
                <Text
                  style={[
                    localStyles.optionText,
                    repeatOption === opt && localStyles.optionTextSelected,
                  ]}
                >
                  {opt}
                </Text>
                {repeatOption === opt && (
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
    width: 220,
    left: 133,
    top: 233,
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
