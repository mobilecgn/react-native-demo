import React, { Component } from 'react'
import { Alert, Button, Text, StyleSheet, TextInput, Image, View, AsyncStorage } from 'react-native'
import { NavigationStackScreenOptions, NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import delay from './delay';
import assets from './assets';

interface Props {
  navigation: NavigationScreenProp<any>
}

interface State {
  inProgress: boolean
  username: string
  password: string
}

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  label: {
    color: 'gray',
    marginTop: 15,
  },
  textInput: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    minHeight: 40,
  },
  buttonContainer: {
    marginTop: 50,
  },
})

export default class LoginScreen extends Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: 'Login',
  }

  state = {
    inProgress: false,
    username: '',
    password: '',
  }

  usernameTextInput: TextInput|null = null
  passwordTextInput: TextInput|null = null

  login = async () => {
    if (!this.state.username) {
      Alert.alert('Missing username')
      return
    }
    if (!this.state.password) {
      Alert.alert('Missing password')
      return
    }

    this.setState({ inProgress: true })
    await AsyncStorage.setItem('username', this.state.username)
    await delay(500)
    this.setState({ inProgress: false })
    this.props.navigation.navigate('LoggedIn')
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>

        <View style={styles.logoContainer}>
          <Image source={assets.logo} />
        </View>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          ref={ref => this.usernameTextInput = ref}
          editable={!this.state.inProgress}
          keyboardType="email-address"
          returnKeyType="next"
          onChangeText={(value) => this.setState({ username: value })}
          onSubmitEditing={() => this.passwordTextInput && this.passwordTextInput.focus()}
          style={styles.textInput}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          ref={ref => this.passwordTextInput = ref}
          editable={!this.state.inProgress}
          secureTextEntry
          returnKeyType="send"
          onChangeText={(value) => this.setState({ password: value })}
          onSubmitEditing={this.login}
          style={styles.textInput}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            color="#e01f1f"
            disabled={this.state.inProgress}
            onPress={this.login}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
