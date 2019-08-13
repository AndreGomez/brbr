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
    loadingBtn: false
  }

  async componentDidMount() {
    const lng = await locale()
    const { brbrId } = this.props

    try {
      const barberProfile = await getBarberProfile(brbrId)

      this.setState({
        lng,
        loading: false,
        barberProfile: barberProfile.data
      })

    } catch (error) {
      console.log(error)
    }
  }

  onPressSend = async () => {
    const { state: { formData }, state } = this
    this.setState({
      loadingBtn: true
    })
    try {

      if (formData.title.value != '' && formData.body.value != '' && state.starQ != null) {

        const dataSend = {
          barber_id: this.props.brbrId,
          date: moment().format('YYYY/DD/MM'),
          qualification: state.starQ,
          comment: formData.body.value,
          title: formData.title.value
        }


        await addReview(dataSend)

        successMessage('Tu review se agrego exitosamente')

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
      console.log(error)
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
            right={
              <TouchableOpacity
                onPress={() => this.setState({ visible: false })}
              >
                <Text
                  style={styles.cancelTxt}
                >
                  {lng.cancel}
                </Text>
              </TouchableOpacity>
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

export default connect()(Review);