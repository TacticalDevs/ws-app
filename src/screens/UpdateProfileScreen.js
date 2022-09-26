import { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { API, Auth, graphqlOperation } from 'aws-amplify';

const dummyImage = 'https://reactnative-assets.s3.amazonaws.com/user.png';

const createUser = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      createdAt
      updatedAt
      name
      image
      _version
      _lastChangedAt
      _deleted
    }
  }
`;

const UpdateProfileScreen = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const insets = useSafeAreaInsets();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onSave = async () => {
    // user sub name from AWS Cognito
    const userData = await Auth.currentAuthenticatedUser();
    const newUser = {
      id: userData.attributes.sub,
      name,
      _version: 1
    };

    await API.graphql(graphqlOperation(createUser, { input: newUser }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { marginBottom: insets.bottom }]}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={150}
    >
      <Pressable onPress={pickImage} style={styles.imagePickerContainer}>
        <Image source={{ uri: image || dummyImage }} style={styles.image} />
        <Text>Change your photo</Text>
      </Pressable>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.textInput}
      />

      <View style={styles.buttonContainer}>
        <Button title="Update Profile" onPress={onSave} disabled={!name} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20
  },
  textInput: {
    borderBottomWidth: 2,
    borderColor: 'lightgrey',
    width: '100%',
    marginVertical: 10,
    padding: 10
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    padding: 5
  }
});

export default UpdateProfileScreen;
