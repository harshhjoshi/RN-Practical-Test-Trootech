import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ImageItemProps {
  imageUrl: string;   // The URL of the image to be displayed
  width: string | number;   // The width of the image item, can be either a string (percentage) or a number (pixels)
  height: number;   // The height of the image item in pixels
}

const ImageItem: React.FC<ImageItemProps> = ({ imageUrl, width, height }) => (
  <View style={[styles.container, { width }]}>
    {/* Use FastImage for efficient image loading */}
    <FastImage
      source={{ uri: imageUrl, priority: FastImage.priority.normal }}
      style={[styles.image, { height }]}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  image: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ImageItem;
