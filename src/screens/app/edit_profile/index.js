import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { Image } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import Loading from '../../../components/loading';
import BackButton from '../../../components/back_button';
import checkIcon from '../../../assets/icons/check.png';

//customs
import styles, { modalDark } from './styles';

//locale
import locale from '../../../locale';
import MainInput from '../../../components/input';

//action
import { SET_USER } from '../../../actions/user';

//icons
import pencil from '../../../assets/icons/pencil.png';
import img_empty from '../../../assets/images/img_empty.png';

//api
import { EditProfileUser } from '../../../api/user';

//utils
import successMessage from '../../../utils/success_message';
import ImageSelect from '../../../utils/image_picker';
import uploadAsset from '../../../utils/upload_asset';
import ModalAlert from '../../../components/modal_alerts';
import { validatePhone } from '../../../api/auth';
import storeIcon from '../../../assets/icons/store.png';
import parseError from '../../../utils/parse_error';

class EditProfile extends Component {

  state = {
    lng: {},
    loading: true,
    avatar: null,
    confirmCode: {
      value: '',
      type: '',
      required: true
    },
    email: {
      value: '',
      type: '',
      required: true
    },
    name: {
      value: '',
      type: '',
      required: true
    },
    phone: {
      value: '',
      type: '',
      required: true
    },
    description: {
      value: '',
      type: '',
      required: true
    },
    change: false,
    loadingButton: false,
    confirmResult: '',
    modalConfirmPhone: {
      visibleConfirm: false
    },
    validatePhoneVar: true,
    cca2: 'SV',
    callingCode: '503',
  }

  async componentDidMount() {
    const lng = await locale()
    this.setState({
      lng,
      loading: false
    })
  }

  selectImage = async () => {
    try {
      const res = await ImageSelect.ImageSelect()
      res.uri &&
        this.setState({
          avatar: res,
          change: true
        })
    } catch (error) {

    }
  }

  onChange = (key, value) => {
    let { state } = this;

    if (key === 'phone') {
      value = value.split(' ')

      state[key].value = value[1] ? value[1] : ''
      this.setState({
        ...state,
        change: true
      })
    } else {
      state[key].value = value;
      this.setState({ ...state, change: true });
    }
  }

  onPressSave = async () => {
    const {
      currentUser: {
        photo,
        cell_phone
      },
      currentUser,
      dispatch
    } = this.props

    const {
      name,
      email,
      phone,
      avatar,
      description,
      validatePhoneVar,
      callingCode
    } = this.state

    const changes = {}

    const newPhone = `+${callingCode} ${phone.value}`

    try {
      this.setState({ loadingButton: true })
      if (description.value != '' || phone.value != '' || email.value != '' || name.value != '' || avatar != '') {
        if (phone.value != '' && newPhone != cell_phone) {
          changes.cell_phone = newPhone
          if (validatePhoneVar) {
            const confirmResult = await validatePhone({ cell_phone: newPhone })
            if (confirmResult.data.code) {
              this.setState({
                confirmResult: confirmResult.data.code
              })
              return this.toggleModalConfirmPhone()
            } else {
              console.log('1')
              return successMessage('Este telefono ya existe o es invalido')
            }
          }
        }
        if (description.value != '' && description.value != currentUser.lastname) {
          changes.lastname = description.value
        }
        if (email.value != '' && email.value != currentUser.email) {
          changes.email = email.value
        }
        if (name.value != '' && name.value != currentUser.name) {
          changes.name = name.value
        }
        if (name.value != '' && name.value != currentUser.name) {
          changes.name = name.value
        }
        if (avatar) {
          const urlPhoto = await uploadAsset(
            'profileImage',
            avatar.uri,
            `${avatar.fileName}${avatar.timestamp}`,
            { contentType: avatar.type }
          )
          changes.photo = urlPhoto
        }
      }

      const res = await EditProfileUser(changes, currentUser._id)
      dispatch({
        type: SET_USER,
        payload: {
          ...res.data.user
        }
      });

      successMessage('Usuario actualizado')
      this.setState({ loadingButton: false, change: false })
    } catch (error) {
      this.setState({ loadingButton: false })
      return successMessage('Telefono incorrecto', 'danger')
    }
  }

  toggleModalConfirmPhone = () => {
    this.setState({
      modalConfirmPhone: {
        ...this.state.modalConfirmPhone,
        visibleConfirm: !this.state.modalConfirmPhone.visibleConfirm
      }
    })
  }

  onPressConfirmCode = async () => {
    const {
      confirmCode,
      confirmResult,
    } = this.state

    try {
      if (confirmResult === confirmCode.value) {
        await this.setState({
          validatePhoneVar: false
        })
        await this.onPressSave()

        this.setState({
          validatePhoneVar: true
        })

        this.toggleModalConfirmPhone()
      } else {
        return successMessage('Codigo invalido', 'danger')
      }
    } catch (error) {
      this.setState({
        errorMessage: 'Revisa tu informacion',
        loadingButton: false
      })
      this.toggleModalError()
    }
  }

  render() {

    const {
      lng,
      loading,
      email,
      name,
      phone,
      change,
      avatar,
      loadingButton,
      description,
      cca2,
      callingCode,
      modalConfirmPhone,
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
              text={lng.account}
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
            <Loading />
            :
            <Content
              bounces={false}
              contentContainerStyle={styles.content}
            >
              <TouchableOpacity
                onPress={() => this.selectImage()}
              >
                <Image
                  PlaceholderContent={<Loading />}
                  style={styles.avatar}
                  source={avatar ? { uri: avatar.uri } : currentUser.photo ? { uri: currentUser.photo } : img_empty}
                />
              </TouchableOpacity>
              <Text
                style={styles.title}
              >
                {lng.upload_photo}
              </Text>
              <View
                style={styles.inputContainer}
              >
                <MainInput
                  placeholder={currentUser.name}
                  value={name.value}
                  onChangeText={(value) => this.onChange('name', value)}
                  customStyle={styles.input}
                  icon={
                    <View
                      style={styles.pencil}
                    >
                      <Image
                        source={pencil}
                      />
                    </View>
                  }
                />
                {/* <MainInput
                  placeholder={'Descripcion'}
                  value={description.value}
                  onChangeText={(value) => this.onChange('description', value)}
                  customStyle={styles.input}
                  icon={
                    <View
                      style={styles.pencil}
                    >
                      <Image
                        source={pencil}
                      />
                    </View>
                  }
                /> */}
                <MainInput
                  placeholder={currentUser.email}
                  value={email.value}
                  keyboardType={'email-address'}
                  onChangeText={(value) => this.onChange('email', value)}
                  customStyle={styles.input}
                  key
                  icon={
                    <View
                      style={styles.pencil}
                    >
                      <Image
                        source={pencil}
                      />
                    </View>
                  }
                />
                <MainInput
                  placeholder={currentUser.cell_phone}
                  value={`+(${callingCode}) ${phone.value}`}
                  onChangeText={(value) => this.onChange('phone', value)}
                  customStyle={styles.inputCus}
                  keyboardType={'phone-pad'}
                  icon={
                    <View
                      style={styles.country}
                    >
                      <CountryPicker
                        showCallingCode
                        onChange={value => {
                          this.setState({
                            cca2: value.cca2,
                            callingCode: value.callingCode
                          })
                        }}
                        styles={modalDark}
                        cca2={cca2}
                        translation="eng"
                        filterPlaceholderTextColor={'rgba(255,255,255,0.2)'}
                        closeable
                        animationType={'slide'}
                        filterable
                        filterPlaceholder={'Buscar'}
                        closeButtonImage={storeIcon}
                        showCountryNameWithFlag
                      />
                    </View>
                  }
                />
              </View>
            </Content>
        }
        {/* confirm */}
        <ModalAlert
          close
          onPressClose={() => {
            this.setState({ loadingButton: false })
            this.toggleModalConfirmPhone()
          }}
          visible={modalConfirmPhone.visibleConfirm}
          title={
            <Image
              source={checkIcon}
            />
          }
          phoneNumber
          onChangeText={(value) => this.onChange('confirmCode', value)}
          message={lng.confirm_your_code}
          subtitle={lng.set_code}
          btnTitle={lng.confirm}
          placeholder={lng.code}
          onPress={() => this.onPressConfirmCode()}
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

export default connect(mapStateToProps)(EditProfile);