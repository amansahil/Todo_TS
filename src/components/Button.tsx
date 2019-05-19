import React, { Children } from 'react';
import { Text, TouchableOpacity, TextStyle} from 'react-native';

interface Props {
  onPress: any, 
  children: string, 
  style?: any, 
  fontStyle?: any
}

const Button = ({ onPress, children, style, fontStyle }: Props) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={[textStyle, fontStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#00e500',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00e500',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
