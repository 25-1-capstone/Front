import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { IStudyGroup } from "../../types/common";

const GroupList: React.FC = () => {
  const groups: IStudyGroup[] = [
    {
      id: "1",
      name: "알고리즘 스터디",
      description: "매일 알고리즘 문제를 함께 풀어봐요",
      memberCount: 5,
      todayStudyTime: "3시간",
    },
    {
      id: "2",
      name: "영어 회화 모임",
      description: "원어민과 함께하는 영어 회화",
      memberCount: 8,
      todayStudyTime: "2시간",
    },
    {
      id: "3",
      name: "코딩 테스트 준비",
      description: "기업 코딩 테스트 대비 스터디",
      memberCount: 6,
      todayStudyTime: "4시간",
    },
  ];

  const renderItem = ({ item }: { item: IStudyGroup }) => (
    <TouchableOpacity style={styles.groupItem}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.memberCount}>멤버 {item.memberCount}명</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.studyTime}>
        <Text style={styles.studyTimeLabel}>오늘의 학습시간</Text>
        <Text style={styles.studyTimeValue}>{item.todayStudyTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>스터디 그룹</Text>
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  groupItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  memberCount: {
    fontSize: 14,
    color: "#666",
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 12,
  },
  studyTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  studyTimeLabel: {
    fontSize: 14,
    color: "#666",
  },
  studyTimeValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4CAF50",
  },
});

export default GroupList;
