import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';

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
import { getBarberProfile } from '../../../api/barbers';
import ImagesCustom from '../../../components/imagesCustom';
import alertMessage from '../../../utils/alertMessaje';

//api
import moment from 'moment';
import daysOfTheWeek from '../../../utils/daysOfTheWeek';

class BrbrReserve extends Component {

  state = {
    lng: {},
    loading: true,
    days: [],
    hours: [],
    price: 0,
    daySelected: null,
    hourSelected: null,
  }

  async componentDidMount() {
    const lng = await locale()
    const barberProfile = await getBarberProfile(this.props.navigation.state.params.item.barber._id)

    const dateToSelectService = this.props.navigation.state.params.dateForService
    const schedule = this.props.navigation.state.params.item.barber.schedule

    var days = []

    if (dateToSelectService == 'today' || dateToSelectService == 'thisWeek') {
      var numberDayOfTheWeek = moment().isoWeekday()
      numberDayOfTheWeek = numberDayOfTheWeek === 7 ? 1 : numberDayOfTheWeek
      const datToNow = moment().format('YYYY-MM-DD')
      const dateIn2Sundays =
        moment(datToNow)
          .add(2, 'weeks')
          .format('YYYY-MM-DD')
      var startOfWeek = moment().add(1, 'days').startOf('isoWeek');
      var endOfWeek = moment().add(1, 'days').endOf('isoWeek');

      var days = [];
      var day = startOfWeek;

      while (day <= endOfWeek) {
        days.push(
          {
            date: moment(day).format('YYYY-MM-DD'),
            day: daysOfTheWeek[moment(day).format('dddd')].dayEs,
            active: false
          }
        );
        day = day.clone().add(1, 'd');
      }

      var ultimateDays = []

      days.map((res, i) => {
        const filter = schedule.filter(scheduleRes => scheduleRes.date == res.date)
        if (filter.length != 0) {
          days[i]._id = filter[0]._id
          days[i].hours = filter[0].hours
          days[i].active = false

          ultimateDays.push(days[i])
        }
      })

      days = ultimateDays
    }

    if (dateToSelectService == 'nextWeek') {

    }

    this.setState({
      lng,
      loading: false,
      barberInfo: barberProfile.data,
      price: this.props.navigation.state.params.price,
      days
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

    if (key == 'days') {
      state.hours = state[key][i].hours
      state.daySelected = state[key][i]
    }

    if (key == 'hours') {
      state.hourSelected = state[key][i]
    }

    this.setState({
      ...state,
    })
  }

  dayList = () => (
    <ScrollView
      horizontal
    >
      {
        this.state.days.map((res, i) =>
          <TouchableOpacity
            key={i}
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
            key={i}
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
              {res.hour}
            </Text>
          </TouchableOpacity>
        )
      }
    </ScrollView>
  )

  onPressNext = () => {
    const { state } = this
    const { navigation } = this.props

    if (state.daySelected && state.hourSelected) {
      navigation.navigate('ServiceReview',
        {
          ...this.props.navigation.state.params,
          daySelected: state.daySelected,
          hourSelected: state.hourSelected
        }
      )

    } else {
      alertMessage('Debe seleccionar un dia y una hora')
    }
  }

  render() {

    const {
      lng,
      loading,
      price,
      barberInfo,
      hours
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
                      {barberInfo.qualification}
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
                    <View
                      style={styles.housContainer}
                    >
                      {
                        hours.length != 0 &&
                        <Text
                          style={styles.lblT}
                        >
                          {lng.hour}
                        </Text>
                      }
                      {
                        this.hourList()
                      }
                    </View>
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
                  onPress={() => this.onPressNext()}
                />
              }
            </React.Fragment>
        }
      </Container>
    );
  }
}

export default connect()(BrbrReserve);