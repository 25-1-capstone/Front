import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/planner/plannerStyles";
import CustomWheelPicker from "../common/CustomWheelPicker";
import DescriptionInput from "./DescriptionInput";
import ModalHeader from "./ModalHeader";
import DateTimeRow from "./DateTimeRow";
import RepeatOptionSelector from "./RepeatOptionSelector";
import AlarmOptionSelector from "./AlarmOptionSelector";
import axios from "axios";

interface PlannerEventModalProps {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
  onDatePress: () => void;
  isDatePickerVisible: boolean;
  onDatePickerClose: () => void;
  onDaySelect: (day: { dateString: string }) => void;
}

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function PlannerEventModal({
  visible,
  onClose,
  selectedDate,
  onDatePress,
  isDatePickerVisible,
  onDatePickerClose,
  onDaySelect,
}: PlannerEventModalProps) {
  // 날짜 포맷 함수
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = days[date.getDay()];
    return `${month}월 ${day}일 ${weekday}요일`;
  }

  // 시간 선택 상태 및 옵션
  const meridiemOptions = ["오전", "오후"];
  const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minuteOptions = Array.from(
    { length: 12 },
    (_, i) => (i * 5).toString().padStart(2, "0") + "분"
  );

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [startMeridiem, setStartMeridiem] = useState("오후");
  const [startHour, setStartHour] = useState("5");
  const [startMinute, setStartMinute] = useState("00분");
  const [endMeridiem, setEndMeridiem] = useState("오후");
  const [endHour, setEndHour] = useState("6");
  const [endMinute, setEndMinute] = useState("00분");

  function formatTime(hour: string, minute: string, meridiem: string) {
    return `${meridiem} ${hour}시 ${minute}`;
  }

  // 각 날짜/시간란별 달력 표시 상태
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);

  const [showRepeatOptions, setShowRepeatOptions] = useState(false);
  const [repeatOption, setRepeatOption] = useState("반복 안함");

  const [showAlarmOptions, setShowAlarmOptions] = useState(false);
  const [alarmOption, setAlarmOption] = useState("없음");

  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState("");

  const [title, setTitle] = useState("");

  // 시간/날짜를 ISO 포맷으로 변환하는 함수 (타임존 오프셋 보정)
  function toISOStringLocal(
    dateStr: string,
    hour: string,
    minute: string,
    meridiem: string
  ) {
    let h = parseInt(hour, 10);
    if (meridiem === "오후" && h !== 12) h += 12;
    if (meridiem === "오전" && h === 12) h = 0;
    const m = parseInt(minute.replace("분", ""), 10);
    // "YYYY-MM-DDTHH:mm:00" 형태로 문자열 생성
    const dateTimeStr = `${dateStr}T${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:00`;
    // Date 객체 생성 (로컬 시간)
    const date = new Date(dateTimeStr);
    // 타임존 오프셋(분)을 ms로 변환해서 더함
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - tzOffset)
      .toISOString()
      .slice(0, 19);
    // 'YYYY-MM-DDTHH:mm:ss' 형태로 반환 (Z 없음)
    return localISOTime;
  }

  // 저장 함수
  const handleSave = async () => {
    try {
      const startDateISO = toISOStringLocal(
        startDate,
        startHour,
        startMinute,
        startMeridiem
      );
      const endDateISO = toISOStringLocal(
        endDate,
        endHour,
        endMinute,
        endMeridiem
      );
      const repeatType =
        repeatOption === "반복 안함" ? "반복 없음" : repeatOption;
      const notification = alarmOption === "없음" ? 0 : 1; // 필요시 상세 매핑
      const payload = {
        title,
        description,
        startDate: startDateISO,
        endDate: endDateISO,
        repeatType,
        notification,
      };
      console.log(payload);
      await axios.post(`${BACKEND_URL}/schedule`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      alert(startDateISO);
      alert(endDateISO);
      onClose();
    } catch (e) {
      alert("일정 저장에 실패했습니다.");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainerSheet}>
        {/* 상단 취소/저장 */}
        <ModalHeader onClose={onClose} onSave={handleSave} />
        {/* 제목 입력 */}
        <TextInput
          style={styles.modalTitleInput}
          placeholder="제목 추가"
          placeholderTextColor="#bbb"
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.modalDivider} />
        {/* 시작 날짜/시간 */}
        <DateTimeRow
          date={formatDate(startDate)}
          time={formatTime(startHour, startMinute, startMeridiem)}
          onDatePress={() => setShowStartCalendar((v) => !v)}
          onTimePress={() => setShowStartTimePicker((v) => !v)}
        />
        {showStartCalendar && (
          <View style={styles.calendarPickerContainer}>
            <Calendar
              current={startDate}
              onDayPress={(day) => {
                setStartDate(day.dateString);
                setShowStartCalendar(false);
              }}
              markedDates={{
                [startDate]: { selected: true, selectedColor: "#4CAF50" },
              }}
              theme={{
                todayTextColor: "#4CAF50",
                selectedDayBackgroundColor: "#4CAF50",
                arrowColor: "#4CAF50",
                textDayFontSize: 13,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 13,
              }}
              enableSwipeMonths={true}
              hideExtraDays={false}
              firstDay={0}
            />
          </View>
        )}
        {showStartTimePicker && (
          <View style={styles.calendarPickerContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F5F5F5",
              }}
            >
              <CustomWheelPicker
                options={meridiemOptions}
                value={startMeridiem}
                onChange={setStartMeridiem}
                delayMs={300}
              />
              <CustomWheelPicker
                options={hourOptions}
                value={startHour}
                onChange={setStartHour}
              />
              <CustomWheelPicker
                options={minuteOptions}
                value={startMinute}
                onChange={setStartMinute}
              />
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: ITEM_HEIGHT * 2,
                  left: 0,
                  right: 0,
                  height: ITEM_HEIGHT,
                  borderRadius: 8,
                  backgroundColor: "rgba(76,175,80,0.08)",
                }}
              />
            </View>
          </View>
        )}
        {/* 종료 날짜/시간 */}
        <DateTimeRow
          date={formatDate(endDate)}
          time={formatTime(endHour, endMinute, endMeridiem)}
          onDatePress={() => setShowEndCalendar((v) => !v)}
          onTimePress={() => setShowEndTimePicker((v) => !v)}
        />
        {showEndCalendar && (
          <View style={styles.calendarPickerContainer}>
            <Calendar
              current={endDate}
              onDayPress={(day) => {
                setEndDate(day.dateString);
                setShowEndCalendar(false);
              }}
              markedDates={{
                [endDate]: { selected: true, selectedColor: "#4CAF50" },
              }}
              theme={{
                todayTextColor: "#4CAF50",
                selectedDayBackgroundColor: "#4CAF50",
                arrowColor: "#4CAF50",
                textDayFontSize: 13,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 13,
              }}
              enableSwipeMonths={true}
              hideExtraDays={false}
              firstDay={0}
            />
          </View>
        )}
        {showEndTimePicker && (
          <View style={styles.calendarPickerContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomWheelPicker
                options={meridiemOptions}
                value={endMeridiem}
                onChange={setEndMeridiem}
                delayMs={300}
              />
              <CustomWheelPicker
                options={hourOptions}
                value={endHour}
                onChange={setEndHour}
              />
              <CustomWheelPicker
                options={minuteOptions}
                value={endMinute}
                onChange={setEndMinute}
              />
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: ITEM_HEIGHT * 2,
                  left: 0,
                  right: 0,
                  height: ITEM_HEIGHT,
                  borderRadius: 8,
                  backgroundColor: "rgba(76,175,80,0.08)",
                }}
              />
            </View>
          </View>
        )}
        <View style={{ paddingTop: 20 }} />
        <View style={styles.modalDivider} />
        {/* 반복 옵션 */}
        <RepeatOptionSelector
          repeatOption={repeatOption}
          setRepeatOption={setRepeatOption}
          showRepeatOptions={showRepeatOptions}
          setShowRepeatOptions={setShowRepeatOptions}
        />
        <View style={styles.modalDivider} />
        {/* 알림 옵션 */}
        <AlarmOptionSelector
          alarmOption={alarmOption}
          setAlarmOption={setAlarmOption}
          showAlarmOptions={showAlarmOptions}
          setShowAlarmOptions={setShowAlarmOptions}
        />
        <View style={styles.modalDivider} />
        {/* 설명 추가 */}
        <DescriptionInput value={description} onChangeText={setDescription} />
      </View>
    </Modal>
  );
}
