
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//customs
import styles from './styles';
import locale from '../../../locale';

//component
import MainButton from '../../../components/button';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';

//icons
import duiIcons from '../../../assets/icons/dui.png';
import cameraIcons from '../../../assets/icons/camera.png';
import id_empty from '../../../assets/icons/id_empty.png'

//camera
import Camera from '../../../utils/image_picker';

class UploadDUI extends Component {

  state = {
    lng: {},
    img: null
  }

  async componentDidMount() {
    const lng = await locale()

    this.setState({
      lng
    })
  }

  navigateTo = (screen) => {
    const { navigation } = this.props

    navigation.navigate(screen)
  }

  goBack = () => {
    const { navigation } = this.props

    navigation.goBack()
  }

  onPressTakePhoto = async () => {
    try {
      const res = await Camera.ImageCamera()
      this.setState({
        img: res.uri
      })
    } catch (error) {
      console.log(error)
    }
  }

  onPressLibrary = async () => {
    try {
      const res = await Camera.ImageLibrary()
      this.setState({
        img: res.uri
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {

    const {
      lng,
      img
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.id_oficial}
            />
          }
          left={
            <BackButton
              onPress={() => this.goBack()}
            />
          }
        />
        <Content
          contentContainerStyle={styles.content}
          bounces={false}
        >
          <View
            style={styles.cameraContainer}
          >
            <TouchableOpacity
              onPress={() => this.onPressLibrary()}
            >
              <Text
                style={styles.cameraText}
              >
                {lng.galery}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPressTakePhoto()}
            >
              <Image
                source={cameraIcons}
              />
            </TouchableOpacity>
          </View>
          <Image
            style={styles.icon}
            source={duiIcons}
          />
          <Text
            style={styles.title}
          >
            {lng.id_oficial}
          </Text>
          <Text
            style={styles.label}
          >
            {lng.id_oficial_label1}
          </Text>
          <Image
            style={img ? styles.img : styles.empty_img}
            source={img ? { uri: img } : id_empty}
            resizeMode={'contain'}
          />
          <Text
            style={
              [
                styles.label,
                styles.label2
              ]
            }
          >
            {lng.id_oficial_label2}
          </Text>
          <View
            style={styles.btnContainer}
          >
            <MainButton
              raised_green
              text={lng.skip}
              sm
              onPress={() => this.navigateTo('FirstTime')}
            />
            <MainButton
              white
              text={lng.next}
              sm
              onPress={() => this.navigateTo('FirstTime')}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect()(UploadDUI);