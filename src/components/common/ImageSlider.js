import React from 'react';
import {View, StyleSheet} from 'react-native';
import Carousel from 'react-native-basic-carousel';

// data: Array<{}>;
// renderItem: ListRenderItem<any>;
// onSnapToItem?: (item: {}) => void;
// itemWidth: number;
// bounces?: boolean; //ios only
// pagination?: boolean;
// paginationColor?: string;
// paginationType?: 'default' | 'circle';
// autoplay?: boolean;
// autoplayDelay?: number; //2500ms
// placeholderContent?: React.ReactNode;
// getCurrentIndex?: (value: number) => void;
// customPagination?: ({ activeIndex }: {
//     activeIndex: number;
// }) => React.ReactNode;
// paginationPosition?: 'top' | 'bottom';
// paginationBackgroundColor?: string;
// }

const ImageSlider = props => {
  return (
    <View style={[styles.container, {height: props.height}]}>
      <Carousel
        data={props.data}
        renderItem={props.renderItem}
        sliderWidth={props.sliderWidth}
        itemWidth={props.itemWidth}
        autoplay={props.autoplay}
        autoplayDelay={props.autoplayDelay}
        pagination={props.pagination}
        paginationColor={props.paginationColor}
        paginationType={props.paginationType}
        paginationPosition={props.paginationPosition}
        paginationBackgroundColor={props.paginationBackgroundColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ImageSlider;
