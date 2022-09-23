import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '../screens/FeedScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={FeedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
