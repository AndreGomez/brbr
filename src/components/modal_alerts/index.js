import React from 'react';
import { Modal, Image, Text, TouchableOpacity } from 'react-native';
import { Content, Container } from 'native-base'

//custom
import styles from './styles';

//component
import MainButton from '../button';

//assets
import closeModal from '../../assets/icons/close_modal.png';

export default function ModalAlert(props) {

  const {
    visible,
    title,
    message,
    btnTitle,
    onPress,
    close,
    onPressClose,
    bottom
  } = props

  return (
    <Modal
      visible={visible}
      transparent
      animationType={bottom ? 'slide' : 'fade'}
    >
      <Container
        style={
          [
            styles.container,
            bottom && styles.bottomContainer
          ]
        }
      >
        <Content
          contentContainerStyle={
            [
              styles.content,
              bottom && styles.bottom
            ]
          }
          bounces={false}
        >
          {
            close &&
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => onPressClose()}
            >
              <Image
                source={closeModal}
              />
            </TouchableOpacity>
          }
          {title}
          <Text
            style={styles.message}
          >
            {message}
          </Text>
          <MainButton
            md
            black
            text={btnTitle}
            containerStyle={styles.btn}
            onPress={() => onPress()}
          />
        </Content>
      </Container>
    </Modal>
  );
}