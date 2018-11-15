import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Alert, TouchableHighlight, TouchableOpacity, Image } from 'react-native'
import { NavigationStackScreenOptions } from 'react-navigation';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import unsplash, { Photo, SearchResult } from './api/unsplash';

interface Props {
}

interface State {
  searchInput: string,
  searchResult: SearchResult<Photo>,
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    minHeight: 40,
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

  renderItem = ({ item }: { item: Photo }) => {
    const uri = item.urls.thumb
    const aspectRatio = item.width / item.height

    return (
      <TouchableOpacity style={{ marginTop: 5, marginHorizontal: 5 }}>
        <Image source={{ uri }} resizeMode="cover" style={{ aspectRatio }} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, marginBottom: 5 }}>
        <TextInput
          keyboardType="web-search"
          returnKeyType="search"
          value={this.state.searchInput}
          onChangeText={this.onInputChange}
          onSubmitEditing={this.search}
          style={styles.textInput}
        />

        <Text>Show {this.state.searchResult.results.length} of {this.state.searchResult.total} images</Text>

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
