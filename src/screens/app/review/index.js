import React, { Component } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Image,
  TextInput
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Spinner
} from 'native-base';

//locale
import locale from '../../../locale';

//component
import styles from './styles';
import MainButton from '../../../components/button';
import ImagesCustom from '../../../components/imagesCustom';
import CustomHeader from '../../../components/header';

//api
import {
  getBarberProfile,
  addReview
} from '../../../api/barbers';

//icons
import star_empty from '../../../assets/icons/star_empty.png';
import starIcon from '../../../assets/icons/star.png';
import alertMessaje from '../../../utils/alertMessaje';
import successMessage from '../../../utils/success_message';
import { getAppoiment, getAppoimentById } from '../../../api/appoinments';
import { SET_USER } from '../../../actions/user';
class Review extends Component {

  state = {
    loading: true,
    lng: {},
    visible: this.props.visible,
    barberProfile: {},
    formData: {
      title: {
        value: '',
        type: '',
        require: true
      },
      body: {
        value: '',
        type: '',
        require: true
      },
    },
    stars: [1, 2, 3, 4, 5],
    starQ: null,
    loadingBtn: false,
    brbrId: ''
  }

  async componentDidMount() {
    const lng = await locale()
    const { dateId, currentUser } = this.props

    try {
      const dateDetail = await getAppoimentById(dateId)
      const barberProfile = await getBarberProfile(dateDetail.data.barber._id)

      this.setState({
        lng,
        loading: false,
        brbrId: dateDetail.data.barber._id,
        barberProfile: barberProfile.data
      })

    } catch (error) {
    }
  }

  onPressSend = async () => {
    const { state: { formData }, state } = this
    const { dateId } = this.props
    this.setState({
      loadingBtn: true
    })
    try {

      if (formData.title.value != '' && formData.body.value != '' && state.starQ != null) {

        const dataSend = {
          barber_id: this.state.brbrId,
          date: moment().format('YYYY/DD/MM'),
          qualification: state.starQ,
          comment: formData.body.value,
          title: formData.title.value,
          appointments_id: dateId
        }

        await addReview(dataSend)

        this.props.dispatch({
          type: SET_USER,
          payload: {
            appoinmentFinish: null
          }
        });

        successMessage('Tu review se agregó exitosamente')

        this.setState({
          loadingBtn: false
        })

        this.setState({ visible: false })
      } else {
        this.setState({
          loadingBtn: false
        })
        return alertMessaje('Debes escribir titulo, reseña y calificar')
      }
    } catch (error) {
      this.setState({
        loadingBtn: false
      })

    }
  }

  onChange = (key, value) => {
    const { state } = this

    state.formData[key].value = value

    this.setState({
      ...state
    })
  }

  render() {

    const {
      loading,
      lng,
      barberProfile,
      stars,
      starQ,
      loadingBtn,
      visible
    } = this.state

    return (
      <Modal
        visible={visible}
        transparent
        animationType={'slide'}
      >
        <Container
          style={styles.container}
        >
          <CustomHeader
          // right={
          //   <TouchableOpacity
          //     onPress={() => this.setState({ visible: false })}
          //   >
          //     <Text
          //       style={styles.cancelTxt}
          //     >
          //       {lng.cancel}
          //     </Text>
          //   </TouchableOpacity>
          // }
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
              >
                <Text
                  style={styles.writeReview}
                >
                  {lng.write_review}
                </Text>
                <View
                  style={styles.photoAndStarsContainer}
                >
                  <ImagesCustom
                    img={
                      barberProfile.photo ?
                        { uri: barberProfile.photo }
                        :
                        null
                    }
                    styles={styles.avatar}
                  />
                  <View
                    style={styles.row}
                  >
                    {
                      stars.map(res => {
                        if (res <= starQ) {
                          return (
                            <TouchableOpacity
                              key={res}
                              onPress={() => this.setState({ starQ: res })}
                            >
                              <Image
                                style={styles.star}
                                source={starIcon}
                              />
                            </TouchableOpacity>
                          )
                        } else {
                          return (
                            <TouchableOpacity
                              key={res}
                              onPress={() => this.setState({ starQ: res })}
                            >
                              <Image
                                style={styles.star}
                                source={star_empty}
                              />
                            </TouchableOpacity>
                          )

                        }
                      })
                    }
                  </View>
                  <Text
                    style={styles.touch_to_star}
                  >
                    {lng.touch_to_star}
                  </Text>
                </View>
                <View
                  style={styles.inputsContainer}
                >
                  <TextInput
                    style={styles.inputTitle}
                    placeholder={lng.title_review}
                    value={this.state.formData.title.value}
                    onChangeText={(text) => this.onChange('title', text)}
                  />
                  <TextInput
                    style={styles.inputBody}
                    placeholder={lng.review}
                    value={this.state.formData.body.value}
                    onChangeText={(text) => this.onChange('body', text)}
                    multiline
                  />
                </View>
                <MainButton
                  white
                  loading={loadingBtn}
                  text={lng.send}
                  containerStyle={styles.btn}
                  onPress={() => this.onPressSend()}
                />
              </Content>
          }
        </Container>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
};

export default connect(mapStateToProps)(Review);