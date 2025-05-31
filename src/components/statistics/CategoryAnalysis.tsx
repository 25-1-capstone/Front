import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ICategory, Period } from "../../types/common";

interface ICategoryAnalysisProps {
  period: Period;
}

const CategoryAnalysis: React.FC<ICategoryAnalysisProps> = ({ period }) => {
  const categories: ICategory[] = [
    { id: "1", name: "프로그래밍", totalTime: "25시간", percentage: 40 },
    { id: "2", name: "영어", totalTime: "15시간", percentage: 25 },
    { id: "3", name: "수학", totalTime: "12시간", percentage: 20 },
    { id: "4", name: "독서", totalTime: "8시간", percentage: 15 },
  ];

  const renderItem = ({ item }: { item: ICategory }) => (
    <View style={styles.categoryItem}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryTime}>{item.totalTime}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: item.percentage ? `${item.percentage}%` : "0%" },
          ]}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>카테고리별 학습 시간</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  list: {
    marginTop: 8,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
  },
  categoryTime: {
    fontSize: 16,
    color: "#666",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
});

export default CategoryAnalysis;
