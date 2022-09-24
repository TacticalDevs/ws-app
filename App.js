import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/navigation';

// ===== AWS Configuration
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsconfig);
//Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withAuthenticator(App);
//TODO: customize signin and signup screen,
// 1. using customization in the withAuthenticator func
// 2. creating custom screen and using Auth from aws-amplify-react-native
