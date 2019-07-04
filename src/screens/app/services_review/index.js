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

class ServiceReview extends Component {

  state = {
    lng: {},
    loading: true,
    name: 'Andre Gomez',
    city: 'San Salvador',
    stars: 4.5,
    avatar: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
    price: 270,
    service: 'Servicio de Barba',
    date: 'Jueves 24 Feb, a las 12:00 pm',
    location: 'Agricultura 104, int 304, Escandón',
    paymentMethod: '...3234'
  }

  async componentDidMount() {
    const lng = await locale()
    this.setState({
      lng,
      loading: false
    })
  }

  navigateTo = (screen, data = {}) => {
    const { navigation } = this.props

    navigation.navigate(screen, data)
  }

  render() {

    const {
      lng,
      loading,
      name,
      city,
      stars,
      cuts,
      avatar,
      price,
      service,
      date,
      location,
      paymentMethod
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
                avatar={avatar}
                name={name}
                city={city}
                stars={stars}
                paymentMethod={paymentMethod}
                onPressProfile={() => this.navigateTo('BrbrProfile')}
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
              />
            </Content>
        }
      </Container>
    );
  }
}

export default connect()(ServiceReview);