import React from 'react';
import { Text, View, ViewStyle, TextStyle } from 'react-native';

interface Props {
  headerText: string
}


const Header = (props: Props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle as ViewStyle}>
      <Text style={textStyle as TextStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#00e500',
    justifyContent: 'center',
    height: 110,
    paddingTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: '600',
    paddingTop: 25,
    paddingLeft: 10,
    paddingBottom: 15
  }
};

export { Header };