import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Fab from "../../../src/components/common/Fab";

const groups = [
  { id: "1", name: "갓생살기 프로젝트 😎", members: 3 },
  { id: "2", name: "갓생살기 프로젝트 2 😎", members: 25 },
  { id: "3", name: "갓생살기 프로젝트 3 😎", members: 8 },
];

const GroupScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>내 그룹</Text>
      <FlatList
        style={styles.list}
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.memberCount}>인원 {item.members}명</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      <Fab iconName="add" onPress={() => router.push("/group/group-add")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    left: "5%",
    width: "90%",
  },
  list: {
    left: "5%",
    width: "90%",
  },
  card: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  groupName: {
    fontSize: 20,
    marginBottom: 6,
  },
  memberCount: {
    fontSize: 14,
    color: "#999",
  },
});

export default GroupScreen;
