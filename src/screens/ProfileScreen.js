import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable
} from 'react-native';
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Entypo
} from '@expo/vector-icons';
import FeedPost from '../components/FeedPost';

import user from '../../assets/data/user.json';
const dummy_img = 'https://reactnative-assets.s3.amazonaws.com/IMG_8666.jpeg';
const bg = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg';

const profilePictureWidth = Dimensions.get('window').width * 0.4;
import { useNavigation, useRoute } from '@react-navigation/native';

const ProfileScreenHeader = ({ user, isMe = false }) => {
  const navigation = useNavigation();

  const signOut = async () => {
    console.warn('Sign out');
  };

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: bg }} style={styles.bg} />
      <Image source={{ uri: user?.image || dummy_img }} style={styles.image} />
      <Text>{user?.name}</Text>

      {isMe && (
        <>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.button, { backgroundColor: 'royalblue' }]}
            >
              <AntDesign name="pluscircle" size={16} color="#fff" />
              <Text style={[styles.buttonText, { color: '#fff' }]}>
                Add To Story
              </Text>
            </Pressable>

            <Pressable style={styles.button}>
              <MaterialCommunityIcons name="pencil" size={16} color="#000" />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Pressable>

            <Pressable
              onPress={signOut}
              style={[styles.button, { flex: 0, width: 50 }]}
            >
              <MaterialCommunityIcons name="logout" size={16} color="#000" />
            </Pressable>
          </View>
        </>
      )}

      <View style={styles.textLine}>
        <Entypo
          name="graduation-cap"
          size={18}
          color="grey"
          style={{ width: 25 }}
        />
        <Text>Graduated University</Text>
      </View>

      <View style={styles.textLine}>
        <Ionicons name="time" size={18} color="grey" style={{ width: 25 }} />
        <Text>Joined on October 2014</Text>
      </View>
      <View style={styles.textLine}>
        <Entypo
          name="location-pin"
          size={18}
          color="grey"
          style={{ width: 25 }}
        />
        <Text>From CUNY</Text>
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const route = useRoute();
  console.warn('User: ', route?.params?.id);
  return (
    <View>
      <FlatList
        data={user.posts}
        renderItem={({ item }) => <FeedPost post={item} />}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <ProfileScreenHeader user={user} isMe={true} />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10
  },
  bg: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: -profilePictureWidth / 2
  },
  image: {
    width: profilePictureWidth,
    aspectRatio: 1,
    borderRadius: 500,
    borderWidth: 5,
    borderColor: '#fff'
  },
  buttonsContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgrey'
  },
  button: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: 'gainsboro',
    margin: 5,
    padding: 7,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    marginHorizontal: 5,
    fontWeight: '500'
  },
  textLine: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row'
  }
});

export default ProfileScreen;
