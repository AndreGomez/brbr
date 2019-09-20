import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Loading from '../../../components/loading';

//locale
import locale from '../../../locale';

//customs
import styles from './styles';

//firebase
import firebase from 'react-native-firebase';

//moment
import moment from 'moment';
import { sendPush } from '../../../api/user';

//utis
import formatDateEnEs from '../../../utils/getFormatDate';

let unsubscribe;

class Chat extends Component {

  state = {
    loading: true,
    lng: {},
    message: '',
    messages: [],
    extraData: false,
    loadingBtn: false
  }

  async componentDidMount() {
    const { currentUser } = this.props

    const idCollection = `${currentUser._id}-${this.props.navigation.state.params.idBarber}`

    unsubscribe = firebase.firestore().collection(idCollection).onSnapshot(async (doc) => {
      const allMessages = []
      const data = await firebase.firestore().collection(idCollection).orderBy('numerMessage').get()

      data.forEach((doc) => {
        allMessages.push({
          ...doc._data,
          type: doc._data.sendMessage == currentUser._id ? 'owner' : 'receiver'
        })
      });

      this.setState({
        messages: allMessages,
        loadingBtn: false,
        message: ''
      })
    })

    const data = await firebase.firestore().collection(idCollection).orderBy('numerMessage').get()

    const allMessages = []

    data.forEach((doc) => {
      allMessages.push({
        ...doc._data,
        type: doc._data.sendMessage == currentUser._id ? 'owner' : 'receiver'
      })
    });

    const lng = await locale()
    this.setState({
      loading: false,
      lng,
      messages: allMessages
    })
  }

  async componentWillUnmount() {
    unsubscribe();
  }

  onPressSend = async () => {
    const { message, messages, extraData } = this.state
    const { currentUser } = this.props

    if (message != '') {

      this.setState({
        loadingBtn: true
      })

      const idCollection = `${currentUser._id}-${this.props.navigation.state.params.idBarber}`

      await sendPush({
        title: `Nuevo mensaje de ${currentUser.name}`,
        body: message,
        data: {}
      }, this.props.navigation.state.params.idBarber)

      firebase.firestore().collection(idCollection).add({
        idUser: currentUser._id,
        idBarber: this.props.navigation.state.params.idBarber,
        date: moment().format('YYYY-MM-DD'),
        hour: moment().format('H:m'),
        message: message,
        sendMessage: currentUser._id,
        numerMessage: messages.length
      })
    }
  }

  renderMessages = () => (
    <FlatList
      ref={(ref) => { this.scrollView = ref; }}
      extraData={this.state.extraData}
      data={this.state.messages}
      keyExtractor={(a, i) => `${i}`}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: false })}
      renderItem={(item) => this.renderMessageItem(item.item)}
    />
  )

  renderMessageItem = (item) => {
    const { currentUser } = this.props
    if (item.type === 'owner') {
      return (
        <View
          style={styles.messageOwner}
        >
          <Text
            style={styles.textOwner}
          >
            {item.message}
          </Text>
          <Text
            style={styles.dateHourTxt}>
            {formatDateEnEs(item.date)}, {item.hour}
          </Text>
        </View>
      )
    } else {
      return (
        <View
          style={styles.messageReciever}
        >
          <Text
            style={styles.textReciever}
          >
            {item.message}
          </Text>
          <Text
            style={styles.dateToTxt}>
            {formatDateEnEs(item.date)}, {item.hour}
          </Text>
        </View>
      )
    }
  }

  render() {

    const {
      loading,
      lng,
      message,
      loadingBtn
    } = this.state

    return (
      <Container
        style={styles.container}
      >
        <CustomHeader
          center={
            <HeaderTitle
              text={'Chat'}
            />
          }
          left={
            <BackButton
              onPress={() => this.props.navigation.goBack()}
            />
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
              {
                this.renderMessages()
              }
              <View
                style={styles.inputContainer}
              >
                <TextInput
                  style={styles.input}
                  placeholder={`Escribe tu mensaje`}
                  value={message}
                  onChangeText={(message) => this.setState({ message })}
                />
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.onPressSend()}
                >
                  {
                    loadingBtn ?
                      <Spinner color={'white'} size={'small'} />
                      :
                      <Text
                        style={styles.btnText}
                      >
                        {'ENVIAR'}
                      </Text>
                  }
                </TouchableOpacity>
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

export default connect(mapStateToProps)(Chat);