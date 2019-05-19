import React from 'react';
import { Text, View, Modal, TextStyle, ViewStyle } from 'react-native';
import { Sections } from './Sections';
import { Button } from './Button';

interface Props {
  children : string,
  visible: boolean,
  onAccept: any,
  onDecline: any
}

const Confirm = ({ children, visible, onAccept, onDecline }: Props) => {
  const { containerStyle, textStyle, cardSectionStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle as ViewStyle}>
        <Sections style={cardSectionStyle}>
          <Text style={textStyle as TextStyle}>
            {children}
          </Text>
        </Sections>

        <Sections>
          <Button style={{ flex: 1 }} onPress={onAccept}>Yes</Button>
          <Button style={{ flex: 1 }} onPress={onDecline}>No</Button>
        </Sections>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { Confirm };