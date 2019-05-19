import React, {Component} from 'react';
import {  ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
    StyleSheet
} from 'react-native';

interface NavProps {
  navigation: any
}

class AuthLoadingScreen extends React.Component<NavProps> {
    constructor(props: NavProps) {
      super(props);
      this._bootstrapAsync();
    }
  
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
  
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
    
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default AuthLoadingScreen;