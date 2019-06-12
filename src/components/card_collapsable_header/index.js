import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

//custom 
import styles from './styles';

//icons
import cardsIcon from '../../assets/icons/cards.png';
import checkIcon from '../../assets/icons/check.png';
import paypalIcon from '../../assets/icons/paypal.png';

export default function CardCollapsableHeader(props) {

  const {
    title,
    onPress,
    check,
    card
  } = props

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={styles.cell}
    >
      {
        card ?
          <View
            style={[styles.cells, styles.cellLeft]}
          >
            <Image
              style={styles.cardIcon}
              resizeMode={'contain'}
              source={cardsIcon}
            />
            <Text
              style={styles.cellTitle}
            >
              {title}
            </Text>
          </View>
          :
          <View
            style={[styles.cells, styles.cellLeft]}
          >
            <Text
              style={[styles.cellTitle, { paddingLeft: 0 }]}
            >
              {title}
            </Text>
            <Image
              style={styles.paypalIcon}
              resizeMode={'contain'}
              source={paypalIcon}
            />
          </View>
      }
      <View
        style={[styles.cells, styles.cellRight]}
      >
        <View
          style={check ? styles.checkContainerChecked : styles.checkContainerUnchecked}
        >
          <Image
            style={styles.check}
            source={checkIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

CardCollapsableHeader.defaultProps = {
  title: ''
}