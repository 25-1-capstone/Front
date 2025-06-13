// 모바일 앱 딥링크 설정 필요요

import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";

const KAKAO_LOGIN_URL = process.env.EXPO_PUBLIC_KAKAO_LOGIN_URL;

function hasSessionCookie() {
  if (typeof document !== "undefined") {
    return document.cookie.includes("connect.sid=");
  }
  return false;
}

export default function LoginScreen() {
  const router = useRouter();

  useEffect(() => {
    if (hasSessionCookie()) {
      router.replace("/"); // 세션 있으면 홈으로 이동
    }
  }, []);

  const handleKakaoLogin = () => {
    if (Platform.OS === "web") {
      window.location.href = KAKAO_LOGIN_URL || "";
    } else {
      Linking.openURL(KAKAO_LOGIN_URL || "");
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.kakaoBtn} onPress={handleKakaoLogin}>
          <Image
            source={require("../../assets/login.png")}
            style={{ width: "100%", height: 48, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "90%",
  },
  kakaoBtn: {
    backgroundColor: "#ffe812",
    borderRadius: 8,
    alignItems: "center",
  },
});
