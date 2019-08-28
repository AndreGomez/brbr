import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import Loading from '../../../components/loading';

//locale
import locale from '../../../locale';

//customs
import styles from './styles';

class Chat extends Component {

  state = {
    loading: true,
    lng: {},
    message: '',
    messages: [
      {
        message: 'Hola',
        type: 'owner'
      },
      {
        message: 'Hola',
        type: 'reciever'
      },
      {
        message: 'Hola',
        type: 'owner'
      }
    ],
    extraData: false
  }

  async componentDidMount() {
    const lng = await locale()
    this.setState({
      loading: false,
      lng
    })
  }

  onPressSend = () => {
    const { message, messages, extraData } = this.state

    if (message != '') {
      this.scrollView.scrollToEnd({ animated: true })
      messages.push({ message, type: 'owner' })
      this.setState({
        messages,
        message: '',
        extraData: !extraData
      })
    }
  }

  renderMessages = () => (
    <FlatList
      ref={(ref) => { this.scrollView = ref; }}
      extraData={this.state.extraData}
      data={this.state.messages}
      keyExtractor={(a, i) => `${i}`}
      renderItem={(item) => this.renderMessageItem(item.item)}
    />
  )

  renderMessageItem = (item) => {
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
        </View>
      )
    }
  }

  render() {

    const {
      loading,
      lng,
      message
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
                  placeholder={`Mensaje a Andre`}
                  value={message}
                  onChangeText={(message) => this.setState({ message })}
                />
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.onPressSend()}
                >
                  <Text
                    style={styles.btnText}
                  >
                    {'ENVIAR'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Content>
        }
      </Container>
    );
  }
}

export default connect()(Chat);