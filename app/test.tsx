import { View, Text } from 'react-native';

export default function TestScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 24 }}>テスト画面</Text>
      <Text style={{ color: 'white', fontSize: 16 }}>これが表示されれば基本的な動作は問題ありません</Text>
    </View>
  );
}