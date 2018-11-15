import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { NavigationStackScreenOptions } from 'react-navigation';

interface Props {
}

interface State {
}

export default class ImageSearch extends Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: 'Search',
  }

  render() {
    return (
      <ScrollView>
        <Text>ImageSearch</Text>
      </ScrollView>
    )
  }
}
