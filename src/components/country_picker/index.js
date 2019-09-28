import React, { Component } from 'react';
import { Modal, Image, Text, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import { Content, Container, Input } from 'native-base'

//custom
import styles from './styles';

//component

//assets
import closeModal from '../../assets/icons/close_modal.png';

import countryList from './data';
import { SafeAreaView } from 'react-navigation';
import nodeEmoji from 'node-emoji';
import MainInput from '../input';

export default class CountryPicker extends Component {

  state = {
    visible: this.props.visible,
    dataSearch: null,
    searchText: '',
    data: Object.keys(countryList)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.visible == true && this.state.visible == false) {
      this.setState({
        visible: nextProps.visible,
      })
    }
    if (nextProps.visible == false && this.state.visible == true) {
      this.setState({
        visible: nextProps.visible,
      })
    }
  }

  onSearch = (e) => {

    const { state } = this
    let text = e.toLowerCase()
    let item = state.data
    let filteredName = item.filter((item) => {
      return countryList[item].name.spa.toLowerCase().match(text)
    })
    if (!text || text === '') {
      state.dataSearch = null
      this.setState({
        ...state
      })
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      state.dataSearch = []
      this.setState({
        ...state
      })
    } else if (Array.isArray(filteredName)) {
      state.dataSearch = filteredName
      this.setState({
        ...state
      })
    }
    this.setState({
      searchText: e
    })
  }

  render() {

    const {
      visible,
      data,
      dataSearch,
      searchText
    } = this.state

    return (
      <Modal
        visible={visible}
        transparent
        animationType={'fade'}
      >
        <Container
          style={styles.container}
        >
          <SafeAreaView
            style={{ flex: 1 }}>
            <Content
              contentContainerStyle={styles.content}
            >
              <View
                style={styles.header}>
                <TouchableOpacity
                  onPress={() => this.props.onPressClose()}>
                  <Image
                    source={closeModal} />
                </TouchableOpacity>
                <TextInput
                  value={searchText}
                  placeholder={'Buscar...'}
                  onChangeText={(text) => this.onSearch(text)}
                  style={styles.input} />
              </View>
              <FlatList
                keyExtractor={(a, i) => `${i}`}
                data={dataSearch ? dataSearch : data}
                renderItem={(res) => {
                  return <TouchableOpacity
                    onPress={() => this.props.onPressItem(countryList[res.item])}
                    style={styles.item}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center', }}>
                      <Text
                        style={styles.emoji}>
                        {nodeEmoji.get(countryList[res.item].flag)}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={styles.title}>

                        {countryList[res.item].name.spa}
                      </Text>
                    </View>

                    <Text
                      style={styles.callingCode}>
                      +({countryList[res.item].callingCode})
                </Text>
                  </TouchableOpacity>
                }} />
            </Content>
          </SafeAreaView>
        </Container>
      </Modal>
    );
  }
}