import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'

import LoginScreen from './LoginScreen_v2'
import ImageSearch from './ImageSearch'

export const AuthStack = createStackNavigator({
  LoginScreen,
})

export const NavigationStack = createStackNavigator({
  ImageSearch,
})

export const AuthSwitch = createSwitchNavigator({
  LoggedOut: AuthStack,
  LoggedIn: NavigationStack,
}, {
  initialRouteName: 'LoggedOut',
})

export default createAppContainer(AuthSwitch)
