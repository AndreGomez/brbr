import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Image } from 'react-native-elements';

//customs
import styles from './styles';

//icons
import right_arrow from '../../assets/icons/right_arrow.png';
import img_empty from '../../assets/images/img_empty.png';
import Loading from '../loading';

export default function ItemList(props) {

  const {
    text,
    onPress,
    avatar,
    name,
    version,
    notifications,
    active,
    lng,
    alert,
    customStyles,
    card,
    use,
    emoji,
    onLongPress
  } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, customStyles]}
    >
      {
        name ?
          <View
            style={styles.row}
          >
            <View
              style={styles.row}
            >
              <Image
                PlaceholderContent={<Loading />}
                style={styles.avatar}
                source={avatar ? { uri: avatar } : img_empty}
              />
              <View
                style={styles.txtContainer}
              >
                <Text
                  style={styles.name}
                  numberOfLines={1}
                >
                  {name}
                </Text>
                <Text
                  style={styles.textLbl}
                >
                  {text}
                </Text>
              </View>
            </View>
            <Image
              source={right_arrow}
            />
          </View>
          :
          <View
            style={styles.row}
          >
            <Text
              style={styles.txt}
            >
              {text}
            </Text>

            {
              emoji ?
                <Text>
                  {emoji}
                </Text>
                :
                version ?
                  <Text
                    style={styles.version}
                  >
                    {version}
                  </Text>
                  :
                  notifications ?
                    <Text
                      style={active ? styles.active : styles.desactive}
                    >
                      {active ? lng.active : lng.desactive}
                    </Text>
                    :
                    <View
                      style={styles.row}
                    >
                      {
                        alert &&
                        <Text
                          style={styles.alert}
                        >
                          Incompleto
                      </Text>
                      }
                      {
                        use &&
                        <Text
                          style={styles.inUse}
                        >
                          En uso
                      </Text>
                      }
                      {
                        !card ?
                          <Image
                            source={right_arrow} />
                          :
                          card
                      }
                    </View>
            }
          </View>
      }
    </TouchableOpacity>
  );
}

ItemList.defaultProps = {
  text: '',
  onPress: () => { },
  alert: false,
  onLongPress: () => { }
}