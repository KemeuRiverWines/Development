import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TestButton from './Components/TestButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Test Update - ITS WORKKKKSSSS YESSSSS</Text>
      <StatusBar style="auto" />
      <View>
        <TestButton />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
