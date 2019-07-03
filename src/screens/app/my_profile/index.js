import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Loading from '../../../components/loading';
import Switch from '../../../components/switch';
import BrbrPaymentReview from '../../../components/brbr_payment_review';

//locale
import locale from '../../../locale';

//customs
import styles from './styles';

//icons
import starIcon from '../../../assets/icons/star.png';

class MyProfile extends Component {

  state = {
    loading: true,
    lng: {},
    name: 'Andre Gomez',
    avatar: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
    stars: 4.5,
    city: 'San Salvador',
    active: true,
    paymentMethod: '...1234'
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
      loading,
      lng,
      name,
      avatar,
      stars,
      city,
      active,
      paymentMethod
    } = this.state

    const {
      currentUser
    } = this.props

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.my_profile}
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
              bounces={false}
            >
              <View
                style={styles.row}
              >
                <Image
                  style={styles.avatar}
                  source={{ uri: avatar }}
                />
                <View
                  style={styles.txtContainer}
                >
                  <Text
                    style={styles.name}
                  >
                    {currentUser.name}
                  </Text>
                  <Text
                    style={styles.city}
                  >
                    {
                      currentUser.address.length != 0 ?
                        currentUser.address[0].description
                        :
                        ''
                    }
                  </Text>
                  <View
                    style={styles.row}
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
                </View>
              </View>
              <View
                style={styles.switch}
              >
                <Switch
                  ft={lng.prox}
                  st={lng.history}
                  onPress={() => this.setState({ active: !active })}
                  active={active}
                />
              </View>
              <View
                style={styles.separator}
              />
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

export default connect(mapStateToProps)(MyProfile);