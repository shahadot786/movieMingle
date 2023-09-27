import React, {useRef, useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-media-console';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation-locker';
import colors from '../../../theme/constant/colors';

const CustomVideoPlayer = ({source}) => {
  const videoPlayer = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isFullScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    return () => {
      Orientation.lockToPortrait(); // Reset to portrait when unmounting
    };
  }, [isFullScreen]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const onEndVideo = () => {
    if (isFullScreen) {
      Orientation.lockToPortrait(); // Reset to portrait when video ends
      setIsFullScreen(false);
      // Handle video playback completion here
    }
  };

  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{uri: source}}
        isFullscreen={false}
        onBack={onEndVideo}
        rewindTime={10}
        showOnStart={true}
        showTimeRemaining={false}
        showHours={true}
        videoRef={videoPlayer}
        onEnterFullscreen={() => toggleFullScreen()}
        disableBack={!isFullScreen}
        onEnd={onEndVideo}
        controlAnimationTiming={350}
        controlTimeoutDelay={5000}
        seekColor={colors.Primary}
        showDuration={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default CustomVideoPlayer;
