
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

//customs
import styles from './styles';
import locale from '../../../locale';

//actions
import { INIT_SESSION } from '../../../actions/auth';

//component
import MainButton from '../../../components/button';
import Logo from '../../../components/logo';
import TextTouchable from '../../../components/text_touchable';

//icons
import mostacheIcon from '../../../assets/icons/mostache.png';
import fbIcon from '../../../assets/icons/fb.png';
import ggIcon from '../../../assets/icons/gg.png';

class Login extends Component {

  state = {
    lng: {}
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

  navigateTo = (screen) => {
    const { navigation } = this.props

    navigation.navigate(screen)
  }

  render() {

    const {
      lng
    } = this.state

    return (
      <View style={styles.container}>
        <Logo
          imageContainerStyles={styles.logo}
        />
        <Text
          style={styles.slogan}
        >
          {lng.splash_slogan}
        </Text>
        <View
          style={styles.btnContainer}
        >
          <MainButton
            onPress={() => this.navigateTo('CreateAccountStep1')}
            text={lng.login_register_btn}
            raised_white
            icon={mostacheIcon}
          />
          <MainButton
            onPress={() => { }}
            text={lng.login_with_fb}
            blue
            icon={fbIcon}
            containerStyle={styles.btn}
          />
          <MainButton
            onPress={() => { }}
            text={lng.login_with_gg}
            red
            icon={ggIcon}
            containerStyle={styles.btn}
          />
          <TextTouchable
            text={lng.login_button_text}
            customStyle={styles.txtTouch}
            onPress={() => this.navigateTo('LoginForm')}
          />
        </View>
      </View>
    );
  }
}

export default connect()(Login);