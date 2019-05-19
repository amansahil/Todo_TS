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

interface Props {

}

class AuthLoadingScreen extends React.Component<Props & NavProps> {
    constructor(props: Props & NavProps) {
      super(props);
      this._bootstrapAsync();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
    
  
    // Render any loading content that you like here
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