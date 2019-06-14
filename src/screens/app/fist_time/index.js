import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Tab, Tabs } from 'native-base';

//component
import MainButton from '../../../components/button';

//customs
import styles from './styles';

//locale
import locale from '../../../locale';

//icons
import navaja from '../../../assets/icons/navaja.png';
import silla from '../../../assets/icons/brbr_silla.png';
import cuts from '../../../assets/icons/cuts.png';
import barber from '../../../assets/icons/barber.png';

class FirstTime extends Component {

  state = {
    lng: {},
    view: 0
  }

  async componentDidMount() {
    const lng = await locale()

    this.setState({
      lng
    })
  }

  onPressNext = () => {
    if (this.state.view < 3) {
      this.setState({
        view: this.state.view + 1
      })
    }
  }

  onPressReserve = () => {
    const { navigation } = this.props

    navigation.navigate('home')
  }

  render() {

    const {
      lng,
      view
    } = this.state

    return (
      <Container>
        <StatusBar
          barStyle={'dark-content'}
        />
        <Tabs
          edgeHitWidth={100}
          renderTabBar={() => <View></View>}
          onChangeTab={(res) => this.setState({ view: res.i })}
          page={view}
        >
          <Tab heading="Tab1">
            <View
              style={styles.tab}
            >
              <Image
                style={styles.icon}
                source={navaja}
              />
              <Text
                style={styles.title}
              >
                {lng.calified_brbr}
              </Text>
              <Text
                style={styles.message}
              >
                {lng.calified_brbr_message}
              </Text>
            </View>
          </Tab>
          <Tab heading="Tab2">
            <View
              style={styles.tab}
            >
              <Image
                style={styles.icon}
                source={silla}
              />
              <Text
                style={styles.title}
              >
                {lng.calified_brbr_2}
              </Text>
              <Text
                style={styles.message}
              >
                {lng.calified_brbr_message_2}
              </Text>
            </View>
          </Tab>
          <Tab heading="Tab3">
            <View
              style={styles.tab}
            >
              <Image
                style={styles.icon}
                source={cuts}
              />
              <Text
                style={styles.title}
              >
                {lng.calified_brbr_3}
              </Text>
              <Text
                style={styles.message}
              >
                {lng.calified_brbr_message_3}
              </Text>
            </View>
          </Tab>
          <Tab heading="Tab4">
            <View
              style={styles.tab}
            >
              <Image
                style={styles.icon}
                source={barber}
              />
              <Text
                style={styles.title}
              >
                {lng.calified_brbr_4}
              </Text>
              <Text
                style={styles.message}
              >
                {lng.calified_brbr_message_4}
              </Text>
            </View>
          </Tab>
        </Tabs>
        <View
          style={styles.btnContainer}
        >
          <View
            style={styles.left}
          >
            <View
              style={
                [
                  styles.chip,
                  view === 0 ? styles.active : styles.disable
                ]
              }
            />
            <View
              style={
                [
                  styles.chip,
                  view === 1 ? styles.active : styles.disable
                ]
              }
            />
            <View
              style={
                [
                  styles.chip,
                  view === 2 ? styles.active : styles.disable
                ]
              }
            />
            <View
              style={
                [
                  styles.chip,
                  view === 3 ? styles.active : styles.disable
                ]
              }
            />
          </View>
          <View
            style={styles.right}
          >
            {
              view != 3 ?
                <MainButton
                  black
                  sm
                  containerStyle={styles.btn}
                  text={lng.next}
                  onPress={() => this.onPressNext()}
                />
                :
                <MainButton
                  black
                  sm
                  containerStyle={styles.btn}
                  text={lng.reserve}
                  onPress={() => this.onPressReserve()}
                />
            }
          </View>
        </View>
      </Container>
    );
  }
}

export default connect()(FirstTime);