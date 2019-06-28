import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';

//custom
import styles from './styles';

//icons
import plusIcon from '../../assets/icons/plus_card.png';
import activeIcon from '../../assets/icons/active.png';

export default function CardSelection(props) {

  const {
    name,
    active,
    onPress,
    lng
  } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.mCard, name === '' ? styles.cardEmty : styles.card]}
    >
      {
        name === '' ?
          <Image
            style={styles.plusIcon}
            source={plusIcon}
            resizeMode={'contain'}
          />
          :
          <View
            style={styles.cardBody}
          >
            <View
              style={styles.headerContainer}
            >
              <Text
                style={[styles.titleHeader, styles.leftHeader]}
              >
                {lng.brbr}
              </Text>
              <Text
                style={[styles.titleHeader, styles.rightHeader]}
              >
                {lng.brbr}
              </Text>
            </View>
            <Text
              style={styles.nameLabel}
            >
              {lng.NAME}
            </Text>
            <Text
              style={styles.name}
            >
              {name}
            </Text>
            <View
              style={styles.active}
            >
              <Text
                style={styles.activeTxt}
              >
                {lng.active_card}
              </Text>
              <Image
                style={styles.activeIcon}
                source={activeIcon}
                resizeMode={'contain'}
              />
            </View>
          </View>
      }
    </TouchableOpacity>
  );
}