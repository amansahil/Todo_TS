import React from 'react';
import { TextInput, View, Text, ViewStyle } from 'react-native';
import { placeholder } from '@babel/types';

interface Props {
  value: string,
  onChangeText?: any,
  placeholder: string,
  secureTextEntry?: boolean,
  onFocus?: any
}

const Input = ({ value, onChangeText, placeholder, secureTextEntry, onFocus }: Props) => {
  const { inputStyle } = styles;

  return (
      <TextInput
        onFocus={onFocus}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle as ViewStyle}
        value={value}
        onChangeText={onChangeText}
      />

  );
};

const styles = {
  inputStyle: {
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    color: '#000',
    fontSize: 18,
    lineHeight: 23,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    height: 40,
  }
};

export { Input };
