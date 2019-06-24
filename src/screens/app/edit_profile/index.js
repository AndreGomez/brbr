import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import ModalAlert from '../../../components/modal_alerts';
import Loading from '../../../components/loading';
import BackButton from '../../../components/back_button';
import MainButton from '../../../components/button';

//customs
import styles from './styles';

//locale
import locale from '../../../locale';
import MainInput from '../../../components/input';

//icons
import pencil from '../../../assets/icons/pencil.png';

class EditProfile extends Component {

  state = {
    lng: {},
    loading: true,
    name: 'Andre Gomez',
    avatar: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
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
    change: false
  }

  async componentDidMount() {
    const lng = await locale()
    this.setState({
      lng,
      loading: false
    })
  }

  onChange = (key, value) => {
    let { state } = this;

    state[key].value = value;
    this.setState({ ...state, change: true });
  }

  render() {

    const {
      lng,
      loading,
      avatar,
      email,
      name,
      phone,
      change
    } = this.state

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
            change &&
            <TouchableOpacity>
              <Text
                style={styles.save}
              >
                {lng.save}
              </Text>
            </TouchableOpacity>
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
              <TouchableOpacity>
                <Image
                  style={styles.avatar}
                  source={{ uri: avatar }}
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
                  placeholder={lng.name}
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
                  placeholder={lng.create_account_email}
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
                  placeholder={lng.create_account_tel}
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

export default connect()(EditProfile);