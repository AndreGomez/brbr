import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Alert
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
import successMessage from '../../../utils/success_message';

//locale
import locale from '../../../locale';

//customs
import styles from './styles';

//icons
import starIcon from '../../../assets/icons/star.png';
import ImagesCustom from '../../../components/imagesCustom';
import { getAppoiment, updateAppoinment } from '../../../api/appoinments';
import { getBarberProfile } from '../../../api/barbers';
import BrbrHistoryReserve from '../../../components/brbr_history_reserve';
import { getObjectCard } from '../../../api/payment';
import MainButton from '../../../components/button';

class MyProfile extends Component {

  state = {
    loading: true,
    lng: {},
    paymentMethod: '',
    active: true,
    appoinments: [],
    proxAppoinment: {},
    appoReserved: [],
    loadingBtnCancel: false
  }

  async componentDidMount() {
    await this.getAppointemt()
    const { navigation, currentUser } = this.props
    try {
      const cardObject = await getObjectCard(currentUser.openpay_id, currentUser.payment_methods[currentUser.payment_methods.length - 1].token)
      const card = await cardObject.json()
      const paymentMethod = `...${card.card_number[12]}${card.card_number[13]}${card.card_number[14]}${card.card_number[15]}`
      this.setState({
        paymentMethod
      })
    } catch (error) {
    }
    const lng = await locale()
    this.setState({
      lng,
      loading: false
    })
  }

  getAppointemt = async () => {
    const {
      currentUser
    } = this.props

    const {
      state
    } = this
    try {
      const resReserves = await getAppoiment(currentUser._id,
        {
          states: [
            {
              state: 'reserved'
            },
          ]
        }
      )

      const res = await getAppoiment(currentUser._id,
        {
          states: [
            {
              state: 'reserved'
            },
            {
              state: 'finish'
            },
          ]
        }
      )

      this.setState({
        ...state,
        appoinments: res.data,
        appoReserved: resReserves.data
      })
    } catch (error) {
    }
  }

  navigateTo = (screen, data = {}) => {
    const { navigation } = this.props

    navigation.navigate(screen, data)
  }

  renderHistory = (item) => {

    return (
      <BrbrHistoryReserve
        {...item.item}
      />
    )
  }

  onPressCancelDate = () => {

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
            const reserveDetail = this.state.appoReserved[this.state.appoReserved.length - 1]

            this.setState({
              loadingBtnCancel: true
            })

            try {
              await updateAppoinment(reserveDetail._id, {
                state: 'canceled'
              })

              await this.getAppointemt()

              successMessage('Reservacion cancelada exitosamente!')
              this.setState({
                loadingBtnCancel: false
              })
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

  render() {

    const {
      loading,
      lng,
      active,
      paymentMethod,
      appoinments,
      proxAppoinment,
      appoReserved,
      loadingBtnCancel
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
                <ImagesCustom
                  styles={styles.avatar}
                  img={currentUser.photo ? { uri: currentUser.photo } : null}
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
                        currentUser.address.description
                        :
                        ''
                    }
                  </Text>
                  {/* <View
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
                  </View> */}
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
              {
                active ?
                  appoReserved.length != 0 ?
                    <React.Fragment>
                      <View style={styles.sep} />
                      <BrbrPaymentReview
                        lng={lng}
                        vip={false}
                        date={appoReserved[appoReserved.length - 1].date}
                        avatar={appoReserved[appoReserved.length - 1].barber.photo}
                        name={appoReserved[appoReserved.length - 1].barber.name}
                        city={appoReserved[appoReserved.length - 1].location[2]}
                        stars={appoReserved[appoReserved.length - 1].barber.qualification}
                        paymentMethod={paymentMethod}
                        onPressProfile={() => this.navigateTo('BrbrProfile', { item: { barber: { ...{ _id: appoinments[appoinments.length - 1].barber._id } } } })}
                        onPressChange={() => this.navigateTo('BrbrProfile', { item: { barber: { ...{ _id: appoinments[appoinments.length - 1].barber._id } } } })}
                      />
                      <View style={styles.rowBtns}>
                        <MainButton
                          sm
                          red
                          loading={loadingBtnCancel}
                          text={'Cancelar cita'}
                          containerStyle={styles.cancelBtn}
                          onPress={() => this.onPressCancelDate()}
                        />
                        <MainButton
                          sm
                          white
                          loading={loadingBtnCancel}
                          text={'Enviar mensaje'}
                          containerStyle={styles.cancelBtn}
                          onPress={() => this.navigateTo('Chat')}
                        />
                      </View>
                    </React.Fragment>
                    :
                    <Text style={styles.empty}>No tienes reservaciones</Text>
                  :
                  <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={(a, i) => `${i}`}
                    ListEmptyComponent={
                      <Text style={styles.empty2}>
                        No tienes reservaciones
                      </Text>
                    }
                    renderItem={(item) => this.renderHistory(item)}
                    data={appoinments.reverse()}
                  />
              }

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