import React, { Component } from 'react';
import { Text, View, Modal, DatePickerIOS, Platform, TouchableOpacity, ViewStyle } from 'react-native';
import { Sections } from './Sections';
import { Button } from './Button';

interface Props {
  visible: boolean , 
  onAccept: any, 
  date: Date, 
  onDateChange: any, 
  setDateAndroid:any, 
  setTimeAndroid: any, 
  androidDate: any, 
  chosenAndroidTime: any
}

class DatePicker extends Component<Props> {

  render() {
    const { visible, onAccept, date, onDateChange, setDateAndroid, setTimeAndroid, androidDate, chosenAndroidTime } = this.props
    const { containerStyle, sectionStyle } = styles;
    
    
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={containerStyle as ViewStyle}>
          <Sections style ={sectionStyle} >
          {
          Platform.OS === 'ios' ? (
            <DatePickerIOS
              date={date}
              onDateChange={onDateChange}
              style={{ flex: 1 }}
            />
          ) : (
            <View style={{ flex: 1, flexDirection: 'row'  }}>
              <Button style={styles.buttonStyle} fontStyle={styles.textStyle} onPress={setDateAndroid}>
                {androidDate}
              </Button>
              <Button style={styles.buttonStyle} fontStyle={styles.textStyle} onPress={setTimeAndroid}>
                {chosenAndroidTime}
              </Button>
            </View>
          )
        }
          </Sections>
            
          <Button onPress={onAccept}>Done</Button>

        </View>
      </Modal>
    );
  }
};

const styles = {
  sectionStyle: {
    marginBottom :10,
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    flex: 1
  },
  textStyle: {
    color: '#007aff'
  }
};

export { DatePicker };