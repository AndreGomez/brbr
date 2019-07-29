import React from 'react';
import { Modal, Image, Text, TouchableOpacity, View } from 'react-native';
import { Content, Container, Input } from 'native-base'

//custom
import styles from './styles';

//component
import MainButton from '../button';

//assets
import closeModal from '../../assets/icons/close_modal.png';
import machine_je from '../../assets/icons/machine_je.png';
import checkcheck from '../../assets/icons/checkcheck.png';

export default function ServicesModal(props) {

  const {
    visible,
    onPress,
    onPressClose,
    hair,
    bear,
    onPressType
  } = props

  return (
    <Modal
      visible={visible}
      transparent
      animationType={'fade'}
    >
      <Container
        style={styles.container}
      >
        <Content
          contentContainerStyle={styles.content}
          bounces={false}
        >
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => onPressClose()}
          >
            <Image
              source={closeModal}
            />
          </TouchableOpacity>
          <Image
            source={machine_je}
          />
          <Text
            style={styles.title}
          >
            Selecciona uno o varios servicios
          </Text>
          <View
            style={styles.row}
          >
            <Text
              style={styles.lbl}
            >
              Cabello
            </Text>
            <TouchableOpacity
              style={hair ? styles.btnSelect : styles.btnNoSelect}
              onPress={() => onPressType('hair')}
            >
              {
                hair &&
                <Image
                  source={checkcheck}
                />
              }
            </TouchableOpacity>
          </View>
          <View
            style={styles.row}
          >
            <Text
              style={styles.lbl}
            >
              Barba
            </Text>
            <TouchableOpacity
              style={bear ? styles.btnSelect : styles.btnNoSelect}
              onPress={() => onPressType('bear')}
            >
              {
                bear &&
                <Image
                  source={checkcheck}
                />
              }
            </TouchableOpacity>
          </View>
          <MainButton
            onPress={() => onPress()}
            sm
            black
            text={'Aceptar'}
            containerStyle={styles.btn}
          />
        </Content>
      </Container>
    </Modal>
  );
}