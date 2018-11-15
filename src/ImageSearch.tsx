import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, Image } from 'react-native'
import { NavigationStackScreenOptions, NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import unsplash, { Photo, SearchResult } from './api/unsplash';

interface Props {
  navigation: NavigationScreenProp<any>
}

interface State {
  searchInput: string,
  searchResult: SearchResult<Photo>,
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    minHeight: 40,
    margin: 10,
    padding: 10,
  },
})

export default class ImageSearch extends Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: 'Search',
  }

  state = {
    searchInput: 'Köln',
    searchResult: {
      total: 0,
      total_pages: 0,
      results: [],
    }
  }

  componentDidMount() {
    if (this.state.searchInput) {
      this.search()
    }
  }

  onInputChange = (searchInput: string) => {
    console.log('searchInput', searchInput)
    this.setState({
      searchInput,
      searchResult: !searchInput ? {
        total: 0,
        total_pages: 0,
        results: [],
      } : this.state.searchResult,
    })
    // We do not trigger the search here, because unsplash accepts only 50 req/hour!
  }

  search = async () => {
    if (!this.state.searchInput) {
      console.log('reset search', this.state.searchInput)
      this.setState({
        searchResult: {
          total: 0,
          total_pages: 0,
          results: [],
        }
      })
      return
    }

    try {
      console.log('search with api call', this.state.searchInput)
      const searchResult = await unsplash.search(this.state.searchInput)
      console.log('search result', searchResult)
      this.setState({ searchResult })
    } catch (error) {
      console.warn('search error', error)
      Alert.alert('Error', error.message)
    }
  }

  renderItem = ({ item: photo }: { item: Photo }) => {
    const uri = photo.urls.thumb
    const aspectRatio = photo.width / photo.height

    const onPress = () => {
      this.props.navigation.navigate('ImageDetail', { photo })
    }

    return (
      <TouchableOpacity onPress={onPress} style={{ marginTop: 5, marginHorizontal: 5 }}>
        <Image source={{ uri }} resizeMode="cover" style={{ aspectRatio }} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, marginBottom: 5 }}>
        <TextInput
          keyboardType="web-search"
          clearButtonMode="always"
          returnKeyType="search"
          value={this.state.searchInput}
          onChangeText={this.onInputChange}
          onSubmitEditing={this.search}
          style={styles.textInput}
        />

        {/*<Text>Show {this.state.searchResult.results.length} of {this.state.searchResult.total} images</Text>*/}

        <KeyboardAwareFlatList
          data={this.state.searchResult.results}
          extraData={this.state}
          renderItem={this.renderItem}
          keyExtractor={(item: Photo) => item.id}
          style={{ flex: 1 }}
        />
      </View>
    )
  }
}
