import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Loading from '../../../components/loading';

//customs
import styles from './styles';

class ExtraInfo extends Component {

  state = {
    loading: true,
  }

  async componentDidMount() {
    this.setState({
      loading: false
    })
  }

  render() {

    const {
      loading,
    } = this.state

    const {
      params
    } = this.props.navigation.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={params.title}
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
            <Loading />
            :
            <Content
              contentContainerStyle={styles.content}
            >

            </Content>
        }
      </Container>
    );
  }
}

export default connect()(ExtraInfo);