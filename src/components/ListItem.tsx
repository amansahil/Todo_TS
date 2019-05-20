import React, { Component } from 'React'
import {StyleSheet, View, Text, Animated, PanResponder, Dimensions} from 'react-native';

import { TaskType } from '../lib/types';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

interface Props {
  delete: any,
  markDone: any,
  data: TaskType
}

interface State {
  position: any
  panResponder: any,
  index: number
}

class ListItem extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: 0});
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.props.delete(this.props.data.key)
          this.resetPosition();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.props.markDone(this.props.data.key)
          this.resetPosition();
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['0deg', '0deg', '0deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  buttonStyle = (options: string) => {
    return {
      margin: 10,
      width: 20,
      height: 20,
      borderRadius: 50/2,
      backgroundColor: options
    }
  }

  render() { 

    const { headerContentStyle, headerTextStyle, headerDoneTextStyle, doneDate, thumbnailContainerStyle } = styles


    return (
      <Animated.View
      style={[this.getCardStyle(), { zIndex: 99 }]}
      {...this.state.panResponder.panHandlers}
      >
      <View style={{
          padding: 5,
          backgroundColor: '#fff',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          position: 'relative'
      }}>
        <View style={thumbnailContainerStyle}>
          <View style={this.buttonStyle(this.props.data.color)} />
        </View>
        <View style={headerContentStyle}>
        <Text style={this.props.data.done ? headerDoneTextStyle : headerTextStyle}>{this.props.data.text}</Text>
        <Text style={this.props.data.done ? doneDate: {}}>{`Due ${this.props.data.date}`}</Text>
        </View>
      </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
    headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    headerTextStyle: {
      fontSize: 18
    },
    headerDoneTextStyle: {
      fontSize: 18,
      textDecorationLine: 'line-through',
      color: 'grey'
    },
    doneDate : {
      color: 'grey'
    },
    thumbnailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10
    },
  });

export { ListItem }
