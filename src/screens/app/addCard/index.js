
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container } from 'native-base';
import { createDeviceSessionId } from 'openpay-react-native';

//customs
import styles from './styles';
import locale from '../../../locale';

//component
import MainButton from '../../../components/button';
import MainInput from '../../../components/input';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import ModalAlert from '../../../components/modal_alerts';
import Select from '../../../components/select';

//assets
import upsIcon from '../../../assets/icons/ups.png';
import cardsIcon from '../../../assets/icons/cards.png';
import cuestionIcon from '../../../assets/icons/cuestion.png';
import dateIcon from '../../../assets/icons/date_exp.png';
import cvvIcon from '../../../assets/icons/cvv.png';

//utils
import countrys from '../../../utils/country_list';
import { validateFields } from '../../../utils/validators';

import { store } from '../../../../store';

//actions
import { SET_USER } from '../../../actions/user';

//api
import {
  addPaymentMethodToken,
  generateToken
} from '../../../api/payment';
import { GetMyInfo } from '../../../api/user';
import successMessage from '../../../utils/success_message';

class AddCardForm extends Component {

  state = {
    lng: {},
    modalDateData: {
      visible: false
    },
    modalCVVData: {
      visible: false
    },
    modalErrorData: {
      visible: false,
      message: ''
    },
    cardInfo: {
      name: {
        value: '',
        type: '',
        required: true
      },
      lastName: {
        value: '',
        type: '',
        required: true
      },
      cardNumber: {
        value: '',
        type: '',
        required: true
      },
      cvv: {
        value: '',
        type: '',
        required: true
      },
      date: {
        value: '',
        type: '',
        required: true
      },
      country: {
        value: '',
        type: '',
        required: true
      }
    },
    loadingButton: false
  }

  async componentDidMount() {
    const lng = await locale()
    const { currentUser, navigation } = this.props
    this.setState({
      lng
    })
  }

  goBack = () => {
    const { navigation } = this.props

    navigation.goBack()
  }

  onChange = (key, value) => {
    let { state } = this;

    state.cardInfo[key].value = value;
    this.setState({ ...state });
  }

  toggleModal = (key, message = '') => {
    let { state } = this;

    state[key].visible = !state[key].visible;

    if (message != '') {
      state[key].message = message
    }
    this.setState({ ...state });
  }

  onPressAccept = async () => {
    const {
      dispatch,
      navigation,
      currentUser
    } = this.props

    try {
      this.setState({ loadingButton: true })
      const { cardInfo, lng } = this.state

      await validateFields(cardInfo)

      const date = cardInfo.date.value.split('/')
      const data = {
        card_number: cardInfo.cardNumber.value,
        holder_name: `${cardInfo.name.value} ${cardInfo.lastName.value}`,
        expiration_year: date[0],
        expiration_month: date[1],
        cvv2: cardInfo.cvv.value
      }

      const res = await generateToken(data)
      const card = await res.json()
      const device_session_id = await createDeviceSessionId()
      if (card.card) {
        await addPaymentMethodToken({
          device_session_id,
          token: card.id
        })

        const resUser = await GetMyInfo(currentUser._id)

        dispatch({
          type: SET_USER,
          payload: {
            ...resUser.data
          }
        });

        if (!navigation.state.params.addExternal) {
          navigation.state.params.addCard(card.card)
        }

        successMessage('Agregado exitosamente')
        navigation.goBack()
        this.setState({ loadingButton: false })
      } else {
        if (card.description === 'expiration_month 22 is invalid, valid expirations months are 01 to 12') {
          this.toggleModal('modalErrorData', 'El formato de fecha debe ser YY/MM')
          this.setState({ loadingButton: false })
        } else {
          console.log('error', card)
          this.toggleModal('modalErrorData', lng.card_verify)
          this.setState({ loadingButton: false })
        }
      }
    } catch (error) {
      console.log('error', error.response)
      this.setState({ loadingButton: false })
      this.toggleModal('modalErrorData', this.state.lng.all_fields_are_required)
    }
  }

  render() {

    const {
      lng,
      cardInfo: {
        name,
        lastName,
        cardNumber,
        cvv,
        date,
        country
      },
      modalDateData,
      modalCVVData,
      modalErrorData,
      loadingButton
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={lng.add_card_form_title}
            />
          }
          left={
            <BackButton
              onPress={() => this.goBack()}
            />
          }
        />
        <Content
          bounces={false}
          style={styles.content}
        >
          <View
            style={styles.titleContainer}
          >
            <Image
              source={cardsIcon}
              style={styles.cardsIcon}
            />
            <Text
              style={styles.title}
            >
              {lng.add_card_form_complete_form}
            </Text>
          </View>
          <MainInput
            placeholder={lng.name}
            value={name.value}
            onChangeText={(value) => this.onChange('name', value)}
          />
          <MainInput
            placeholder={lng.last_name}
            value={lastName.value}
            onChangeText={(value) => this.onChange('lastName', value)}
            customStyle={styles.input}
          />
          <MainInput
            keyboardType={'numeric'}
            placeholder={lng.add_card_form_card_number}
            value={cardNumber.value}
            onChangeText={(value) => {
              if (value.length <= 16) {
                this.onChange('cardNumber', value)
              }
            }}
            customStyle={styles.input}
          />
          <View
            style={styles.inputContainer}
          >
            <MainInput
              keyboardType={'numeric'}
              placeholder={lng.date_exp}
              value={date.value}
              onChangeText={(value) => {
                if (value.length <= 5) {
                  if (value.length === 2) {
                    if (this.state.cardInfo.date.value.length === 3) {
                      return this.onChange('date', value)
                    } else {
                      return this.onChange('date', `${value.slice(0, 2)}/${value.slice(3, 4)}`)
                    }
                  }
                  if (this.state.cardInfo.date.value.length === 2 && value.length === 3) {
                    return this.onChange('date', `${value.slice(0, 2)}/${value.slice(3, 4)}`)
                  }
                  return this.onChange('date', value)
                }
              }}
              customStyle={styles.input}
              icon={
                <TouchableOpacity
                  onPress={() => this.toggleModal('modalDateData')}
                  style={styles.inputIcon}
                >
                  <Image
                    source={cuestionIcon}
                  />
                </TouchableOpacity>
              }
              sm
            />
            <MainInput
              placeholder={lng.CVV}
              value={cvv.value}
              keyboardType={'numeric'}
              onChangeText={(value) => {
                if (value.length <= 4) {
                  this.onChange('cvv', value)
                }
              }}
              customStyle={styles.input}
              icon={
                <TouchableOpacity
                  onPress={() => this.toggleModal('modalCVVData')}
                  style={styles.inputIcon}
                >
                  <Image
                    source={cuestionIcon}
                  />
                </TouchableOpacity>
              }
              sm
            />
          </View>
          <Select
            data={countrys()}
            placeholder={'Select...'}
            value={country.value}
            onValueChange={(value) => this.onChange('country', value)}
            customContainerStyle={styles.select}
          />
          <View
            style={styles.btnContainer}
          >
            <MainButton
              raised_green
              text={lng.cancel}
              sm
              onPress={() => this.goBack()}
            />
            <MainButton
              onPress={() => this.onPressAccept()}
              white
              text={lng.accept}
              sm
              loading={loadingButton}
            />
          </View>
        </Content>
        {/* DATE */}
        <ModalAlert
          visible={modalDateData.visible}
          title={
            <Image
              source={dateIcon}
            />
          }
          bottom
          message={lng.add_card_form_modal_date_message}
          btnTitle={lng.accept}
          onPress={() => this.toggleModal('modalDateData')}
          close={true}
          onPressClose={() => this.toggleModal('modalDateData')}
        />
        {/* CVV */}
        <ModalAlert
          visible={modalCVVData.visible}
          title={
            <Image
              source={cvvIcon}
            />
          }
          bottom
          message={lng.add_card_form_modal_cvv_message}
          btnTitle={lng.accept}
          onPress={() => this.toggleModal('modalCVVData')}
          close={true}
          onPressClose={() => this.toggleModal('modalCVVData')}
        />

        {/* ERROR */}
        <ModalAlert
          visible={modalErrorData.visible}
          title={
            <Image
              source={upsIcon}
            />
          }
          message={modalErrorData.message}
          btnTitle={lng.accept}
          onPress={() => this.toggleModal('modalErrorData')}
          close={true}
          onPressClose={() => this.toggleModal('modalErrorData')}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
};

export default connect(mapStateToProps)(AddCardForm);