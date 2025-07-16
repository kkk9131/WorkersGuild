import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SimpleScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>シンプルテスト画面</Text>
      <View className="bg-blue-500 p-4 rounded-lg">
        <Text className="text-white">NativeWindテスト</Text>
      </View>
      <Text style={styles.info}>上のボックスが青色で表示されればNativeWindは動作しています</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
});