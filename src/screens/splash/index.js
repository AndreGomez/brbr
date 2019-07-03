import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';

//routes
import AuthNavigation from '../../routes/auth';
import AppNavigation from '../../routes/app';
import FirstTimeNavigation from '../../routes/first_time';

//component
import Logo from '../../components/logo';

//styles
import styles from './styles';

//locale
import locale from '../../locale';

var lng = {}

class Splash extends Component {

  state = {
    loading: true
  }

  async componentDidMount() {
    lng = await locale()
    SplashScreen.hide();

    this.setState({
      render: true
    })

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 2000)
  }

  redirect = () => {
    const {
      authorize,
      firstTime
    } = this.props;

    if (firstTime) return <FirstTimeNavigation />;

    if (!authorize) return <AuthNavigation />;

    return <AppNavigation />
  }

  render() {

    const {
      loading
    } = this.state

    return (
      loading ?
        < View
          style={styles.container}
        >
          <Logo
            imageContainerStyles={styles.logo}
          />
          <Text
            style={styles.slogan}
          >
            {lng.splash_slogan}
          </Text>
        </View >
        :

        this.redirect()
    )
  }
}

const mapStateToProps = (state) => ({
  authorize: state.auth.authorize,
  firstTime: state.auth.firstTime
});

export default connect(mapStateToProps)(Splash);