
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//customs
import styles from './styles';
import locale from '../../../locale';

//component
import MainButton from '../../../components/button';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import CardCollapsable from '../../../components/card_collapsable';
import CardSelection from '../../../components/card_selection';

//icons
import plusCardIcon from '../../../assets/icons/plus_card.png';

//utils
import successMessage from '../../../utils/success_message';

class PaymentMethodAuth extends Component {

  state = {
    lng: {},
    collapsable: 3,
    cards: [{ holder_name: '', active: true }]
  }

  async componentDidMount() {
    const lng = await locale()

    this.setState({
      lng
    })
  }

  navigateTo = (screen, data = {}) => {
    const { navigation } = this.props

    navigation.navigate(screen, data)
  }

  goBack = () => {
    const { navigation } = this.props

    navigation.goBack()
  }

  onPressCollaps = (collapsable) => {
    if (this.state.collapsable === collapsable) {
      this.setState({
        collapsable: 3
      })
    } else {
      this.setState({
        collapsable
      })
    }
  }

  renderCards = () => {
    const {
      cards,
      lng
    } = this.state

    return cards.map((res, i) => (
      <CardSelection
        key={i}
        lng={lng}
        name={res.holder_name}
        active={res.active}
        onPress={() => this.onPressCard(i)}
      />
    ))
  }

  onPressCard = (i) => {
    const { cards } = this.state
    if (cards[0].holder_name == '' && cards[cards.length - 1].holder_name == '') {
      this.navigateTo('AddCardForm', { addCard: (card) => this.addCard(card) })
    }
  }

  addCard = (card) => {
    const { state } = this
    const cards = state.cards
    cardsIndex = state.cards.length - 1
    cards[cardsIndex] = card
    this.setState({
      cards
    })
  }

  onPressAddCard = () => {
    this.setState({
      cards: [
        ...this.state.cards,
        { holder_name: '', active: null }
      ]
    })
  }

  onPressNext = () => {

    const {
      cards,
      lng
    } = this.state
    if (cards[0].holder_name != '') {
      this.navigateTo('UploadDUI')
    } else {
      return successMessage(lng.more_one_payment_method, 'danger')
    }
  }

  onPressSkip = () => {
    this.navigateTo('UploadDUI')
  }

  render() {

    const {
      lng,
      collapsable,
      cards
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.payment_methods}
            />
          }
        // left={
        //   <BackButton
        //     onPress={() => this.goBack()}
        //   />
        // }
        />
        <Content>
          <Text
            style={styles.title}
          >
            {lng.payment_methods_select}
          </Text>
          <CardCollapsable
            title={lng.payment_methods_pay_with_card}
            card
            check={cards[0].holder_name != ''}
            isCollapsed={true}
            content={
              <View
                style={styles.listCards}
              >
                {this.renderCards()}
                {/* {
                  cards[0].holder_name != '' &&
                  cards[cards.length - 1].holder_name != '' &&
                  <TouchableOpacity
                    style={styles.addCardBtnContainer}
                    onPress={() => this.onPressAddCard()}
                  >
                    <Image
                      style={styles.addCardBtnIcon}
                      source={plusCardIcon}
                    />
                    <Text
                      style={styles.addCardBtnText}
                    >
                      {lng.payment_methods_add_card}
                    </Text>
                  </TouchableOpacity>
                } */}
              </View>
            }
            onPress={() => this.onPressCollaps(0)}
          />
          {/* <CardCollapsable
            title={lng.payment_methods_pay_with}
            check={false}
            isCollapsed={collapsable === 1}
            content={<View />}
            onPress={() => this.onPressCollaps(1)}
          /> */}
          <View
            style={styles.btnContainer}
          >
            <MainButton
              raised_green
              text={lng.skip}
              sm
              onPress={() => this.onPressSkip()}
            />
            <MainButton
              onPress={() => this.onPressNext()}
              white
              text={lng.next}
              sm
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect()(PaymentMethodAuth);