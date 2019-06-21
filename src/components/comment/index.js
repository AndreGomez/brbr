import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import { Spinner } from 'native-base';

//customs
import styles from './styles';

export default function Comment(props) {

  const {
    avatar,
    title,
    city,
    name,
    date,
    body
  } = props

  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.header}
      >
        <Image
          style={styles.avatar}
          source={{ uri: avatar }}
        />
        <View>
          <Text
            style={styles.name}
          >
            {name}
          </Text>
          <Text
            style={styles.city}
          >
            {city}
          </Text>
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
          {date}
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