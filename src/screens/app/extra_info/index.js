import React, { Component } from 'react';
import {
  View,
  Text,
  WebView
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
              {
                params.type == 0 ?
                  <WebView
                    source={{ uri: 'https://brbr.app/legal/' }} />
                  :
                  params.type == 1 ?
                    <WebView
                      source={{ uri: 'https://brbr.app/privacidad/' }} />
                    :
                    <Text
                      style={styles.paraf}
                    >
                      Contacto: 5549023198
                      Dirección fiscal:
                      Minería 96,int 304, Escandón, Miguel Hidalgo, CDMX, cp 11800
                      Correo hellobrbrapp@gmail.com
                    </Text>
              }
            </Content>
        }
      </Container>
    );
  }
}

export default connect()(ExtraInfo);