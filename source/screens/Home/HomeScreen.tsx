import React from 'react';
import { View, StatusBar } from 'react-native';
import ImageGrid from '../../components/ImageGrid';

const HomeScreen: React.FC = () => {
  return (
    <View>
      {/* Set the status bar */}
      <StatusBar
        backgroundColor="#fff" // Background color of the status bar
        barStyle="dark-content" // Content color of the status bar (dark or light)
        hidden={false} // Set to true to hide the status bar
        translucent={false} // Set to true if the status bar should be translucent
      />

      {/* Render the ImageGrid component as Main Component of the App */}
      <ImageGrid />
    </View>
  );
};

export default HomeScreen;
