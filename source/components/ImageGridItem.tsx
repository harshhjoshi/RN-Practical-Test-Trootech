import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageItem from './ImageItem';

interface ImageGridItemProps {
  name: string; // User Name For Top left of the Post
  images: string[]; // Image which we're shwing in Screen
  isEven: boolean; // New prop to indicate if images are even
}

const ImageGridItem: React.FC<ImageGridItemProps> = ({
  name,
  images,
  isEven,
}) => (
  <View style={styles.container}>
    {/* Display the name */}
    <Text style={styles.name}>{name}</Text>
    {/* Display images in a horizontal or vertical layout */}
    <View
      style={
        isEven
          ? styles.horizontalImagesContainer
          : styles.verticalImagesContainer
      }>
      {/* Map through images and create ImageItem components */}
      {images.map((imageUrl, idx) => (
        <ImageItem
          key={idx}
          imageUrl={imageUrl}
          width={isEven ? '50%' : idx === 0 ? '100%' : '50%'}
          height={isEven ? 100 : idx === 0 ? 220 : 100}
        />
      ))}

      {/* NOTE: I've handled Special this 2 Index images because without this the post is looking bad as per UI */}

      {/* Show the fourth image as square if there are exactly 4 images */}
      {images.length === 4 && (
        <ImageItem
          key={images.length} // Use a unique key
          imageUrl={images[0]} // Use the fourth image URL
          width="50%"
          height={100}
        />
      )}

      {/* Show the first image again if there are exactly 6 images */}
      {images.length === 6 && (
        <ImageItem
          key={images.length} // Use a unique key
          imageUrl={images[0]} // Use the first image URL
          width="50%" // Width for Individual Image
          height={100}
        />
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  horizontalImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -5,
  },
});

export default ImageGridItem;
