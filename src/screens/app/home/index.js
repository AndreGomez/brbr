import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  TextInput,
  StatusBar,
  Platform
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
import brbr_machineIcon from '../../../assets/icons/brbr_machine.png';
import search_grey from '../../../assets/icons/search_grey.png';

class Home extends Component {

  state = {
    lng: {},
    barberVips: [{ img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4.8, addres: 'Santa Ana Santa Ana Santa Ana ', name: 'Andre Gomez, Andre Gomez' }, { img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4, addres: 'Santa Ana', name: 'Andre Gomez' }, { img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4, addres: 'Santa Ana', name: 'Andre Gomez' }],
    arroundBarbers: [
      { img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4.8, addres: 'Santa Ana ', name: 'Andre Gomez, Andre Gomez', price: 10.50, },
      { img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4, addres: 'Santa Ana', name: 'Andre Gomez', price: 10.50, },
      { img: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', stars: 4, addres: 'Santa Ana', name: 'Andre Gomez', price: 10.50, }],
    totalBrbr: 20,
    loading: true,
    search: false,
    location: 'Agricultura 104, int 304, Escandón Agricultura 104, int 304, Escandón'
  }

  async componentDidMount() {
    const lng = await locale()
    this.setState({
      lng,
      loading: false
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
      horizontal={!this.state.search}
      data={this.state.barberVips}
      renderItem={(barberVip) => this.renderVips(barberVip)}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.vipList}
      keyExtractor={(a, i) => `${i}`}
    />
  )

  renderVips = (brbr) => (
    <BarberVip
      onPressBarberVip={() => this.navigateTo('BrbrProfile', brbr)}
      img={brbr.item.img}
      addres={brbr.item.addres}
      stars={brbr.item.stars}
      name={brbr.item.name}
      horizontal={this.state.search}
    />
  )

  onPressBarberVip = (id) => {

  }

  renderArroundList = () => (
    <FlatList
      data={this.state.arroundBarbers}
      renderItem={(barberArround) => this.renderArround(barberArround)}
      showsVerticalScrollIndicator={false}
      keyExtractor={(a, i) => `${i}`}
    />
  )

  renderArround = (brbr) => (
    <BarberArround
      onPressBarberArround={() => this.navigateTo('BrbrProfile', brbr)}
      img={brbr.item.img}
      addres={brbr.item.addres}
      stars={brbr.item.stars}
      name={brbr.item.name}
      price={brbr.item.price}
      cash={this.state.lng.CASH}
      reserve={this.state.lng.RESERVE}
      onPress={() => this.navigateTo('BrbrReserve', brbr)}
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

  navigateTo = (screen, data = {}) => {
    const { navigation } = this.props

    navigation.navigate(screen, data)
  }

  render() {

    const {
      lng,
      loading,
      totalBrbr,
      location,
      search
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <StatusBar
          backgroundColor={Platform.OS === 'ios' ? '#fff' : 'black'}
          barStyle='light-content'
        />
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
              <TouchableOpacity
                onPress={() => this.props.navigation.toggleDrawer()}
              >
                <Image
                  source={prefIcon}
                />
              </TouchableOpacity>
            }
            right={
              <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => this.setState({ search: !this.state.search })}
              >
                {
                  search ?
                    <Text
                      style={styles.cancel}
                    >
                      {lng.cancel}
                    </Text>
                    :
                    <Image
                      source={searchIcon}
                    />
                }
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
              {
                search ?
                  <View
                    style={styles.search}
                  >
                    <Image
                      source={search_grey}
                    />
                    <TextInput
                      placeholder={lng.start_search}
                      style={styles.input}
                    />
                  </View>
                  :
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
              }
              <View>
                {
                  search ?
                    <Text
                      style={styles.reco}
                    >
                      {lng.reco}
                    </Text>
                    :
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
                }

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