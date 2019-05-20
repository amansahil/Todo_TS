import React, {Component } from 'react';
import {Platform, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { iosDateTimeChanged, androidDateChanged, androidTimeChanged, taskChanged, submitForm } from '../actions';
import { Input, Button, Header, MultiLineInput, DatePicker } from '../components'
import ColorButtons from '../components/ColorButtons'
import { TaskType } from '../lib/types';

interface ActionProps {
  iosDateTimeChanged: typeof iosDateTimeChanged,
  androidDateChanged: typeof androidDateChanged,
  androidTimeChanged: typeof androidTimeChanged,
  submitForm: typeof submitForm,
  taskChanged: typeof taskChanged
}

interface Props {
  chosenAndroidTime: Date,
  chosenDate: Date,
  androidDate: Date,
  radioSelected: string,
  task: string,
}

interface State {
  showModal: boolean
}

class AddScreen extends Component<Props & ActionProps, State>{

  constructor(props: Props & ActionProps) {
    super(props);
    this.state = { showModal: false };
    this.setDate = this.setDate.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.setDateAndroid = this.setDateAndroid.bind(this)
    this.setTimeAndroid = this.setTimeAndroid.bind(this)
  }

  setDate(newDate: Date) {
    this.props.iosDateTimeChanged(newDate)
  }

  setDateAndroid() {
    this.props.androidDateChanged()
  }

  setTimeAndroid(){
    this.props.androidTimeChanged()
  }

  submitForm() {
    let itemObject: TaskType
    itemObject = {
      key: `${Math.floor(Math.random() * 9999)}`,
      date: Platform.OS === 'ios' ? `${this.props.chosenDate.toDateString()}  ${this.props.chosenDate.toLocaleTimeString()}`: `${this.props.androidDate}  ${this.props.chosenAndroidTime}`,
      done: false,
      color: this.props.radioSelected,
      text: this.props.task
    }

    this.props.submitForm(itemObject)
  }

  render() {
    const colors = [{
        id: '#00BCD4'
      },
      {
        id: '#f4bc42'
      },
      {
        id: '#d641f4'
      },
      {
        id: '#00ff00'
      }, 
      {
        id: '#ff0000'
      },
    ];

    return (
      <View style={{ flex: 1 }}>
        <Header headerText="Add" />  
        <View style={styles.container}>
          <Input
              onFocus ={() => this.setState({ showModal: true })}
              placeholder="Due"
              value={Platform.OS === 'ios' ? `${this.props.chosenDate.toDateString()}  ${this.props.chosenDate.toLocaleTimeString()}`: `${this.props.androidDate}  ${this.props.chosenAndroidTime}`}
          /> 
          <MultiLineInput
              placeholder="What do you have to do ?"
              value={this.props.task}
              onChangeText={(text: string) => this.props.taskChanged(text)}
          />     
          <View style = {{ flexDirection: 'row', alignSelf: 'center' }}>
            <ColorButtons colors = {colors}/>
          </View>
          <Button onPress={this.submitForm} >
            Add
          </Button>
          <DatePicker
            visible={this.state.showModal}
            onAccept={() => this.setState({ showModal: false })}
            date={this.props.chosenDate}
            onDateChange={this.setDate}
            setDateAndroid={this.setDateAndroid}
            setTimeAndroid={this.setTimeAndroid}
            chosenAndroidTime={this.props.chosenAndroidTime}
            androidDate={this.props.androidDate}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#FFF',
  }
});

const mapStateToProps = ({ form }: any): Props => {
  const { chosenDate, chosenAndroidTime, androidDate, task, radioSelected } = form;
  return { chosenDate, chosenAndroidTime, androidDate, task, radioSelected };
};

export default connect<Props, {}, ActionProps>(mapStateToProps, { iosDateTimeChanged, androidDateChanged, androidTimeChanged, taskChanged, submitForm  })(AddScreen);