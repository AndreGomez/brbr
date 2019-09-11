import React from 'react';
import { Modal, Image, Text, TouchableOpacity, View } from 'react-native';
import { Content, Container, Input } from 'native-base'

//custom
import styles from './styles';

//component
import MainButton from '../button';

//assets
import closeModal from '../../assets/icons/close_modal.png';
import machine_je from '../../assets/icons/calendar.png';
import checkcheck from '../../assets/icons/checkcheck.png';

export default function DateModal(props) {

  const {
    visible,
    onPress,
    onPressClose,
    onPressType,
    today,
    thisWeek,
    nextWeek,
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
            style={styles.img}
          />
          <Text
            style={styles.title}
          >
            Selecciona uno o varios servicios
          </Text>
          {/* <View
            style={styles.row}
          >
            <Text
              style={styles.lbl}
            >
              Hoy
            </Text>
            <TouchableOpacity
              style={today ? styles.btnSelect : styles.btnNoSelect}
              onPress={() => onPressType('today')}
            >
              {
                today &&
                <Image
                  source={checkcheck}
                />
              }
            </TouchableOpacity>
          </View> */}
          <View
            style={styles.row}
          >
            <Text
              style={styles.lbl}
            >
              Esta semana
            </Text>
            <TouchableOpacity
              style={thisWeek ? styles.btnSelect : styles.btnNoSelect}
              onPress={() => onPressType('thisWeek')}
            >
              {
                thisWeek &&
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
              Proxima semana
            </Text>
            <TouchableOpacity
              style={nextWeek ? styles.btnSelect : styles.btnNoSelect}
              onPress={() => onPressType('nextWeek')}
            >
              {
                nextWeek &&
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