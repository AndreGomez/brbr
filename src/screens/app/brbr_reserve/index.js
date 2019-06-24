import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import Loading from '../../../components/loading';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import MainButton from '../../../components/button';

//customs
import styles from './styles';

//locale
import locale from '../../../locale';

//icons
import vipIcon from '../../../assets/icons/vip.png';
import portraitBack from '../../../assets/images/portrait.png';
import starIcon from '../../../assets/icons/star.png';
import brbr_sithIcon from '../../../assets/icons/brbr_sith.png';

class BrbrReserve extends Component {

  state = {
    lng: {},
    loading: true,
    name: 'Andre Gomez',
    city: 'San Salvador',
    stars: 4.5,
    cuts: 120,
    avatar: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
    days: [
      { active: false, day: 'Lunes' },
      { active: false, day: 'Martes' },
      { active: false, day: 'Miercoles' },
      { active: false, day: 'Jueves' },
      { active: false, day: 'Viernes' },
      { active: false, day: 'Sabado' },
      { active: false, day: 'Domingo' }
    ],
    hours: [
      { active: false, day: '12:30 PM' },
      { active: false, day: '10:30 AM' },
      { active: false, day: '9:30 AM' },
      { active: false, day: '3:30 PM' },
      { active: false, day: '1:00 AM' },
      { active: false, day: '2:30 PM' },
      { active: false, day: '7:30 AM' }
    ],
    price: 270
  }

  async componentDidMount() {
    const lng = await locale()
    this.setState({
      lng,
      loading: false
    })
  }

  setItemList = async (key, i) => {
    const { state } = this

    await state[key].map((res, e) => {
      if (i != e) {
        state[key][e].active = false
      } else {
        state[key][e].active = true
      }
    })

    this.setState({
      ...state
    })
  }

  dayList = () => (
    <ScrollView
      horizontal
    >
      {
        this.state.days.map((res, i) =>
          <TouchableOpacity
            onPress={() => this.setItemList('days', i)}
          >
            <Text
              style={
                [
                  styles.days,
                  res.active &&
                  styles.activeText
                ]
              }
            >
              {res.day}
            </Text>
          </TouchableOpacity>
        )
      }
    </ScrollView>
  )

  hourList = () => (
    <ScrollView
      horizontal
    >
      {
        this.state.hours.map((res, i) =>
          <TouchableOpacity
            onPress={() => this.setItemList('hours', i)}
            style={
              [
                styles.hour,
                res.active &&
                styles.hourActive
              ]
            }
          >
            <Text
              style={
                [
                  styles.hours,
                  res.active &&
                  styles.activeText
                ]
              }
            >
              {res.day}
            </Text>
          </TouchableOpacity>
        )
      }
    </ScrollView>
  )

  render() {

    const {
      lng,
      loading,
      name,
      city,
      stars,
      cuts,
      avatar,
      price
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
            <Image
              style={styles.vipIcon}
              source={vipIcon}
            />
          }
        />
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
            {name}
          </Text>
          <Text
            style={styles.city}
          >
            {city}
          </Text>
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
                {stars}
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
            <Image
              style={styles.avatar}
              source={{ uri: avatar }}
            />
          </View>
          <View
            style={styles.section}
          >
            <Text
              style={styles.stars}
            >
              {cuts}
            </Text>
            <Text
              style={styles.lbl}
            >
              {lng.cuts}
            </Text>
          </View>
        </View>
        <View
          style={styles.separator}
        />
        {
          loading ?
            <Loading />
            :
            <Content
              bounces={false}
              contentContainerStyle={styles.content}
            >
              <Text
                style={styles.lblT}
              >
                {lng.day}
              </Text>
              {
                this.dayList()
              }
              <Text
                style={styles.lblT}
              >
                {lng.hour}
              </Text>
              {
                this.hourList()
              }
              <Text
                style={styles.price}
              >
                {`MXN $${price}`}
              </Text>
            </Content>
        }
        {
          !loading &&
          <MainButton
            bottom
            icon={brbr_sithIcon}
            text={lng.reserve_now}
            onPress={() => this.props.navigation.navigate('ServiceReview')}
          />
        }
      </Container>
    );
  }
}

export default connect()(BrbrReserve);