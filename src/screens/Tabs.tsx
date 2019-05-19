import React, {Component} from 'react';
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { Image, ImageStyle
} from 'react-native';


import LoginScreen from './LoginScreen';
import ListScreen from './ListScreen';
import AddScreen from './AddScreen';
import LogoutScreen from './LogoutScreen';
import AuthLoadingScreen from './AuthLoadingScreen'
  

  //const AppStack = createBottomTabNavigator({ Todo: ListScreen, Add: AddScreen, Profile: LogoutScreen })
  const AppStack = createBottomTabNavigator({ Todo: ListScreen, Add: AddScreen, Profile: LogoutScreen },   {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
  
        if (routeName === 'Todo') {
          iconName = require('../assets/list.png')
        } else if (routeName === 'Add') {
          iconName = require('../assets/circle.png')

        } else {
          iconName = require('../assets/person.png')
        }

        return <Image
                style={{ height: 35, width: 35, tintColor: tintColor } as ImageStyle}
                source={iconName}
              />;
        // You can return any component that you like here!

        //return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#00e500',
      inactiveTintColor: 'gray',
      showLabel: false
    },
  }
    );
  const AuthStack = createStackNavigator({ LoginScreen: LoginScreen});
  

  export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ));
