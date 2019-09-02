import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
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
import MainInput from '../../../components/input';
import Loading from '../../../components/loading';
import { AddPromoCode, GetMyInfo } from '../../../api/user';
import { SET_USER } from '../../../actions/user';
import successMessage from '../../../utils/success_message';

class MeCode extends Component {

  state = {
    loading: true,
    lng: {},
    code: {
      value: '',
      type: '',
      required: true
    },
    loadingButton: false,
    change: false,
  }

  async componentDidMount() {
    const lng = await locale()

    this.setState({
      lng,
      loading: false,
    })
  }

  onChange = (key, value) => {
    let { state } = this;
    state[key].value = value;
    this.setState({ ...state, change: true });
  }

  onPressSave = async () => {

    const {
      code
    } = this.state

    const {
      currentUser,
      dispatch
    } = this.props

    try {
      this.setState({
        loadingButton: true
      })
      const res = await AddPromoCode(code.value)

      const resUser = await GetMyInfo(currentUser._id)

      await dispatch({
        type: SET_USER,
        payload: {
          ...resUser.data
        }
      });

      this.setState({
        loadingButton: false
      })
      successMessage('Codigo agregado exitosamente!')
      this.props.navigation.goBack()
    } catch (error) {
      console.log('error', error.response)
      if (error.response) {
        if (error.response.data) {
          if (error.response.data.message) {
            if (error.response.data.message == 'Code already used') {
              successMessage('No puedes volver usar un codigo que ya usaste', 'danger')
            }
            if (error.response.data.message == 'Not found') {
              successMessage('Este codigo no existe', 'danger')
            }
            if (error.response.data.message == 'You can not use your code.') {
              successMessage('No puedes usar tu propio codigo!', 'danger')
            }
          }
        }
      }
      this.setState({
        loadingButton: false
      })
    }
  }

  render() {

    const {
      loading,
      lng,
      code,
      loadingButton,
      change
    } = this.state

    const {
      currentUser
    } = this.props

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={'Descuentos'}
            />
          }
          left={
            <BackButton
              onPress={() => this.props.navigation.goBack()}
            />
          }
          right={
            change ?
              loadingButton ?
                <Loading />
                :
                <TouchableOpacity
                  onPress={() => this.onPressSave()}
                >
                  <Text
                    style={styles.save}
                  >
                    {lng.save}
                  </Text>
                </TouchableOpacity>
              :
              null
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
                {
                  currentUser.promotion.use_code.code ?
                    <Text
                      style={styles.readyExistCode}
                    >
                      Tu ya tienes un codigo de promoción de
                      <Text style={styles.percentage}>{` ${currentUser.promotion.use_code.percentage}% `}</Text>
                      de descuento en tu proximo corte para usar otro primero tienes que usar el actual
                    </Text>
                    :
                    <MainInput
                      placeholder={'Agrega un código de promoción'}
                      value={code.value}
                      onChangeText={(value) => this.onChange('code', value)}
                      customStyle={styles.input}
                      underText={'Puedes recibir descuentos cuando cancelas una cita o escribiendo el codigo de un amigo aqui, El codigo solo se aplica a un corte de cabello!'}
                    />
                }
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