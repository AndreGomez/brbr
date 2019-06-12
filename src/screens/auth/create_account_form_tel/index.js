
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container } from 'native-base';

//customs
import styles from './styles';
import locale from '../../../locale';

//component
import MainButton from '../../../components/button';
import MainInput from '../../../components/input';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import ModalAlert from '../../../components/modal_alerts';

//assets
import upsIcon from '../../../assets/icons/ups.png';
import checkIcon from '../../../assets/icons/check.png'

class CreateAccountFormTel extends Component {

  state = {
    lng: {},
    email: '',
    name: '',
    phone: '',
    modalDataError: {
      visibleError: false
    },
    modalData: {
      visible: false
    }
  }

  async componentDidMount() {
    const lng = await locale()

    this.setState({
      lng
    })
  }

  onChangeName = (name) => {
    this.setState({
      name
    })
  }

  onChangePhone = (phone) => {
    this.setState({
      phone
    })
  }

  onChangeEmail = (email) => {
    this.setState({
      email
    })
  }

  goBack = () => {
    const { navigation } = this.props

    navigation.goBack()
  }

  toggleModalError = () => {
    this.setState({
      modalDataError: {
        ...this.state.modalDataError,
        visibleError: !this.state.modalDataError.visibleError
      }
    })
  }

  toggleModal = () => {
    this.setState({
      modalData: {
        ...this.state.modalData,
        visible: !this.state.modalData.visible
      }
    })
  }

  onPressNext = () => {
    this.toggleModal()
  }

  onPressTryLogin = () => {
    const { navigation } = this.props

    navigation.popToTop()
  }

  onPressCompleteRegister = () => {
    this.toggleModal()
    this.navigateTo('PaymentMethodAuth')
  }

  navigateTo = (screen) => {
    const { navigation } = this.props

    navigation.navigate(screen)
  }

  render() {

    const {
      lng,
      email,
      name,
      phone,
      modalDataError: {
        visibleError
      },
      modalData: {
        visible
      }
    } = this.state

    return (
      <Container style={styles.container}>
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.create_account_single}
            />
          }
          left={
            <BackButton
              onPress={() => this.goBack()}
            />
          }
        />
        <Content
          bounces={false}
          contentContainerStyle={styles.content}
        >
          <MainInput
            placeholder={lng.create_account_name}
            onChangeText={(name) => this.onChangeName(name)}
            value={name}
            underText={lng.create_account_name_message}
          />
          <MainInput
            customStyle={styles.input}
            placeholder={lng.create_account_email}
            onChangeText={(email) => this.onChangeEmail(email)}
            keyboardType={'email-address'}
            value={email}
          />
          <MainInput
            customStyle={styles.input}
            placeholder={lng.create_account_tel}
            onChangeText={(phone) => this.onChangePhone(phone)}
            keyboardType={'numeric'}
            value={phone}
            underText={lng.create_account_tel_message}
          />
          <MainButton
            onPress={() => this.onPressNext()}
            text={lng.next}
            containerStyle={styles.btn}
            white
            sm
          />
        </Content>

        {/* error */}
        <ModalAlert
          visible={visibleError}
          title={
            <Image
              source={upsIcon}
            />
          }
          message={lng.create_account_email_used_message}
          btnTitle={lng.create_account_email_used}
          onPress={() => this.onPressTryLogin()}
          close={true}
          onPressClose={() => this.toggleModalError()}
        />

        {/* pass */}
        <ModalAlert
          visible={visible}
          title={
            <Image
              source={checkIcon}
            />
          }
          message={lng.create_account_email_pass_message}
          btnTitle={lng.create_account_email_pass}
          onPress={() => this.onPressCompleteRegister()}
          close={true}
          onPressClose={() => this.toggleModal()}
        />
      </Container>
    );
  }
}

export default connect()(CreateAccountFormTel);