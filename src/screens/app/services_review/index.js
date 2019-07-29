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

class ServiceReview extends Component {

  state = {
    lng: {},
    loading: true,
    price: 0,
    service: '',
    date: '',
    location: '',
    paymentMethod: '...3234',
    barberInfo: {},
    loadingBtn: false
  }

  async componentDidMount() {
    const lng = await locale()
    const { navigation, currentUser } = this.props

    this.setState({
      lng,
      loading: false,
      price: navigation.state.params.price,
      location: navigation.state.params.location,
      date: `${navigation.state.params.daySelected.date}, a las ${navigation.state.params.hourSelected.hour}`,
      service: `Servicio de${navigation.state.params.servicesSelected.hair ? ' Cabello' : ''}${navigation.state.params.servicesSelected.bear ? ' Barba' : ''}`,
      barberInfo: this.props.navigation.state.params.item.barber
    })
  }

  navigateTo = (screen, data = {}) => {
    const { navigation } = this.props

    navigation.navigate(screen, data)
  }

  onPressNext = async () => {
    const { navigation: { state: { params } }, currentUser, navigation } = this.props
    this.setState({
      loadingBtn: true
    })
    try {
      const dataAppoiment = {
        schedule_id: `${params.daySelected._id}`,
        hour: params.hourSelected.hour,
        payment: currentUser.payment_methods[0]._id,
        barber_id: params.item.barber._id,
        services: {
          hair: {
            cost: "2"
          },
          eyebrows: {
            cost: "0"
          },
          beard: {
            cost: "1"
          }
        }
      }
      const res = await createAppoiment({ ...dataAppoiment })
      console.log(res)
      this.setState({
        loadingBtn: false
      })
    } catch (error) {
      this.setState({
        loadingBtn: false
      })
      return alertMessage('Error al procesar su reserva')
    }
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
      loadingBtn
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
                onPressProfile={() => this.navigateTo('BrbrProfile', { item: { barber: { ...barberInfo } } })}
                onPressChange={() => this.navigateTo('BrbrProfile')}
              />
              <Text
                style={styles.price}
              >
                {`MXN $${price}`}
              </Text>
              <MainButton
                white
                text={lng.RESERVE}
                onPress={() => this.onPressNext()}
                loading={loadingBtn}
              />
            </Content>
        }
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
};

export default connect(mapStateToProps)(ServiceReview);