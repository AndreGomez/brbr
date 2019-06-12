
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

class CreateAccountStep1 extends Component {

  state = {
    lng: {}
  }

  async componentDidMount() {
    const lng = await locale()

    this.setState({
      lng
    })
  }

  navigateTo = (screen) => {
    const { navigation } = this.props

    navigation.navigate(screen)
  }

  login = () => {
    const { navigation } = this.props

    navigation.goBack()
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
        <Text
          style={styles.qote}
        >
          {lng.create_account_qote}
        </Text>
        <View
          style={styles.btnContainer}
        >
          <MainButton
            onPress={() => this.navigateTo('CreateAccountFormTel')}
            text={lng.create_account}
            containerStyle={styles.btn}
          />
        </View>
        <View
          style={styles.loginContainer}
        >
          <Text
            style={styles.readyAccount}
          >
            {lng.create_account_ready_account}
          </Text>
          <TextTouchable
            onPress={() => this.login()}
            text={lng.login_button_text}
            customStyle={styles.txtTouch}
          />
        </View>
      </View>
    );
  }
}

export default connect()(CreateAccountStep1);