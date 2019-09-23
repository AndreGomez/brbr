import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { withNavigationFocus } from "react-navigation";

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Loading from '../../../components/loading';
import ItemList from '../../../components/item_list';

import visaIcon from '../../../assets/icons/visa.png';
import masterIcon from '../../../assets/icons/mastercard.png';
import amexIcon from '../../../assets/icons/american-express.png';
import plusIcon from '../../../assets/icons/plus_card.png';

//customs
import styles from './styles';
import { getObjectCard, usePaymentMethod, deletePaymenCard } from '../../../api/payment';
import { GetMyInfo } from '../../../api/user';
import { SET_USER } from '../../../actions/user';
import successMessage from '../../../utils/success_message';

class PaymentMethodsList extends Component {

  state = {
    loading: true,
    paymentMethods: []
  }

  async componentDidMount() {
    await this.getData()
  }

  async componentDidUpdate(props, state) {
    if (props.isFocused !== this.props.isFocused && this.props.isFocused) {
      console.log('JE')
      await this.getData()
    }
  }

  getData = async () => {
    const { currentUser } = this.props
    const paymentMethods = []
    try {
      await Promise.all(currentUser.payment_methods.map(async res => {
        const cardObject = await getObjectCard(currentUser.openpay_id, res.token)
        const card = await cardObject.json()
        paymentMethods.push({ ...card, use: res.use, myId: res._id })
      }))
      this.setState({
        loading: false,
        paymentMethods
      })
    } catch (error) {
      console.log(error)
      this.setState({
        loading: false
      })
    }
  }

  onPressPaymentMethod = async (i) => {
    const { paymentMethods } = this.state
    const { currentUser, dispatch } = this.props

    try {
      this.setState({
        loading: true
      })
      await usePaymentMethod(paymentMethods[i].myId)

      const resUser = await GetMyInfo(currentUser._id)

      dispatch({
        type: SET_USER,
        payload: {
          ...resUser.data
        }
      });

      await this.getData()

      this.setState({
        loading: false
      })

      successMessage('Metodo de pago cambiado!')
    } catch (error) {
      console.log(error)
      this.setState({
        loading: false
      })
    }
  }

  onPressAddCard = () => {
    this.props.navigation.navigate('AddCardForm', { addExternal: true })
  }

  deletePaymentMethod = (i) => {
    const { paymentMethods } = this.state
    Alert.alert(
      'Brbr App',
      'Seguro que quieres eliminar este metodo de pago?',
      [
        {
          text: 'No',
          onPress: () => { },
          style: 'destructive',
        },
        {
          text: 'Si', onPress: async () => {
            try {
              this.setState({
                loading: true
              })
              await deletePaymenCard(paymentMethods[i].myId)

              const resUser = await GetMyInfo(this.props.currentUser._id)

              dispatch({
                type: SET_USER,
                payload: {
                  ...resUser.data
                }
              });

              await this.getData()

              this.setState({
                loading: false
              })

              successMessage('Metodo eliminado!')
            } catch (error) {
              this.setState({
                loading: false
              })

              successMessage('Error al eliminar metodo de pago!', 'danger')
            }
          }
        },
      ],
      { cancelable: false },
    );
  }

  render() {

    const {
      loading,
      paymentMethods
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={'Metodos de pago'}
            />
          }
          left={
            <BackButton
              onPress={() => this.props.navigation.goBack()}
            />
          }
          right={
            <TouchableOpacity
              onPress={() => this.onPressAddCard()}
              style={styles.cardPlus}
            >
              <Image
                style={styles.plusIcon}
                resizeMode={'contain'}
                source={plusIcon} />
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
              {
                console.log(paymentMethods)
              }
              {
                paymentMethods.map((res, i) => (
                  <ItemList
                    onPress={() => this.onPressPaymentMethod(i)}
                    onLongPress={() => this.deletePaymentMethod(i)}
                    text={res.card_number}
                    customStyles={styles.item}
                    card={
                      res.brand == 'visa' ?
                        <Image
                          style={styles.brand}
                          source={visaIcon}
                          resizeMode={'contain'} /> :
                        res.brand == 'mastercard' ?
                          <Image
                            style={styles.brand}
                            source={masterIcon}
                            resizeMode={'contain'} />
                          :
                          res.brand == 'american_express' ?
                            <Image
                              style={styles.brand}
                              source={amexIcon}
                              resizeMode={'contain'} />
                            :
                            null
                    }
                    use={res.use}
                  />
                ))
              }
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

export default withNavigationFocus(connect(mapStateToProps)(PaymentMethodsList));