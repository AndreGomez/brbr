import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

//component
import MainButton from '../../../components/button';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Loading from '../../../components/loading';

//customs
import styles from './styles';

//action
import { SET_USER } from '../../../actions/user';

//locale
import locale from '../../../locale';
import DarkTheme from '../../../utils/map_dark_theme';

//icons
import map_icon_white from '../../../assets/images/map_icon_white.png';
import locationIcon from '../../../assets/icons/marker.png';

//utils
import centerCoordinates from '../../../utils/center_coordinates';

//api
import {
  SaveAddress,
  EditAddress
} from '../../../api/user';
import successMessage from '../../../utils/success_message';

const MAP_KEY = 'AIzaSyAomkkJKfTlE9WOc_yMt2btwNjzkLSjqw0'
const MAP_API_PLACE = 'https://maps.googleapis.com/maps/api/geocode/'
const CancelToken = axios.CancelToken;
let cancel = null;

class MyAddress extends Component {

  state = {
    lng: {},
    currentLocation: {},
    loading: true,
    coord: {},
    loadingButton: false,
    editable: false
  }

  async componentDidMount() {
    const lng = await locale()
    this.setState({
      lng
    })
    var currentLocation = {}
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.setLocation(currentLocation)
    }, (error) => {
    },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000
      }
    )
  }

  setLocation = (currentLocation = null) => {
    this.setState({
      loading: false,
      currentLocation
    })
  }

  onChangeRegion = async (location) => {
    try {
      const res = await this.beginFetching(`${location.latitude},${location.longitude}`)
      this.setState({
        descriptionAddress: res,
        coords: location
      })
    } catch (error) {
    }
  }

  beginFetching = async (query, map_key = MAP_KEY) => {
    try {
      this.abortFetching();
      const urlToFetch = `${MAP_API_PLACE}json?latlng=${query}&key=${map_key}`;
      const response = await axios.get(urlToFetch, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      });
      return new Promise.resolve(response.data.results[1].formatted_address);
    } catch (error) {
      return new Promise.reject(error);
    }
  };

  abortFetching = () => {
    if (cancel !== null) {
      cancel();
    }
  };

  onPressSaveLocation = async () => {
    const { coords, descriptionAddress } = this.state
    const { dispatch } = this.props
    this.setState({
      loadingButton: true
    })
    try {

      const res = await SaveAddress({
        coordinates: {
          ...coords
        },
        description: descriptionAddress
      })
      dispatch({
        type: SET_USER,
        payload: {
          ...res.data
        }
      });

      successMessage('Direccion guardada exitosamente')
      this.setState({
        loadingButton: false,
        editable: false
      })
    } catch (error) {
      this.setState({
        loadingButton: false,
        editable: false
      })
    }
  }

  onPressEdit = () => {
    this.setState({
      editable: true
    })
  }

  onPressConfirmEdit = async () => {
    const { coords, descriptionAddress } = this.state
    const { currentUser, dispatch } = this.props
    this.setState({
      loadingButton: true
    })
    try {

      const res = await EditAddress({
        coordinates: {
          ...coords
        },
        description: descriptionAddress
      }, currentUser.address[0]._id)

      dispatch({
        type: SET_USER,
        payload: {
          ...res.data
        }
      });

      this.setState({
        loadingButton: false,
        editable: false
      })

      successMessage('Direccion guardada exitosamente')
    } catch (error) {
      this.setState({
        loadingButton: false,
        editable: false
      })
    }
  }

  render() {

    const {
      lng,
      loading,
      currentLocation,
      loadingButton,
      descriptionAddress,
      editable
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
              text={lng.my_address}
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
              <TouchableOpacity
                onPress={() => { }}
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
                  {
                    editable ?
                      descriptionAddress
                      :
                      currentUser.address.length != 0 ?
                        currentUser.address[0].description
                        :
                        descriptionAddress
                  }
                </Text>
              </TouchableOpacity>
              <MapView
                scrollEnabled={
                  editable ?
                    true
                    :
                    currentUser.address.length === 0 ?
                      true
                      :
                      false
                }
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                customMapStyle={DarkTheme}
                onRegionChange={(coord) => {
                  this.onChangeRegion({
                    latitude: coord.latitude,
                    longitude: coord.longitude
                  })
                }}
                initialRegion={centerCoordinates([
                  currentUser.address.length != 0 ?
                    currentUser.address[0].coordinates
                    :
                    currentLocation
                ])}
              />
              <Image
                style={{ height: 50, width: 50, position: 'absolute', alignSelf: 'center' }}
                source={map_icon_white}
              />
              <MainButton
                containerStyle={styles.btn}
                text={
                  editable ?
                    lng.accept_location
                    :
                    currentUser.address.length != 0 ?
                      lng.edit
                      :
                      lng.accept_location

                }
                green
                loading={loadingButton}
                onPress={() =>
                  editable ?
                    this.onPressConfirmEdit()
                    :
                    currentUser.address.length != 0 ?
                      this.onPressEdit()
                      :
                      this.onPressSaveLocation()
                }
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

export default connect(mapStateToProps)(MyAddress);