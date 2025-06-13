import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Fab from "../../../src/components/common/Fab";
import axios from "axios";

const GroupScreen: React.FC = () => {
  const router = useRouter();

  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/group`, {
          headers: { "Content-Type": "application/json" },
        });
        const groupList = response.data.success?.groups || [];
        setGroups(
          groupList.map((g: any) => ({
            id: g.id,
            name: g.name,
            members: g.memberCount,
          }))
        );
      } catch (e) {
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

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
        ListEmptyComponent={loading ? null : <Text>그룹이 없습니다.</Text>}
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
