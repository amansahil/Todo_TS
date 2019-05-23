import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { logoutUser, getUserName, clearItems  } from '../actions';
import { Button, Header } from '../components'

interface ActionProps {
  getUserName: typeof getUserName,
  logoutUser: typeof logoutUser,
  clearItems: typeof clearItems
}

interface Props {
  userName: string
}

interface NavProps {
  navigation: any
}

class LogoutScreen extends Component<Props & ActionProps & NavProps>{

  constructor(props: Props & ActionProps & NavProps) {
    super(props)
    this.props.getUserName()
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  onButtonPress() {
    this.props.logoutUser()
    this.props.clearItems()
    this.props.navigation.navigate('Auth');
  };


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText={`Hi, ${this.props.userName}`} />
        <View style={styles.container}>
          <View style={styles.bottomView} >
            <Button style={styles.buttonStyle} fontStyle={styles.textStyle} onPress={this.onButtonPress}>
              Logout
            </Button>
          </View>
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
  bottomView:{
    width: '90%', 
    height: 100, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fc3d39',
  },
  textStyle: {
    color: '#fc3d39'
  }
});

const mapStateToProps = ({ auth }: any): Props => {
  const { userName } = auth;
  return { userName };
};

export default connect<Props, {}, ActionProps>(mapStateToProps, { logoutUser, getUserName, clearItems })(LogoutScreen);