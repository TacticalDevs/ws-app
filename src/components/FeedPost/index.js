import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5
} from '@expo/vector-icons';
import { useState } from 'react';
import LikeImage from '../../../assets/images/like.png';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const FeedPost = (props) => {
  const { post } = props;
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.post}>
      <Pressable
        onPress={() => navigation.navigate('Profile', { id: post.postUserId })}
        style={styles.header}
      >
        <Image source={{ uri: post.User?.image }} style={styles.profileImage} />
        <View>
          <Text style={styles.name}>{post.User?.name}</Text>
          <Text style={styles.subtitle}>{post.createdAt}</Text>
        </View>
        <Entypo
          name="dots-three-horizontal"
          size={18}
          color="grey"
          style={styles.icon}
        />
      </Pressable>

      {/* Body */}
      {post.description && (
        <Text style={styles.description}>{post.description}</Text>
      )}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.image} />
      )}

      <View style={styles.footer}>
        {/* STATS ROW */}
        <View style={styles.statsRow}>
          <Image source={LikeImage} style={styles.likeIcon} />
          <Text style={styles.likedBy}>
            Elon and {post.numberOfLikes} others
          </Text>
          <Text style={styles.shares}>{post.numberOfShares} shares</Text>
        </View>
        {/* BUTTONS ROW  */}
        <View style={styles.buttonsRow}>
          <View>
            <Pressable
              onPress={() => setIsLiked(!isLiked)}
              style={styles.iconButton}
            >
              <AntDesign
                name="like2"
                size={18}
                color={isLiked ? 'royalblue' : 'grey'}
              />
              <Text
                style={[
                  styles.iconsButtonText,
                  { color: isLiked ? 'royalblue' : 'grey' }
                ]}
              >
                Like
              </Text>
            </Pressable>
          </View>

          <View style={styles.iconButton}>
            <FontAwesome5 name="comment-alt" size={18} color="grey" />
            <Text style={styles.iconsButtonText}>comment</Text>
          </View>

          <View style={styles.iconButton}>
            <MaterialCommunityIcons
              name="share-outline"
              size={18}
              color="grey"
            />
            <Text style={styles.iconsButtonText}>share</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FeedPost;
