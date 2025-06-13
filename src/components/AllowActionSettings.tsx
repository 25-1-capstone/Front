import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

const AllowActionSettings = () => {
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [navigateProfile, setNavigateProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // API 호출 없이 더미 데이터로 세팅
    const dummyTargets = [
      { id: "31", target: "핸드폰", status: 0 },
      { id: "32", target: "책 읽기", status: 0 },
      { id: "33", target: "PC 보기", status: 0 },
    ];
    console.log("받아온 targets:", dummyTargets);
    setActions(dummyTargets);
    const initialStates: { [key: string]: boolean } = {};
    dummyTargets.forEach((item: any) => {
      initialStates[item.id] = item.status === 1;
    });
    setSwitchStates(initialStates);
    setLoading(false);
  }, []);

  const handleSwitch = (id: string, value: boolean) => {
    setSwitchStates((prev) => ({ ...prev, [id]: value }));
  };

  const handleProfileSetting = () => {
    setNavigateProfile(true);
  };

  useEffect(() => {
    if (navigateProfile) {
      router.replace("/profile-setting");
    }
  }, [navigateProfile, router]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>허용할 동작</Text>
      {actions.map((item) => (
        <React.Fragment key={item.id}>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>{item.target}</Text>
            <Switch
              value={switchStates[item.id] || false}
              onValueChange={(value) => handleSwitch(item.id, value)}
            />
          </View>
        </React.Fragment>
      ))}
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.button} onPress={handleProfileSetting}>
        <Text style={styles.buttonText}>프로필 설정하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 2,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
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

export default AllowActionSettings;
