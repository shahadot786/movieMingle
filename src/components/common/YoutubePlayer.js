import {Pressable, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import YTPlayer from 'react-native-youtube-iframe';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/constant/colors';

const YoutubePlayer = ({isIcon, videoId}) => {
  const [playing, setPlaying] = useState(true);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View>
      <YTPlayer
        height={300}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
      {isIcon && (
        <Pressable
          style={({pressed}) => [
            {
              position: 'absolute',
              top: '25%',
              left: '45%',
              opacity: pressed ? 0.4 : 1,
            },
          ]}
          onPress={togglePlaying}>
          {!playing && <AntDesign name="play" size={50} color={colors.White} />}
        </Pressable>
      )}
    </View>
  );
};

export default YoutubePlayer;
