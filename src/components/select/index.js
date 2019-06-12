import React from 'react';
import { View, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

//custom
import styles from './styles';

//assets
import dropIcon from '../../assets/icons/drop_down.png';

export default function Select(props) {

  const {
    value,
    placeholder,
    data,
    onValueChange,
    style,
    customContainerStyle
  } = props;

  return (
    <View>
      <View
        style={[styles.container, customContainerStyle]}
      >
        <RNPickerSelect
          placeholder={{
            label: placeholder,
            value: null,
            color: 'white',
          }}
          items={data}
          onValueChange={(val) => onValueChange(val)}
          style={{
            inputIOS: [styles.inputContainer, style],
            inputAndroid: [styles.inputContainer, style],
            iconContainer: styles.iconContainer,
            done: { color: '#000000' },
            chevronUp: { color: 'black', backgroundColor: 'black' },
            chevronContainer: { color: 'black', backgroundColor: 'black' },
            modalViewMiddle: { backgroundColor: 'black' },
            modalViewBottom: { backgroundColor: 'black' }
          }}
          value={value}
          useNativeAndroidPickerStyle={false}
          placeholderTextColor={'black'}
        />
        <Image
          resizeMode={'contain'}
          style={styles.icon}
          source={dropIcon}
        />
      </View>
    </View>
  );
}

Select.defaultProps = {
  placeholder: {
    label: 'Select an option',
    value: null,
    color: 'black',
  },
  data: [],
  onValueChange: () => { },
  style: styles.inputContainer,
  placeholderTextColor: 'black',
  disabled: false
}