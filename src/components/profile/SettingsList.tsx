import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ISettingItem {
  id: string;
  title: string;
  description: string;
  onPress: () => void;
}

interface ISettingsListProps {
  items: ISettingItem[];
}

const SettingsList: React.FC<ISettingsListProps> = ({ items }) => {
  const renderSettingItem = (item: ISettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress}
    >
      <View>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정</Text>
      {items.map(renderSettingItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  settingItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default SettingsList;
