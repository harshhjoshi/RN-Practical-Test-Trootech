import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectImagePosts, setImagePosts } from '../store/imagePostsSlice';
import useApi from '../hooks/useApi';
import ImageGridItem from './ImageGridItem';
import { getImagePostsUrl } from '../utils/apiUrls';

interface ImageNode {
  node: {
    image: string[]; // Array of image URLs associated with the image post
    name: string;    // Name or title of the image post
  };
}

const ImageGrid: React.FC = () => {
  const dispatch = useDispatch();
  const imagePosts = useSelector(selectImagePosts);
  const [offlineMode, setOfflineMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Fetch image posts data from API using custom hook useApi
  const apiResponse = useApi<{
    data: { imagePostsConnection: { edges: ImageNode[] } };
  }>(getImagePostsUrl());
  const { data, loading, error } = apiResponse;

  // Set image posts data in Redux store when API data is available
  useEffect(() => {
    if (data) {
      setOfflineMode(false);
      const extractedImages = data.data.imagePostsConnection.edges.map(
        edge => ({
          id: edge.node.name,
          images: edge.node.image,
          name: edge.node.name,
        }),
      );
      dispatch(setImagePosts(extractedImages));
    }
  }, [data, dispatch]);

  // Detect offline mode when there is no API data and loaded image posts are available
  useEffect(() => {
    if (!data && !loading && imagePosts.length > 0) {
      setOfflineMode(true);
    }
  }, [data, loading, imagePosts]);

  // Handle load more action for pagination
  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  // Paginate the loaded image posts based on current page and posts per page
  const paginatedImagePosts = imagePosts.slice(0, currentPage * postsPerPage);

  // if more content is loading during pagination
  const isLoadingMore = loading && currentPage > 1;

  return (
    <View>
      {/* Display the list of image posts using FlatList */}
      <FlatList
        data={paginatedImagePosts}
        keyExtractor={item => item.id}
        contentContainerStyle={{ marginTop: '2%' }}
        renderItem={({ item }) => (
          // Render the ImageGridItem component for each image post
          <ImageGridItem
            name={item.name}
            images={item.images}
            isEven={item.images.length === 2}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Load more when reaching 50% of the end
        ListFooterComponent={
          isLoadingMore ? <ActivityIndicator size="small" color="#000" /> : null
        }
      />
    </View>
  );
};

export default ImageGrid;