import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ICategory } from "../../types/common";

interface ICategoryListProps {
  onSelectCategory: (category: ICategory) => void;
}

const CategoryList: React.FC<ICategoryListProps> = ({ onSelectCategory }) => {
  const categories: ICategory[] = [
    { id: "1", name: "프로그래밍" },
    { id: "2", name: "영어" },
    { id: "3", name: "수학" },
    { id: "4", name: "독서" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>카테고리</Text>
        <TouchableOpacity>
          <Text style={styles.addButton}>+ 추가</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.categoryItem}
            onPress={() => onSelectCategory(item)}
          >
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "500",
  },
  listContent: {
    paddingRight: 16,
  },
  categoryItem: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CategoryList;
