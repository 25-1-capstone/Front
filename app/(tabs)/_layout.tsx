import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#888",
        headerShown: false,
        tabBarStyle: {
          height: 87,
          padding: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "400",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          tabBarLabel: "그룹",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "마이",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
