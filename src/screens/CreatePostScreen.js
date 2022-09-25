import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView
} from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

// ===== AWS
import { DataStore, Auth } from 'aws-amplify';
import { Post } from '../models';

const user = {
  id: 'u1',
  image:
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg',
  name: 'Vadim Savin'
};

const CreatePostScreen = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  // const insets = useSafeAreaInsets();

  const onSubmit = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    const newPost = new Post({
      description: description,
      // image,
      numberOfLikes: 0,
      numberOfShares: 0,
      postUserId: userData.attributes.sub,
      _version: 1
    });

    await DataStore.save(newPost);
    setDescription('');
    navigation.goBack();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3], // aspect ration to allow images to be crop to
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // style={[styles.container, { marginBottom: insets.bottom }]}
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { marginBottom: 30 }]}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={150}
    >
      <View style={styles.header}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Entypo
          onPress={pickImage}
          name="images"
          size={24}
          color="limegreen"
          style={styles.icon}
        />
      </View>

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="what is on your mind?"
        multiline
      />

      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.buttonContainer}>
        <Button title="Post" onPress={onSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    paddingTop: 10,
    marginTop: 40,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 10
  },
  name: {
    fontWeight: '500'
  },
  buttonContainer: {
    marginTop: 'auto'
  },
  icon: {
    marginLeft: 'auto'
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    alignSelf: 'center',
    marginTop: 50
  }
});
