
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container } from 'native-base';

//customs
import styles from './styles';
import locale from '../../../locale';

//actions
import { INIT_SESSION } from '../../../actions/auth';

//component
import MainButton from '../../../components/button';
import Logo from '../../../components/logo';
import TextTouchable from '../../../components/text_touchable';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import MainInput from '../../../components/input';
import BackButton from '../../../components/back_button';

class LoginForm extends Component {

  state = {
    lng: {},
    form: {
      email: '',
      password: ''
    }
  }

  async componentDidMount() {
    const lng = await locale()

    this.setState({
      lng
    })
  }

  onPressLogin = () => {
    const { dispatch } = this.props;

    dispatch({
      type: INIT_SESSION,
      payload: {
        authorize: true
      }
    });
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
      }
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
          />
          <MainInput
            placeholder={lng.password}
            onChangeText={(value) => this.onChange('password', value)}
            value={password.value}
            rounded
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
            onPress={() => this.navigateTo('UploadDUI')}
            text={lng.login_button_text}
            containerStyle={styles.btn}
          />
        </Content>
      </Container>
    );
  }
}

export default connect()(LoginForm);