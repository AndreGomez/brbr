import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

//locale
import locale from '../../../locale';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Loading from '../../../components/loading';

//customs
import styles from './styles';
import ImagesCustom from '../../../components/imagesCustom';

class Galery extends Component {

  state = {
    loading: true,
    lng: {},
    images: [],
    imageSelect: {},
    extraData: false
  }

  async componentDidMount() {
    const lng = await locale()

    const { navigation } = this.props
    this.setState({
      lng,
      loading: false,
      images: navigation.state.params.images,
      imageSelect: navigation.state.params.item
    })
  }

  renderImgs = () => (
    <FlatList
      data={this.state.images}
      keyExtractor={(a, i) => `${i}`}
      horizontal
      extraData={this.state.extraData}
      renderItem={(item) => this.renderItem(item.item, item.index)}
      contentContainerStyle={styles.list}
    />
  )

  renderItem = (item, i) => (
    <TouchableOpacity
      onPress={() => this.onPressImg(item.img, i)}
      style={
        [
          styles.imgContainer,
          i === this.state.imageSelect.index &&
          styles.select
        ]
      }
    >
      <ImagesCustom
        listy
        img={{ uri: item.img }}
      />
    </TouchableOpacity>
  )

  onPressImg = (item, i) => {
    const { imageSelect, extraData } = this.state

    imageSelect.imageSelect = item
    imageSelect.index = i

    this.setState({
      imageSelect,
      extraData: !extraData
    })
  }


  render() {

    const {
      loading,
      lng,
      imageSelect
    } = this.state

    return (
      <ImageBackground
        style={styles.container}
        resizeMode={'contain'}
        source={{ uri: imageSelect.imageSelect }}
        onLoadStart={() => this.setState({ loading: true })}
        onLoadEnd={() => this.setState({ loading: false })}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.galery}
            />
          }
          left={
            <BackButton
              onPress={() => this.props.navigation.goBack()}
            />
          }
        />
        <Content
          bounces={false}
        >
          {
            loading ?
              <Spinner
                color={"white"}
                style={styles.spinner}
              />
              :
              null
          }
          <View
            style={styles.graView}
          >
            <View
              style={styles.linearGradient}
            >
              {
                this.renderImgs()
              }
            </View>
          </View>
        </Content>
      </ImageBackground>
    );
  }
}

export default connect()(Galery);