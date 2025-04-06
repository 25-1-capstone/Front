import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import UserProfile from "../components/profile/UserProfile";
import SettingsList from "../components/profile/SettingsList";
import { IUser } from "../types/common";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = () => {
  const user: IUser = {
    id: "1",
    name: "김철수",
    email: "cheolsu.kim@example.com",
    studyDays: 30,
    totalStudyTime: "120시간",
  };

  const settingsItems = [
    {
      id: "1",
      title: "알림 설정",
      description: "학습 알림 및 리마인더 설정",
      onPress: () => console.log("알림 설정"),
    },
    {
      id: "2",
      title: "테마 설정",
      description: "앱 테마 및 디스플레이 설정",
      onPress: () => console.log("테마 설정"),
    },
    {
      id: "3",
      title: "개인정보 설정",
      description: "개인정보 보호 및 보안 설정",
      onPress: () => console.log("개인정보 설정"),
    },
  ];

  const handleEditProfile = () => {
    console.log("프로필 수정");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <UserProfile user={user} onEditProfile={handleEditProfile} />
        <SettingsList items={settingsItems} />
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

export default ProfileScreen;
