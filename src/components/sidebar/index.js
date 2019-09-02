import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import CustomHeader from '../header';
import HeaderTitle from '../header_title';
import ModalAlert from '../modal_alerts';
import Loading from '../loading';
import BackButton from '../back_button';
import ItemList from '../item_list';

//customs
import styles from './styles';

//locale
import locale from '../../locale';

//actions
import { DESTROY_SESSION } from '../../actions/auth';
import MainButton from '../button';

//icons
import brbr_black from '../../assets/images/brbr_black.png';
import { getMessaging, updtaeTokenFirebase } from '../../api/setToken';

class Sidebar extends Component {

  state = {
    lng: {},
    loading: true,
    modalVisible: false
  }

  async componentDidMount() {

    const lng = await locale()

    this.setState({
      lng,
      loading: false,
    })

  }

  onDestroySession = async () => {
    const { dispatch } = this.props;

    await updtaeTokenFirebase(true);

    dispatch({
      type: DESTROY_SESSION,
      payload: {}
    });
  }

  navigateTo = (screen, data = {}) => {
    const { navigation } = this.props

    navigation.navigate(screen, data)
  }

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  onPressPaymentMethod = () => {
    const {
      currentUser
    } = this.props;

    if (currentUser.payment_methods.length === 0) {
      this.navigateTo('AddCardForm', { addExternal: true })
    } else {
      this.navigateTo('PaymentMethodsList')
    }
  }

  render() {

    const {
      lng,
      loading,
      modalVisible,
    } = this.state

    const {
      currentUser
    } = this.props;

    return (
      <Container
        style={styles.container}
      >
        <View
          style={styles.header}
        >
          <CustomHeader
            center={
              <HeaderTitle
                text={lng.preferencies}
              />
            }
            left={
              <BackButton
                onPress={() => this.props.navigation.toggleDrawer()}
              />
            }
          />
        </View>
        {
          loading ?
            <Loading />
            :
            <Content
              bounces={false}
              contentContainerStyle={styles.content}
            >
              <ItemList
                text={lng.edit_profile}
                onPress={() => this.navigateTo('EditProfile')}
                avatar={currentUser.photo}
                name={currentUser.name}
              />
              <View
                style={styles.containerItems}
              >
                <ItemList
                  text={lng.my_profile}
                  onPress={() => this.navigateTo('MyProfile')}
                />
                <ItemList
                  text={'Metodos de pago'}
                  alert={currentUser.payment_methods.length === 0}
                  onPress={() => this.onPressPaymentMethod()}
                />
                {/* <ItemList
                  text={lng.my_address}
                  onPress={() => this.navigateTo('MyAddress')}
                /> */}
                <ItemList
                  text={lng.lang}
                  onPress={() => { }}
                />
                <ItemList
                  text={'Código de descuento'}
                  onPress={() => this.navigateTo('MeCode')}
                />
                <ItemList
                  text={'Identificación personal'}
                  alert={!currentUser.auth_identity}
                  onPress={() => this.navigateTo('UploadDUI', { addExternal: true })}
                />
                <ItemList
                  text={lng.notifications}
                  onPress={() => this.toggleModal()}
                  notifications
                  active={true}
                  lng={lng}
                />
                <ItemList
                  text={lng.about}
                  onPress={() => this.navigateTo('About')}
                />
              </View>
              <MainButton
                primary_red
                sm
                text={lng.close_session}
                onPress={() => this.onDestroySession()}
              />
            </Content>
        }
        <ModalAlert
          title={
            <Image
              source={brbr_black}
              style={styles.brbr_black}
            />
          }
          visible={modalVisible}
          message={lng.notifications_modal}
          btnTitle={lng.activate}
          onPress={() => this.toggleModal()}
          close
          onPressClose={() => this.toggleModal()}
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

export default connect(mapStateToProps)(Sidebar);