import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import ModalAlert from '../../../components/modal_alerts';
import Logo from '../../../components/logo';
import BarberVip from '../../../components/barber_vip';
import BarberArround from '../../../components/barber_arround';
import Loading from '../../../components/loading';

//customs
import styles from './styles';

//locale
import locale from '../../../locale';

//actions
import { DESTROY_SESSION } from '../../../actions/auth';

//icons
import prefIcon from '../../../assets/icons/preferencies.png';
import searchIcon from '../../../assets/icons/search.png';
import vipIcon from '../../../assets/icons/vip.png';
import locationIcon from '../../../assets/icons/marker.png';
import calendarIcon from '../../../assets/icons/calendar.png';
import brbr_machineIcon from '../../../assets/icons/brbr_machine.png'


class Home extends Component {

  state = {
    lng: {},
    barberVips: [{ img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4.8, addres: 'Santa Ana Santa Ana Santa Ana ', name: 'Andre Gomez, Andre Gomez' }, { img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4, addres: 'Santa Ana', name: 'Andre Gomez' }, { img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4, addres: 'Santa Ana', name: 'Andre Gomez' }],
    arroundBarbers: [
      { img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4.8, addres: 'Santa Ana ', name: 'Andre Gomez, Andre Gomez', price: 10.50, },
      { img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4, addres: 'Santa Ana', name: 'Andre Gomez', price: 10.50, },
      { img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4, addres: 'Santa Ana', name: 'Andre Gomez', price: 10.50, }],
    totalBrbr: 20,
    loading: false,
    location: 'Agricultura 104, int 304, Escandón Agricultura 104, int 304, Escandón'
  }

  async componentDidMount() {
    const lng = await locale()
    this.setState({
      lng
    })
  }

  onDestroySession = () => {
    const { dispatch } = this.props;

    dispatch({
      type: DESTROY_SESSION,
      payload: {}
    });
  }

  renderVipsList = () => (
    <FlatList
      horizontal
      data={this.state.barberVips}
      renderItem={(barberVip) => this.renderVips(barberVip)}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.vipList}
    />
  )

  renderVips = (brbr) => (
    <BarberVip
      onPressBarberVip={() => this.onPressBarberVip(brbr.item.id)}
      img={brbr.item.img}
      addres={brbr.item.addres}
      stars={brbr.item.stars}
      name={brbr.item.name}
    />
  )

  onPressBarberVip = (id) => {

  }

  renderArroundList = () => (
    <FlatList
      data={this.state.arroundBarbers}
      renderItem={(barberArround) => this.renderArround(barberArround)}
      showsVerticalScrollIndicator={false}
    />
  )

  renderArround = (brbr) => (
    <BarberArround
      onPressBarberArround={() => this.onPressBarberArround(brbr.item.id)}
      img={brbr.item.img}
      addres={brbr.item.addres}
      stars={brbr.item.stars}
      name={brbr.item.name}
      price={brbr.item.price}
      cash={this.state.lng.CASH}
      reserve={this.state.lng.RESERVE}
    />
  )

  onPressBarberArround = (id) => {

  }

  onPressLocation = () => {

  }

  onPressCalendar = () => {

  }

  onPressServices = () => {

  }

  render() {

    const {
      lng,
      loading,
      totalBrbr,
      location
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <View
          style={styles.header}
        >
          <CustomHeader
            center={
              <Logo
                imageContainerStyles={styles.logo}
              />
            }
            left={
              <TouchableOpacity>
                <Image
                  source={prefIcon}
                />
              </TouchableOpacity>
            }
            right={
              <TouchableOpacity
                style={styles.searchIcon}
              >
                <Image
                  source={searchIcon}
                />
              </TouchableOpacity>
            }
          />
        </View>
        {
          loading ?
            <Loading />
            :
            <Content
              contentContainerStyle={styles.content}
            >
              <View
                style={styles.searchContainer}
              >
                <TouchableOpacity
                  onPress={() => this.onPressLocation()}
                  style={styles.location}
                  activeOpacity={0.8}
                >
                  <Image
                    source={locationIcon}
                  />
                  <Text
                    numberOfLines={1}
                    style={styles.locationText}
                  >
                    {location}
                  </Text>
                </TouchableOpacity>
                <View
                  style={styles.calendarAndServices}
                >
                  <TouchableOpacity
                    onPress={() => this.onPressCalendar()}
                    style={styles.calendar}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={calendarIcon}
                    />
                    <Text
                      numberOfLines={1}
                      style={styles.locationText}
                    >
                      {lng.add}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.onPressServices()}
                    style={styles.services}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={brbr_machineIcon}
                    />
                    <Text
                      numberOfLines={1}
                      style={styles.locationText}
                    >
                      {lng.select}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View
                  style={styles.vipContainer}
                >
                  <Image
                    source={vipIcon}
                  />
                  <Text
                    style={styles.vipText}
                  >
                    {lng.vip_experience}
                  </Text>
                </View>
                {this.renderVipsList()}
              </View>
              <View
                style={styles.separator}
              />
              <View
                style={styles.brbrArroundContainer}
              >
                <Text
                  style={styles.brbrArroundText}
                >
                  {`${totalBrbr} ${lng.arround_of_you}`}
                </Text>
                {this.renderArroundList()}
              </View>
            </Content>
        }
      </Container>
    );
  }
}

export default connect()(Home);