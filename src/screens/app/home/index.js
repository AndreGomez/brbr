import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

//customs
import styles from './styles';

//locale
import en from '../../../locale/en';

//actions
import { DESTROY_SESSION } from '../../../actions/auth';

class HomeController extends Component {
  onDestroySession = () => {
    const { dispatch } = this.props;

    dispatch({
      type: DESTROY_SESSION,
      payload: {}
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {en.home_screen_title}
        </Text>
        <TouchableOpacity
          onPress={() => this.onDestroySession()}
        >
          <Text>
            {en.logout_button_text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(HomeController);