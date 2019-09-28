import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import Loading from '../../../components/loading';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import MainButton from '../../../components/button';
import BrbrPaymentReview from '../../../components/brbr_payment_review';
import ModalAlert from '../../../components/modal_alerts';

//customs
import styles from './styles';

//locale
import locale from '../../../locale';

//icons
import calendarIcon from '../../../assets/icons/calendar.png';
import locationIcon from '../../../assets/icons/marker.png';

//api
import { createAppoiment } from '../../../api/appoinments';

//utils
import parseError from '../../../utils/parse_error';
import alertMessage from '../../../utils/alertMessaje';

import checkIcon from '../../../assets/icons/check.png';
import { StackActions, NavigationActions } from 'react-navigation';
import { getObjectCard } from '../../../api/payment';
import { GetMyInfo } from '../../../api/user';
import { SET_USER } from '../../../actions/user';
import { createDeviceSessionId } from 'openpay-react-native';

import { withNavigationFocus } from "react-navigation";
import getFormatDate from '../../../utils/getFormatDate';

class ServiceReview extends Component {

  state = {
    lng: {},
    loading: true,
    price: 0,
    service: '',
    date: '',
    location: '',
    paymentMethod: '',
    barberInfo: {},
    loadingBtn: false,
    modalData: {
      visible: false
    },
  }

  async componentDidMount() {
    await this.getData()
  }

  getData = async () => {
    const lng = await locale()
    const { navigation, currentUser } = this.props
    this.setState({ loading: true })
    try {
      const filter = currentUser.payment_methods.filter(res => res.use)
      const cardObject = await getObjectCard(currentUser.openpay_id, filter[0].token)
      const card = await cardObject.json()
      const paymentMethod = `...${card.card_number[card.card_number.length - 1]}${card.card_number[card.card_number.length - 2]}${card.card_number[card.card_number.length - 3]}${card.card_number[card.card_number.length - 4]}`
      this.setState({
        paymentMethod
      })
    } catch (error) {
    }
    this.setState({
      lng,
      loading: false,
      price: navigation.state.params.price,
      location: navigation.state.params.location,
      date: `${getFormatDate(navigation.state.params.daySelected.date, 'es')}, a las ${navigation.state.params.hourSelected.hour}`,
      service: `Servicio de${navigation.state.params.servicesSelected.hair ? ' Cabello' : ''}${navigation.state.params.servicesSelected.bear ? ' Barba' : ''}`,
      barberInfo: this.props.navigation.state.params.item.barber
    })
  }

  async componentDidUpdate(props, state) {
    if (props.isFocused !== this.props.isFocused && this.props.isFocused) {
      await this.getData()
    }
  }

  navigateTo = (screen, data = {}) => {
    const { navigation } = this.props

    navigation.navigate(screen, data)
  }

  onPressNext = async () => {
    const { navigation: { state: { params } }, currentUser, navigation, dispatch } = this.props
    this.setState({
      loadingBtn: true
    })
    try {
      if (currentUser.payment_methods.length != 0) {
        if (currentUser.auth_identity) {
          const filter = currentUser.payment_methods.filter(res => res.use)

          var hairCost = navigation.state.params.servicesSelected.hair ? navigation.state.params.item.barber.services.hair.cost : '0'
          if (currentUser.promotion.use_code.code) {

            const percent = (hairCost / 100) * parseInt(currentUser.promotion.use_code.percentage)
            hairCost = hairCost - percent
          }

          hairCost = parseFloat(hairCost).toFixed(2)

          const device_session_id = await createDeviceSessionId()

          const dataAppoiment = {
            device_session_id,
            schedule_id: `${params.daySelected._id}`,
            hour: params.hourSelected.hour,
            location: [navigation.state.params.positionAppoint.lat, navigation.state.params.positionAppoint.lng, this.state.location],
            payment: filter[0]._id,
            barber_id: params.item.barber._id,
            services: {
              hair: {
                cost: `${hairCost}`
              },
              eyebrows: {
                cost: "0"
              },
              beard: {
                cost: navigation.state.params.servicesSelected.bear ? navigation.state.params.item.barber.services.beard.cost : '0'
              }
            }
          }

          await createAppoiment({ ...dataAppoiment })

          const resUser = await GetMyInfo(currentUser._id)

          await dispatch({
            type: SET_USER,
            payload: {
              ...resUser.data
            }
          });

          this.setState({
            modalData: {
              visible: true
            }
          })
          this.setState({
            loadingBtn: false
          })
        } else {
          this.setState({
            loadingBtn: false
          })
          return alertMessage('Aun no tienes tu identificacion personal!')
        }
      } else {
        this.setState({
          loadingBtn: false
        })
        return alertMessage('No tienes ningun metodo de pago!')
      }
    } catch (error) {
      console.log(error.response)
      this.setState({
        loadingBtn: false
      })
      return alertMessage('La tarjeta a sido declinada, ponte en contacto con tu banco.')
    }
  }

  onPressCompleteRegister = () => {
    this.setState({
      modalData: {
        visible: true
      }
    })
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
  }

  render() {

    const {
      lng,
      loading,
      price,
      service,
      date,
      location,
      paymentMethod,
      barberInfo,
      loadingBtn,
      modalData: {
        visible
      }
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.detail_service}
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
              <View
                style={styles.header}
              >
                <View
                  style={styles.headerHeader}
                >
                  <Image
                    source={calendarIcon}
                    style={styles.calendarIcon}
                  />
                  <View
                    style={styles.headerHeaderText}
                  >
                    <Text
                      style={styles.date}
                    >
                      {date}
                    </Text>
                    <Text
                      style={styles.service}
                    >
                      {service}
                    </Text>
                  </View>
                </View>
                <View
                  style={styles.headerFooter}
                >
                  <Image
                    source={locationIcon}
                  />
                  <Text
                    style={styles.location}
                  >
                    {location}
                  </Text>
                </View>
              </View>
              <BrbrPaymentReview
                lng={lng}
                avatar={barberInfo.photo}
                name={barberInfo.name}
                city={barberInfo.address.description}
                stars={barberInfo.qualification}
                paymentMethod={paymentMethod}
                change
                // date={date}
                // hour={this.props.navigation.state.params.hourSelected.hour}
                onPressProfile={() => this.navigateTo('BrbrProfile', { item: { barber: { ...barberInfo } } })}
                onPressChange={() => this.navigateTo('PaymentMethodsList')}
              />
              <Text
                style={styles.price}
              >
                {`MXN $${parseFloat(price).toFixed(2)}`}
              </Text>
              {
                this.props.currentUser.promotion.use_code.code &&
                <Text style={styles.porcent}>Este Servicio tiene un código de descuento del {this.props.currentUser.promotion.use_code.percentage}%</Text>
              }
              <MainButton
                white
                text={lng.RESERVE}
                onPress={() => this.onPressNext()}
                loading={loadingBtn}
              />
            </Content>
        }
        <ModalAlert
          visible={visible}
          title={
            <Image
              source={checkIcon}
            />
          }
          message={'Tu reserva se hizo, Puedes ver el seguimiento en tu perfil'}
          btnTitle={'Aceptar'}
          onPress={() => this.onPressCompleteRegister()}
        />
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
};

export default withNavigationFocus(connect(mapStateToProps)(ServiceReview));