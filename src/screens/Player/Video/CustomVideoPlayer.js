import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import VideoPlayer from 'react-native-media-console';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const CustomVideoPlayer = ({source}) => {
  const videoPlayer = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (isFullScreen) {
      // Exit full-screen
      Dimensions.removeEventListener('change', handleOrientationChange);
    } else {
      // Enter full-screen
      Dimensions.addEventListener('change', handleOrientationChange);
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleOrientationChange = ({window}) => {
    if (window.width > window.height) {
      // Landscape mode
      setIsFullScreen(true);
    } else {
      // Portrait mode
      setIsFullScreen(false);
    }
  };

  const onEndVideo = () => {
    if (isFullScreen) {
      // Exit full-screen when video ends
      Dimensions.removeEventListener('change', handleOrientationChange);
      setIsFullScreen(false);
      // Handle video playback completion here
    }
  };

  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{uri: source}}
        isFullscreen={isFullScreen}
        onBack={onEndVideo}
        rewindTime={10}
        showOnStart={true}
        showTimeRemaining={false}
        showHours={true}
        videoRef={videoPlayer}
        onEnd={onEndVideo}
        controlAnimationTiming={350}
        controlTimeoutDelay={5000}
        seekColor={'#fff'} // Set your seek color here
        showDuration={true}
        // Customize other props as needed
      />
      {isFullScreen && (
        <TouchableOpacity
          style={styles.fullScreenButton}
          onPress={toggleFullScreen}>
          <MaterialIcon
            name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'}
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Set your background color here
  },
  fullScreenButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default CustomVideoPlayer;
