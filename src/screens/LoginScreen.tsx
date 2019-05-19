import React, {Component} from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

import { nameChanged, loginUser } from '../actions';
import { Button, Input } from '../components'

interface ActionProps {
  loginUser: typeof loginUser,
  nameChanged: typeof nameChanged
}

interface Props {
    name: string
}

interface NavProps {
  navigation: any
}

class LoginScreen extends Component<Props & ActionProps & NavProps>{

  static navigationOptions = {
    header: null,
  };

  onButtonPress() {
    const { name } = this.props;

    this.props.loginUser({ name });
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/tick.png')}
         />
        <Text style={styles.welcome}>Todo</Text>
        <View style={ styles.bottomView} >
          <Input
            placeholder="Name"
            value={this.props.name}
            onChangeText={(text: string) => this.props.nameChanged(text)}
          />
          <Button onPress={this.onButtonPress.bind(this)} >
            Sign In
          </Button>
        </View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  bottomView:{
    width: '90%', 
    height: 100, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 60
  },
  imageStyle: {
    height: 180,
    width: 180,
    borderRadius: 5
 }
});

const mapStateToProps = ({ auth }: any): Props => {
  const { name } = auth;
  return { name };
};

export default connect<Props, {}, ActionProps>(mapStateToProps, { nameChanged, loginUser })(LoginScreen);