import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { Image } from 'react-native-elements';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import Loading from '../../../components/loading';
import BackButton from '../../../components/back_button';

//customs
import styles from './styles';

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

class EditProfile extends Component {

  state = {
    lng: {},
    loading: true,
    avatar: null,
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
    change: false,
    loadingButton: false
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

    state[key].value = value;
    this.setState({ ...state, change: true });
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
      avatar
    } = this.state

    const changes = {}

    try {
      this.setState({ loadingButton: true })
      if (phone.value != '' || email.value != '' || name.value != '' || avatar != '') {
        if (phone.value != '' && phone.value != cell_phone) {
          changes.cell_phone = phone.value
        }
        if (email.value != '' && email.value != currentUser.email) {
          changes.email = email.value
        }
        if (name.value != '' && name.value != currentUser.name) {
          changes.name = name.value
        }
        if (avatar != '') {
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
          ...res.data
        }
      });

      successMessage('Usuario actualizado')
      this.setState({ loadingButton: false })
    } catch (error) {
      this.setState({ loadingButton: false })
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
      loadingButton
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
                <MainInput
                  placeholder={currentUser.email}
                  value={email.value}
                  onChangeText={(value) => this.onChange('email', value)}
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
                <MainInput
                  placeholder={currentUser.cell_phone}
                  value={phone.value}
                  onChangeText={(value) => this.onChange('phone', value)}
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

export default connect(mapStateToProps)(EditProfile);