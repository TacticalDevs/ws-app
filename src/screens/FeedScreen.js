import { FlatList } from 'react-native';
import FeedPost from '../components/FeedPost';
import postData from '../../assets/data/posts.json';

const FeedScreen = () => {
  return (
    <FlatList
      data={postData}
      renderItem={({ item }) => <FeedPost post={item} />}
    />
  );
};

export default FeedScreen;
