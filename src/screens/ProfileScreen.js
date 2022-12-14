import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  Alert
} from 'react-native';
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Entypo
} from '@expo/vector-icons';
import FeedPost from '../components/FeedPost';

/// ==== AWS
import { Auth, DataStore } from 'aws-amplify';
import { User, Post } from '../models';

const dummy_img = 'https://reactnative-assets.s3.amazonaws.com/IMG_8666.jpeg';
const bg =
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

const profilePictureWidth = Dimensions.get('window').width * 0.4;
import { useNavigation, useRoute } from '@react-navigation/native';

const ProfileScreenHeader = ({ user, isMe = false }) => {
  const navigation = useNavigation();

  const signOut = async () => {
    Auth.signOut();
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

            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Update Profile')}
            >
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
        <Text>From USA</Text>
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      const userId = route?.params?.id || userData.attributes.sub;
      if (!userId) return;

      const isMe = userId === userData.attributes.sub;
      //  currentAuthenticatedUser is different from the dbUser
      // create a dbUser
      const dbUser = await DataStore.query(User, userId);

      if (!dbUser) {
        // if there is not dbUser found redirect to UpdateProfile
        // this online happens the first time user access the profile
        // user will have to create a profile and update it
        // this bc AWS Cognito User Pool manage the authenticated user with email and full-name
        // but we also need to create a user in our database for the bio, age, profile pic etc
        // we need to connect both user by using the auth user sub id and use the same sub to create a new user in the db
        if (isMe) {
          navigation.navigate('Update Profile');
        } else {
          Alert.alert('User not found!');
        }
      } else {
        setUser(dbUser);
      }
      DataStore.query(Post, (p) => p.postUserId('eq', userId)).then(setPosts);
    };

    fetchUser();
  }, []);
  return (
    <View>
      <FlatList
        data={posts}
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
