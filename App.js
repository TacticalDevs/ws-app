import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import FeedPost from './src/components/FeedPost';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FeedPost />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
