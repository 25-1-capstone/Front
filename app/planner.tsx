import React, { useState } from "react";
import { View, TouchableWithoutFeedback, ScrollView } from "react-native";
import PlannerHeader from "../src/components/planner/PlannerHeader";
import PlannerDaysRow from "../src/components/planner/PlannerDaysRow";
import PlannerGrid from "../src/components/planner/PlannerGrid";
import Fab from "../src/components/common/Fab";
import PlannerEventModal from "../src/components/planner/PlannerEventModal";
import styles from "../src/styles/planner/plannerStyles";

const today = new Date();
const todayStr = today.toISOString().slice(0, 10);

const PlannerScreen: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(todayStr);

  // +버튼 이외 영역 클릭 시 +버튼으로 복귀
  const handleBackgroundPress = () => {
    if (isEdit) setIsEdit(false);
  };

  // 플로팅 버튼 클릭 시 모달 오픈
  const handleFabPress = () => {
    setIsModalVisible(true);
    setIsEdit(false);
  };

  // 날짜 텍스트 클릭 시 달력 모달 오픈
  const handleDatePress = () => setIsDatePickerVisible(true);

  // 달력에서 날짜 선택 시
  const handleDaySelect = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setIsDatePickerVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
      <View style={styles.container}>
        <PlannerHeader
          month={today.getMonth() + 1}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          selectedDate={selectedDate}
          onDaySelect={handleDaySelect}
        />
        <PlannerDaysRow />
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <PlannerGrid />
        </ScrollView>
        <Fab iconName="add" onPress={handleFabPress} />
        <PlannerEventModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          selectedDate={selectedDate}
          onDatePress={handleDatePress}
          isDatePickerVisible={isDatePickerVisible}
          onDatePickerClose={() => setIsDatePickerVisible(false)}
          onDaySelect={handleDaySelect}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PlannerScreen;
