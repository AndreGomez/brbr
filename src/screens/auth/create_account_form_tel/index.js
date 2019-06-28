
import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container } from 'native-base';
import CountryPicker from 'react-native-country-picker-modal';

//customs
import styles, { modalDark } from './styles';
import locale from '../../../locale';

//component
import MainButton from '../../../components/button';
import MainInput from '../../../components/input';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import ModalAlert from '../../../components/modal_alerts';
import successMessage from '../../../utils/success_message';

//assets
import upsIcon from '../../../assets/icons/ups.png';
import checkIcon from '../../../assets/icons/check.png';
import storeIcon from '../../../assets/icons/store.png';

//api
import firebase from 'react-native-firebase';
import {
  createAccount,
  loginUser,
  validateEmail
} from '../../../api/auth';

//actions
import { INIT_SESSION } from '../../../actions/auth';
import { SET_USER } from '../../../actions/user';

//utils
import { validateFields } from '../../../utils/validators';

const PLACEHOLDER_COLOR = "rgba(255,255,255,0.2)";

class CreateAccountFormTel extends Component {

  state = {
    lng: {},
    email: {
      value: '',
      type: 'email',
      required: true
    },
    name: {
      value: '',
      type: '',
      required: true
    },
    phone: {
      value: '',
      type: '',
      required: true
    },
    confirmCode: {
      value: '',
      type: '',
      required: true
    },
    password: {
      value: '',
      type: '',
      required: true
    },
    rPassword: {
      value: '',
      type: '',
      required: true
    },
    modalDataError: {
      visibleError: false
    },
    modalConfirmPhone: {
      visibleConfirm: false
    },
    modalData: {
      visible: false
    },
    cca2: 'MX',
    callingCode: '52',
    errorMessage: '',
    loadingButton: false
  }

  async componentDidMount() {
    const lng = await locale()

    this.setState({
      lng
    })
  }

  onChange = (key, value) => {
    const { state } = this
    if (key === 'phone') {
      value = value.split(' ')

      state[key].value = value[1] ? value[1] : ''
      this.setState({
        ...state
      })
    } else {
      state[key].value = value
      this.setState({
        ...state
      })
    }
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

  toggleModalConfirmPhone = () => {
    this.setState({
      modalConfirmPhone: {
        ...this.state.modalConfirmPhone,
        visibleConfirm: !this.state.modalConfirmPhone.visibleConfirm
      }
    })
  }

  onPressNext = async () => {

    const {
      email,
      name,
      phone,
      callingCode,
      password,
      rPassword
    } = this.state

    if (password.value === rPassword.value) {
      if (password.value.length >= 8) {
        try {
          this.setState({
            loadingButton: true
          })
          const res = await validateEmail({ email: email.value })

          if (res.data.exist === false) {

            const phoneNumber = `+${callingCode} ${phone.value}`
            await validateFields({ email, name, phone })
            const confirmResult = await firebase.auth().signInWithPhoneNumber(phoneNumber)
            this.setState({
              confirmResult
            })
            this.toggleModalConfirmPhone()
          } else {
            this.setState({
              errorMessage: 'Este correo ya esta en uso',
              loadingButton: false
            })
            return this.toggleModalError()
          }
        } catch (error) {
          console.log(error)
          this.setState({
            errorMessage: 'Revisa tu informacion',
            loadingButton: false
          })
          this.toggleModalError()
        }
        // this.toggleModal()
      } else {
        this.setState({
          errorMessage: 'La contraseña debe contener minimo 8 caracteres'
        })
        return this.toggleModalError()
      }
    } else {
      this.setState({
        errorMessage: 'las contraseñas no son iguales'
      })
      return this.toggleModalError()
    }
  }

  onPressConfirmCode = async () => {
    const {
      confirmCode,
      confirmResult,
      email,
      name,
      phone,
      callingCode,
      password,
    } = this.state

    const {
      dispatch
    } = this.props;

    try {
      await confirmResult.confirm(confirmCode.value)
      this.toggleModalConfirmPhone()
      this.setState({
        loadingButton: false
      })

      await createAccount({
        email: email.value,
        password: password.value,
        name: name.value,
        lastname: name.value,
        cell_phone: `+${callingCode} ${phone.value}`
      })

      const res = await loginUser({
        email: email.value,
        password: password.value,
      })

      dispatch({
        type: SET_USER,
        payload: {
          ...res.data.user
        }
      });

      dispatch({
        type: INIT_SESSION,
        payload: {
          authorize: false,
          token: `Bearer ${res.data.token}`,
        }
      });

      this.navigateTo('PaymentMethodAuth', { email, name, phone, callingCode })
    } catch (error) {
      console.log('error', error.response)
      if (error.response) {
        if (error.response.data.message === 'This email has already been registered.') {
          this.setState({
            errorMessage: 'Este correo ya esta en uso'
          })
          return this.toggleModalError()
        }
        return successMessage('Error', 'danger')
      }
      return successMessage('Codigo invalido', 'danger')
    }
  }

  onPressTryLogin = () => {
    const { navigation } = this.props

    navigation.popToTop()
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
      },
      cca2,
      callingCode,
      errorMessage,
      loadingButton,
      modalConfirmPhone: {
        visibleConfirm,
      },
      password,
      rPassword
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
            onChangeText={(name) => this.onChange('name', name)}
            value={name.value}
            underText={lng.create_account_name_message}
          />
          <MainInput
            customStyle={styles.input}
            placeholder={lng.create_account_email}
            onChangeText={(email) => this.onChange('email', email)}
            keyboardType={'email-address'}
            value={email.value}
          />

          <MainInput
            customStyle={
              styles.inputPhone
            }
            placeholder={lng.create_account_tel}
            onChangeText={(phone) => this.onChange('phone', phone)}
            keyboardType={'phone-pad'}
            value={`+(${callingCode}) ${phone.value}`}
            underText={lng.create_account_tel_message}
            icon={
              <View
                style={styles.country}
              >
                <CountryPicker
                  showCallingCode
                  onChange={value => {
                    this.setState({
                      cca2: value.cca2,
                      callingCode: value.callingCode
                    })
                  }}
                  styles={modalDark}
                  cca2={cca2}
                  translation="eng"
                  filterPlaceholderTextColor={PLACEHOLDER_COLOR}
                  closeable
                  animationType={'slide'}
                  filterable
                  filterPlaceholder={'Buscar'}
                  closeButtonImage={storeIcon}
                  showCountryNameWithFlag
                />
              </View>
            }
          />
          <MainInput
            placeholder={lng.password}
            onChangeText={(value) => this.onChange('password', value)}
            value={password.value}
            secureTextEntry
            customStyle={styles.input}
          />
          <MainInput
            customStyle={styles.input}
            placeholder={lng.re_new_password}
            onChangeText={(value) => this.onChange('rPassword', value)}
            secureTextEntry
            value={rPassword.value}
          />
          <MainButton
            onPress={() => this.onPressNext()}
            text={lng.next}
            containerStyle={styles.btn}
            white
            sm
            loading={loadingButton}
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
          message={errorMessage}
          btnTitle={lng.accept}
          onPress={() => this.toggleModalError()}
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

        {/* confirm */}
        <ModalAlert
          visible={visibleConfirm}
          title={
            <Image
              source={checkIcon}
            />
          }
          phoneNumber
          onChangeText={(value) => this.onChange('confirmCode', value)}
          message={lng.confirm_your_code}
          subtitle={lng.set_code}
          btnTitle={lng.confirm}
          placeholder={lng.code}
          onPress={() => this.onPressConfirmCode()}
        />
      </Container>
    );
  }
}

export default connect()(CreateAccountFormTel);