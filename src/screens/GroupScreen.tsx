import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import GroupList from "../components/group/GroupList";
import CreateGroupButton from "../components/group/CreateGroupButton";

type Props = NativeStackScreenProps<RootStackParamList, "Group">;

const GroupScreen: React.FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <GroupList />
        <CreateGroupButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GroupScreen;
