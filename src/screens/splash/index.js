import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native'
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

// Optional: Flow type
import type, {
  Notification,
  NotificationOpen,
  RemoteMessage
} from 'react-native-firebase';

import { getMessaging } from '../../api/setToken';

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
import { NavigationActions, StackActions } from 'react-navigation';
import { SET_USER } from '../../actions/user';

var lng = {}

class Splash extends Component {

  async componentDidMount() {
    lng = await locale()
    SplashScreen.hide();

    getMessaging({ authorize: this.props.authorize, logout: false });
    this.openNotification();
    this.openNotificationWileAppIsClosed();
    this.showNotification();

    this.setState({
      render: true,
    })
  }


  showNotification = () => {
    firebase.messaging().subscribeToTopic('brbr');
    this.messageListener = firebase
      .messaging()
      .onMessage((message) => {
        console.log('messageListener', { message });
        this.displayNotification(message);
      });
    this.removeNotificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        console.log('removeNotificationListener', { notification });
        this.displayNotification(notification);

        if (notification._data.state === 'in progress') {
          const actionToDispatch = StackActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({
                routeName: 'drawer',
              }),
            ]
          });
          setTimeout(() => {
            this.navigator.dispatch(actionToDispatch);
          }, 500);
        }

        if (notification._data.state === 'finish') {
          this.props.dispatch({
            type: SET_USER,
            payload: {
              appoinmentFinish: notification._data.id
            }
          });
          const actionToDispatch = StackActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({
                routeName: 'drawer',
              }),
            ]
          });
          setTimeout(() => {
            this.navigator.dispatch(actionToDispatch);
          }, 500);
        }
      });
  };

  displayNotification = notification => {
    const channelId = new firebase.notifications.Android.Channel(
      'Default',
      'Default',
      firebase.notifications.Android.Importance.High
    );
    firebase.notifications().android.createChannel(channelId);

    let notification_to_be_displayed = new firebase.notifications.Notification({
      data: notification.data,
      sound: 'default',
      show_in_foreground: true,
      title: notification.title,
      body: notification.body
    });

    if (Platform.OS == 'android') {
      notification_to_be_displayed.android
        .setPriority(firebase.notifications.Android.Priority.High)
        .android.setChannelId('Default')
        .android.setVibrate(1000)
        .android.setColor("#31d2f4")
        .android.setSmallIcon("ic_stat_name");
    }

    firebase.notifications().displayNotification(notification_to_be_displayed);
  };

  openNotification = () => {
    this.removeNotificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(async (notificationOpen) => {
        const action = notificationOpen.action;
        const notification = notificationOpen.notification;
        firebase.notifications().removeDeliveredNotification(notification.notificationId);
        console.log(notification)
        //ACTION
      });
  };

  openNotificationWileAppIsClosed = async () => {
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const action = notificationOpen.action;
      const notification = notificationOpen.notification;
      console.log({ action, notification });
      console.log(notification)
      firebase.notifications().removeDeliveredNotification(notification.notificationId);
    }
  };

  componentWillUnmount() {
    this.openNotification();
    this.openNotificationWileAppIsClosed();
    this.showNotification();
  }

  redirect = () => {
    const {
      authorize,
      firstTime
    } = this.props;

    if (firstTime) return <FirstTimeNavigation />;

    if (!authorize) return <AuthNavigation />

    return <AppNavigation
      ref={nav => {
        this.navigator = nav;
      }} />
  }

  render() {

    return (
      this.redirect()
    )
  }
}

const mapStateToProps = (state) => ({
  authorize: state.auth.authorize,
  firstTime: state.auth.firstTime
});

export default connect(mapStateToProps)(Splash);