
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container } from 'native-base';

//customs
import styles from './styles';
import locale from '../../../locale';

//actions
import { INIT_SESSION } from '../../../actions/auth';
import { SET_USER } from '../../../actions/user';

//component
import MainButton from '../../../components/button';
import Logo from '../../../components/logo';
import TextTouchable from '../../../components/text_touchable';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import MainInput from '../../../components/input';
import BackButton from '../../../components/back_button';
import { validateFields } from '../../../utils/validators';
import { loginUser } from '../../../api/auth';
import successMessage from '../../../utils/success_message';
import { setToken } from '../../../api/user';
import firebase from 'react-native-firebase';

class LoginForm extends Component {

  state = {
    lng: {},
    loading: false,
    form: {
      email: {
        value: '',
        type: '',
        require: true
      },
      password: {
        value: '',
        type: '',
        require: true
      }
    }
  }

  async componentDidMount() {
    const lng = await locale()

    this.setState({
      lng
    })
  }

  onPressLogin = async () => {
    const { dispatch } = this.props;

    const { form } = this.state

    try {
      this.setState({ loading: true })
      await validateFields(form)

      const res = await loginUser({
        email: form.email.value,
        password: form.password.value,
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

      const fcmToken = await firebase.messaging().getToken();
      const a = await setToken({ device_token: fcmToken }, res.data.user._id);

      dispatch({
        type: INIT_SESSION,
        payload: {
          authorize: true,
          token: `Bearer ${res.data.token}`,
        }
      });

      this.setState({ loading: false })
    } catch (error) {
      console.log('eerrr', error)
      this.setState({ loading: false })
      return successMessage('Verifique sus datos', 'danger')
    }
  }

  createAccount = () => {
    const { navigation } = this.props

    navigation.navigate('CreateAccountStep1')
  }

  goBack = () => {
    const { navigation } = this.props

    navigation.goBack()
  }

  onChange = (key, value) => {
    let { state } = this;

    state.form[key].value = value;
    this.setState({ ...state });
  }

  navigateTo = (screen) => {
    const { navigation } = this.props

    navigation.navigate(screen)
  }

  render() {

    const {
      lng,
      form: {
        email,
        password
      },
      loading
    } = this.state

    return (
      <Container style={styles.container}>
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.login_button_text}
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
        >
          <Logo
            imageContainerStyles={styles.logo}
          />
          <MainInput
            placeholder={lng.email_placeholder}
            onChangeText={(value) => this.onChange('email', value)}
            value={email.value}
            rounded
            label={lng.login_email}
            customContainer={styles.input}
            keyboardType={'email-address'}
          />
          <MainInput
            placeholder={lng.password}
            onChangeText={(value) => this.onChange('password', value)}
            value={password.value}
            rounded
            secureTextEntry
            label={lng.password}
            customContainer={styles.inputBottom}
          />
          <View
            style={styles.txtTouch}
          >
            <TextTouchable
              textStyle={styles.txtTouchText}
              text={lng.forgot_password}
              onPress={() => this.navigateTo('forgotPassword')}
            />
          </View>
          <MainButton
            onPress={() => this.onPressLogin()}
            text={lng.login_button_text}
            containerStyle={styles.btn}
            loading={loading}
          />
        </Content>
      </Container>
    );
  }
}

export default connect()(LoginForm);