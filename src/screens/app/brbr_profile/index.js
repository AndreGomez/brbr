import React, { Component } from 'react';
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';

//component
import Loading from '../../../components/loading';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Switch from '../../../components/switch';
import Comment from '../../../components/comment';
import MainButton from '../../../components/button';
import ImagesCustom from '../../../components/imagesCustom';

//customs
import styles from './styles';

//locale
import locale from '../../../locale';

//icons
import vipIcon from '../../../assets/icons/vip.png';
import portraitBack from '../../../assets/images/portrait.png';
import starIcon from '../../../assets/icons/star.png';
import arrow_green from '../../../assets/icons/arrow_green.png'
import { getBarberProfile, getBarberReviews } from '../../../api/barbers';

import Review from '../review';

class BrbrProfile extends Component {

  state = {
    lng: {},
    loading: true,
    name: 'Andre Gomez',
    city: 'San Salvador',
    stars: 4.5,
    cuts: 120,
    avatar: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
    switchActive: true,
    comments: [],
    barberInfo: null
  }

  async componentDidMount() {
    try {
      const lng = await locale()

      const barberProfile = await getBarberProfile(this.props.navigation.state.params.item.barber._id)
      const comments = await getBarberReviews(this.props.navigation.state.params.item.barber._id)
      this.setState({
        lng,
        loading: false,
        barberInfo: barberProfile.data,
        comments: comments.data
      })
    } catch (error) {
    }
  }

  renderComments = () => (
    <FlatList
      data={this.state.comments}
      ListEmptyComponent={
        <Text
          style={styles.empty}
        >
          Este barbero aun no tiene comentarios
        </Text>
      }
      renderItem={(item) =>
        <Comment
          avatar={item.item.user.photo}
          title={item.item.title}
          name={`${item.item.user.name}`}
          date={item.item.date}
          body={item.item.comment}
        />
      }
      style={{ paddingBottom: 20 }}
      keyExtractor={(a, i) => `${i}`}
    />
  )

  renderPhotos = () => (
    <FlatList
      data={this.state.barberInfo.gallery}
      keyExtractor={(a, i) => `${i}`}
      renderItem={(item) => this.renderPhoto(item.item, item.index)}
      numColumns={4}
      key={true}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.rowColumn}
      ListEmptyComponent={<Text
        style={styles.empty}
      >
        Este barbero aun no tiene fotos
      </Text>}
    />
  )

  renderPhoto = (item, i) => (
    <TouchableOpacity
      onPress={() => this.onPressPhoto(item.img, i)}
    >
      <ImagesCustom
        list
        img={{ uri: item.img }}
      />
    </TouchableOpacity>
  )

  onPressPhoto = (item, i) => {
    this.navigateTo('Galery', { item: { imageSelect: item, index: i }, images: this.state.barberInfo.gallery })
  }

  navigateTo = (screen, data = {}) => {
    const { navigation } = this.props

    navigation.navigate(screen, data)
  }

  render() {

    const {
      lng,
      loading,
      switchActive,
      barberInfo
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.brbr_profile_title}
            />
          }
          left={
            <BackButton
              onPress={() => this.props.navigation.goBack()}
            />
          }
          right={
            !loading &&
            barberInfo.vip &&
            <Image
              style={styles.vipIcon}
              source={vipIcon}
            />
          }
        />
        {
          loading ?
            <Content>
              <Spinner
                color={'white'}
              />
            </Content>
            :
            <React.Fragment>
              <Image
                style={styles.portraitBack}
                source={portraitBack}
              />
              <View
                style={styles.portraitBackFront}
              >
                <Text
                  style={styles.name}
                >
                  {barberInfo.name}
                </Text>
                <Text
                  style={styles.city}
                >
                  {barberInfo.address.description}
                </Text>
                <View
                  style={{ position: 'absolute', bottom: 10, left: 10 }}
                >
                  <Text
                    style={styles.talk}
                  >
                    Habla: ES{barberInfo.languages.english && '/EN'}{barberInfo.languages.french && '/FR'}
                  </Text>
                </View>
                {/* <View
                  style={{ position: 'absolute', bottom: 10, right: 10 }}
                >
                  <MainButton
                    xsRaisedGreen
                    text={lng.RESERVE}
                    icon={arrow_green}
                    onPress={() => this.navigateTo('BrbrReserve', {})}
                  />
                </View> */}
              </View>
              <View
                style={styles.interSection}
              >
                <View
                  style={styles.section}
                >
                  <View
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Text
                      style={styles.stars}
                    >
                      {
                        parseFloat(barberInfo.qualification).toFixed(1)
                      }
                    </Text>
                    <Image
                      source={starIcon}
                    />
                  </View>
                  <Text
                    style={styles.lbl}
                  >
                    {lng.rese}
                  </Text>
                </View>
                <View
                  style={styles.section}
                >
                  <ImagesCustom
                    styles={styles.avatar}
                    img={barberInfo.photo ? { uri: barberInfo.photo } : null}
                  />
                </View>
                <View
                  style={styles.section}
                >
                  <Text
                    style={styles.stars}
                  >
                    {0}
                  </Text>
                  <Text
                    style={styles.lbl}
                  >
                    {lng.cuts}
                  </Text>
                </View>
              </View>
              <View
                style={styles.switch}
              >
                <Switch
                  st={lng.galery}
                  ft={lng.rese}
                  onPress={() => this.setState({ switchActive: !this.state.switchActive })}
                  active={switchActive}
                />
              </View>
            </React.Fragment>
        }
        {
          !loading &&
          <Content
            contentContainerStyle={styles.content}
          >

            {
              switchActive ?
                this.renderComments()
                :
                this.renderPhotos()
            }
          </Content>
        }
        {/* <Review
          visible={true}
          brbrId={'5d4b93dd93a2ad0017fd96b1'}
        /> */}
      </Container>
    );
  }
}

export default connect()(BrbrProfile);