import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import moment from 'moment';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Loading from '../../../components/loading';
import MainButton from '../../../components/button';
import ImagesCustom from '../../../components/imagesCustom';
import ModalAlert from '../../../components/modal_alerts';

//customs
import styles from './styles';
import successMessage from '../../../utils/success_message';

//locale
import locale from '../../../locale';

//icons
import locationIcon from '../../../assets/icons/location_light.png';
import calendarIcon from '../../../assets/icons/calendar_ligth.png';
import starIcon from '../../../assets/icons/star.png';
import arrow_green from '../../../assets/icons/arrow_green.png';
import timerIcon from '../../../assets/icons/timer.png';

//api
import {
  updateAppoinment
} from '../../../api/appoinments';
import { StackActions, NavigationActions } from 'react-navigation';
import getFormatDate from '../../../utils/getFormatDate';
import serviceEnES from '../../../utils/getServiceEnEs';

class DateDetail extends Component {

  state = {
    loading: true,
    lng: {},
    timer: null,
    counter: 0.0,
    loadingBtnCancel: false,
    modal: {
      visible: false
    },
    loadingInitCancel: false
  }

  async componentDidMount() {
    try {
      const lng = await locale()
      this.setState({
        loading: false,
        lng,
        reserveDetail: this.props.navigation.state.params,
        // reserveDetail: {
        //   user: {
        //     photo: null,

        //   },
        //   barber: {
        //     name: 'Juan'
        //   },
        //   date: '2018-01-02',
        //   services: {
        //     beard: {
        //       cost: 100
        //     },
        //     hair: {
        //       cost: 100
        //     },
        //     eyebrows: {
        //       cost: 100
        //     }
        //   },
        //   hour: '12:20',
        //   location: [12, 21, 'Col la cima 2']
        // }
      })

      if (this.props.navigation.state.params.state === 'in progress') {
        let timer = setInterval(this.tick, 1000);
        this.setState({ timer });
      }
    } catch (error) {
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick = () => {
    const {
      reserveDetail
    } = this.state

    const start_time = moment(reserveDetail.start_time).format('YYYY-MM-DD HH:mm:ss')
    const end_time = moment().format('YYYY-MM-DD HH:mm:ss')
    const res = moment.utc(moment(end_time, "YYYY-MM-DD HH:mm:ss").diff(moment(start_time, "YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss")
    this.setState({
      counter: res
    });
  }

  navigateTo = (screen, data = { data }) => {
    const { navigation } = this.props

    navigation.navigate(screen, { ...data })
  }

  toggleModal = () => {
    this.setState({
      modal: {
        visible: !this.state.modal.visible
      }
    })
  }

  onPressFinishService = async () => {
    const {
      reserveDetail
    } = this.state

    this.setState({
      loadingInitCancel: true
    })

    try {
      const initDate = moment().format('YYYY-MM-DD HH:mm:ss')

      await updateAppoinment(reserveDetail._id, {
        state: 'finish',
        time: initDate
      })

      successMessage('Servicio finalizado exitosamente!')

      const actionToDispatch = StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: 'drawer',
          }),
        ]
      });
      this.props.navigation.dispatch(actionToDispatch);

    } catch (error) {
      this.setState({
        loadingInitCancel: false
      })
    }
  }

  startDate = () => {
    Alert.alert(
      'Brbr App',
      'Seguro que quieres iniciar?',
      [
        {
          text: 'No',
          onPress: () => { },
          style: 'destructive',
        },
        {
          text: 'Si', onPress: async () => {
            const {
              reserveDetail
            } = this.state

            this.setState({
              loadingInitCancel: true
            })

            try {
              const initDate = moment().format('YYYY-MM-DD HH:mm:ss')

              await updateAppoinment(reserveDetail._id, {
                state: 'in progress',
                time: initDate
              })

              successMessage('Reservacion iniciada!')

              const actionToDispatch = StackActions.reset({
                index: 0,
                key: null,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'drawer',
                  }),
                ]
              });
              this.props.navigation.dispatch(actionToDispatch);

            } catch (error) {
              this.setState({
                loadingInitCancel: false
              })
            }
          }
        },
      ],
      { cancelable: false },
    );
  }

  cancelDate = async () => {
    Alert.alert(
      'Brbr App',
      'Seguro que quieres cancelar?',
      [
        {
          text: 'No',
          onPress: () => { },
          style: 'destructive',
        },
        {
          text: 'Si', onPress: async () => {
            const {
              reserveDetail
            } = this.state

            this.setState({
              loadingBtnCancel: true
            })

            try {

              await updateAppoinment(reserveDetail._id, {
                state: 'canceled'
              })

              successMessage('Reservacion cancelada exitosamente!')

              const actionToDispatch = StackActions.reset({
                index: 0,
                key: null,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'drawer',
                  }),
                ]
              });
              this.props.navigation.dispatch(actionToDispatch);

            } catch (error) {
              this.setState({
                loadingBtnCancel: false
              })
            }
          }
        },
      ],
      { cancelable: false },
    );
  }

  onPressReport = () => {
    Linking.openURL('https://wa.me/5215612761842')
  }

  render() {

    const {
      loading,
      lng,
      modal,
      reserveDetail,
      loadingBtnCancel,
      loadingInitCancel,
      counter,
    } = this.state

    const {
      navigation
    } = this.props


    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.date_program}
            />
          }
          left={
            <BackButton
              onPress={() => this.props.navigation.goBack()}
            />
          }
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
                style={styles.detail}
              >
                {lng.detail}
              </Text>
              <View
                style={styles.dateContainer}
              >
                <View
                  style={styles.dateContainerTop}
                >
                  <View
                    style={
                      [
                        styles.row,
                        styles.beet
                      ]
                    }
                  >
                    <View
                      style={styles.row}
                    >
                      <ImagesCustom
                        roundedNormal
                        img={reserveDetail.user.photo ? { uri: reserveDetail.user.photo } : null}
                      />
                      <View>
                        <Text
                          style={styles.client}
                        >
                          {lng.brbr_profile_title}
                        </Text>
                        <Text
                          style={styles.name}
                          numberOfLines={1}
                        >
                          {`${reserveDetail.barber.name}`}
                        </Text>
                      </View>
                    </View>

                    <View>
                      <Text
                        style={styles.dateAgo}
                      >
                        {reserveDetail.date}
                      </Text>
                      <MainButton
                        containerStyle={styles.btn}
                        xsRaisedGreen
                        text={lng.CHAT}
                        icon={arrow_green}
                        onPress={() => this.navigateTo('Chat')}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.row,
                      styles.beet,
                      styles.totalContainer
                    ]}
                  >
                    <Text
                      style={styles.services}
                    >
                      {`${lng.service_to}${Object.keys(reserveDetail.services).map(res => {
                        if (reserveDetail.services[res].cost != 0) {
                          return ` ${serviceEnES(res)}`
                        } else {
                          return ''
                        }
                      })}`.replace(',', ' ').replace(' ,', ' ').replace(', ', ' ')}
                    </Text>
                    <Text
                      style={styles.total}
                    >
                      {`MXN $${reserveDetail.services.beard.cost + reserveDetail.services.hair.cost + reserveDetail.services.eyebrows.cost}`}
                    </Text>
                  </View>
                </View>
                <View
                  style={styles.dateContainerBottom}
                >
                  <Text
                    style={styles.dateHour}
                  >
                    {lng.day_hour}
                  </Text>
                  <View
                    style={styles.item}
                  >
                    <Image
                      source={calendarIcon}
                    />
                    <Text
                      style={styles.dateHourrr}
                    >
                      {`${getFormatDate(reserveDetail.date, 'es')}, ${reserveDetail.hour}`}
                    </Text>
                  </View>
                  <View
                    style={
                      [
                        styles.row,
                        styles.beet,
                        { alignItems: 'center' }
                      ]
                    }
                  >
                    <Text
                      style={styles.dateHour}
                    >
                      {lng.location}
                    </Text>
                    {/* <MainButton
                      xsRaisedGreen
                      text={lng.view_map}
                      icon={arrow_green}
                      onPress={() => this.navigateTo('MapDate')}
                    /> */}
                  </View>
                  <View
                    style={styles.item}
                  >
                    <Image
                      source={locationIcon}
                    />
                    <Text
                      style={styles.dateHourrr}
                      numberOfLines={2}
                    >
                      {`${reserveDetail.location[2]}`}
                    </Text>
                  </View>
                </View>
              </View>
              {
                navigation.state.params.service &&
                <View
                  style={styles.timer}
                >
                  <View
                    style={styles.row}
                  >
                    <Image
                      source={timerIcon}
                    />
                    <Text
                      style={styles.timeText}
                    >
                      {lng.time}
                    </Text>
                  </View>
                  <Text
                    style={styles.time}
                  >
                    {counter}
                  </Text>
                </View>
              }
              <MainButton
                white
                containerStyle={styles.btnReport}
                text={'Reportar un problema'}
                onPress={() => this.onPressReport()}
              />
            </Content>
        }
        {
          navigation.state.params.service &&
          <MainButton
            bottom
            grey
            text={lng.finish_service}
            onPress={() => this.toggleModal()}
          />
        }
        <ModalAlert
          lng={lng}
          finish
          visible={modal.visible}
          message={lng.secure_finish}
          close
          onPressClose={() => this.toggleModal()}
          onPress={() => this.onPressFinishService()}
          btnTitle={lng.accept}
        />
      </Container>
    );
  }
}

export default connect()(DateDetail);