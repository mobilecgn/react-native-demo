import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { NavigationScreenProp } from 'react-navigation';
import { Photo } from './api/unsplash';

interface Props {
  navigation: NavigationScreenProp<any>
}

export default class ImageSearch extends Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<any> }) => {
    const photo: Photo = navigation.getParam('photo')
    return {
      title: photo && photo.id,
    }
  }

  onInputChange = (searchInput: string) => {
    console.log('searchInput', searchInput)
    this.setState({
      searchInput,
    })
    // We do not trigger the search here, because unsplash accepts only 50 req/hour!
  }

  render() {
    const photo: Photo = this.props.navigation.getParam('photo')
    if (!photo) {
      return <Text>Photo not found</Text>
    }

    const uri = photo.urls.thumb
    const aspectRatio = photo.width / photo.height

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image source={{ uri }} resizeMode="cover" style={{ aspectRatio }} />
      </View>
    )
  }
}
