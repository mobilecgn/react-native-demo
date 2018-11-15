import React, { Component } from 'react'
import { Button, Text, StyleSheet, TextInput, Image, View } from 'react-native'
import { NavigationStackScreenOptions } from 'react-navigation';
import { KeyboardAwareScrollView as ScrollView } from 'react-native-keyboard-aware-scroll-view'

interface Props {
}

interface State {
  username: string
  password: string
}

const images = {
  logo: require('./mobilecgn_logo.png')
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

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <View style={styles.logoContainer}>
          <Image source={images.logo} />
        </View>

        <Text style={styles.label}>Username:</Text>
        <TextInput style={styles.textInput} />
        <Text style={styles.label}>Password:</Text>
        <TextInput style={styles.textInput} />

        <View style={styles.buttonContainer}>
          <Button title="Login" color="#e01f1f" onPress={() => {}} />
        </View>
      </ScrollView>
    )
  }
}
