import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, Linking } from "react-native";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: Platform.OS === "web",
});

// 요청 인터셉터: 세션 ID 자동 포함
api.interceptors.request.use(
  async (config) => {
    if (Platform.OS !== "web") {
      const sessionId = await AsyncStorage.getItem("SESSION_ID");
      if (sessionId) {
        config.headers = config.headers || {};
        config.headers["Cookie"] = `connect.sid=${sessionId}`;
      }
    }
    // 웹은 브라우저가 쿠키 자동 전송
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401/403이면 로그인 페이지로 이동
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      if (Platform.OS === "web") {
        window.location.href = "/login";
      } else {
        Linking.openURL("myapp://login"); // 실제 앱 딥링크 스킴에 맞게 수정
      }
    }
    return Promise.reject(error);
  }
);

export default api;
