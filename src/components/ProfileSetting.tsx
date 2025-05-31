import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ProfileSetting = () => {
  const [nickname, setNickname] = useState("갓생살기 프로젝트 😎");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleStart = () => {
    // 프로필 설정 완료 후 홈으로 이동 (예시)
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필 설정</Text>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImageCircle}>
          <Ionicons name="image-outline" size={48} color="#BDBDBD" />
        </View>
        <Text style={styles.profileImageText}>프로필 사진 추가</Text>
      </View>
      <Text style={styles.label}>닉네임</Text>
      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
        placeholder="닉네임을 입력하세요."
        placeholderTextColor="#BDBDBD"
      />
      <Text style={styles.label}>상태 메시지</Text>
      <TextInput
        style={styles.textarea}
        value={status}
        onChangeText={setStatus}
        placeholder="상세 설명을 입력해주세요."
        placeholderTextColor="#BDBDBD"
        multiline
        numberOfLines={4}
      />
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#E5E0DF",
    borderRadius: 5,
    margin: 2,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  profileImageText: {
    fontSize: 12,
    color: "#888",
  },
  label: {
    fontSize: 15,
    marginLeft: 6,
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 10,
    color: "#222",
  },
  textarea: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: "top",
    color: "#222",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileSetting;
