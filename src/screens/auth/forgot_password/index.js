
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

class forgotPassword extends Component {

  state = {
    lng: {},
    form: {
      rePassword: '',
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

  render() {

    const {
      lng,
      form: {
        rePassword,
        password
      }
    } = this.state

    return (
      <Container style={styles.container}>
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.reset_password}
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
          style={styles.content}
        >
          <MainInput
            placeholder={lng.new_password}
            onChangeText={(value) => this.onChange('password', value)}
            value={password.value}
            rounded
            underText={lng.password_validation}
            label={lng.new_password}
            customContainer={styles.input}
          />
          <MainInput
            placeholder={lng.re_new_password}
            onChangeText={(value) => this.onChange('rePassword', value)}
            value={rePassword.value}
            rounded
            label={lng.re_new_password}
            customContainer={styles.inputBottom}
          />
          <View
            style={styles.btnContainer}
          >
            <MainButton
              onPress={() => { }}
              sm
              text={lng.cancel}
              containerStyle={styles.btn}
              raised_green
            />
            <MainButton
              onPress={() => { }}
              sm
              text={lng.next}
              containerStyle={styles.btn}
              white
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect()(forgotPassword);