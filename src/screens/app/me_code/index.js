import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

//locale
import locale from '../../../locale';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';

//customs
import styles from './styles';
import { Content, Container, Spinner } from 'native-base';

class MeCode extends Component {

  state = {
    loading: true,
    lng: {},
  }

  async componentDidMount() {
    const lng = await locale()

    this.setState({
      lng,
      loading: false,
    })
  }

  render() {

    const {
      loading,
      lng,
    } = this.state

    const {
      currentUser
    } = this.props

    console.log(currentUser)

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={'Mi codigo'}
            />
          }
          left={
            <BackButton
              onPress={() => this.props.navigation.goBack()}
            />
          }
        />
        {
          loading ?
            <Content>
              <Spinner
                color={"white"}
              />
            </Content>
            :
            <Content
              contentContainerStyle={styles.content}
              bounces={false}
            >
              <View>
                <Text
                  style={styles.codeInfo}>
                  Tu codigo brbr es:
                </Text>
                <Text
                  style={styles.code}>
                  {currentUser.promotion.me_code.code}
                </Text>
              </View>
            </Content>
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
};

export default connect(mapStateToProps)(MeCode);