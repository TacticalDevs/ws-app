import { StyleSheet, Text, View, Image } from 'react-native';
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5
} from '@expo/vector-icons';
import LikeImage from '../../assets/images/like.png';
import styles from './styles';

const post = {
  id: 'p1',
  createdAt: '4 m',
  User: {
    id: 'u1',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg',
    name: 'Vadim Savin'
  },
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg',
  numberOfLikes: 11,
  numberOfShares: 2
};

const FeedPost = (props) => {
  const { post } = props;
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Image source={{ uri: post.User.image }} style={styles.profileImage} />
        <View>
          <Text style={styles.name}>{post.User.name}</Text>
          <Text style={styles.subtitle}>{post.createdAt}</Text>
        </View>
        <Entypo
          name="dots-three-horizontal"
          size={18}
          color="grey"
          style={styles.icon}
        />
      </View>

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
          <View style={styles.iconButton}>
            <AntDesign name="like2" size={18} color="grey" />
            <Text style={styles.iconsButtonText}>Like</Text>
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
