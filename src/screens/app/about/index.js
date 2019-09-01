import React, { Component } from 'react';
import {
  View,
  Text,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Loading from '../../../components/loading';
import ItemList from '../../../components/item_list';

//locale
import locale from '../../../locale';

//customs
import styles from './styles';

class About extends Component {

  state = {
    loading: true,
    lng: {},
    version: 'v1.01.20'
  }

  async componentDidMount() {
    const lng = await locale()
    this.setState({
      lng,
      loading: false
    })
  }

  navigateTo = (screen, data = {}) => {
    const { navigation } = this.props

    navigation.navigate(screen, data)
  }

  render() {

    const {
      loading,
      lng,
      version
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.about}
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
              <View
                style={styles.itemContainer}
              >
                <ItemList
                  text={lng.version}
                  onPress={() => { }}
                  version={version}
                />
                <ItemList
                  text={lng.TOU}
                  onPress={() => this.navigateTo('ExtraInfo', { title: lng.tou })}
                />
                <ItemList
                  text={lng.POP}
                  onPress={() => this.navigateTo('ExtraInfo', { title: lng.pop })}
                />
                <ItemList
                  text={'Reportar un problema'}
                  onPress={() => Linking.openURL('https://wa.me/5215612761842')}
                />
              </View>
            </Content>
        }
      </Container>
    );
  }
}

export default connect()(About);