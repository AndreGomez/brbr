import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import ModalAlert from '../../../components/modal_alerts';
import Loading from '../../../components/loading';

//customs
import styles from './styles';

//locale
import locale from '../../../locale';

class SelectCalendar extends Component {

  state = {
    lng: {},
    loading: false
  }

  async componentDidMount() {
    const lng = await locale()
    this.setState({
      lng
    })
  }

  render() {

    const {
      lng,
      loading,
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <Logo
              imageContainerStyles={styles.logo}
            />
          }
          left={
            <TouchableOpacity>
              <Image
                source={prefIcon}
              />
            </TouchableOpacity>
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

export default connect()(SelectCalendar);