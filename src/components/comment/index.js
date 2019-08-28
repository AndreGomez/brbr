import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import { Spinner } from 'native-base';
import moment from 'moment';

//customs
import styles from './styles';
import ImagesCustom from '../imagesCustom';
import starIcon from '../../assets/icons/star.png';


export default function Comment(props) {

  const {
    avatar,
    title,
    city,
    name,
    date,
    body,
    stars
  } = props

  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.row}
      >
        <View
          style={styles.header}
        >
          <ImagesCustom
            colorLoading={'black'}
            styles={styles.avatar}
            img={avatar ? { uri: avatar } : null}
          />
          <View>
            <Text
              style={styles.name}
            >
              {name}
            </Text>

          </View>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text
            style={styles.stars}
          >
            {
              parseFloat(stars).toFixed(1)
            }
          </Text>
          <Image
            source={starIcon}
          />
        </View>
      </View>
      <View
        style={styles.center}
      >
        <Text
          style={styles.title}
        >
          {title}
        </Text>
        <Text
          style={styles.date}
        >
          {moment(date).format('DD MMM YYYY')}
        </Text>
      </View>
      <Text
        style={styles.body}
      >
        {body}
      </Text>
    </View>
  );
}

Comment.defaultProps = {
}