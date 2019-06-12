import { Dimensions, Platform } from 'react-native';

//env
import { WIDTH_DESING, HEIHGT_DESING } from '../../enviroment';

export const { width, height } = Dimensions.get(Platform.OS === 'ios' ? 'screen' : 'window');

export const resize = (size, type = 'width') => {
  const currentSize = type === 'width' ? WIDTH_DESING : HEIHGT_DESING
  const diviceSize = type === 'width' ? width : height
  const percent = (size * 100) / currentSize
  const percentJS = percent / 100

  return diviceSize * percentJS
}

export const PRIMARY_GREY = '#2d2d2d'
export const SECUNDARY_GREY = '#5C5C5C'
export const TERTIARY_GREY = '#CFCFCF'
export const GOLD = '#F0BC5E'
export const PRIMARY_GREEN = '#94FFB4'
export const SECUNDARY_GREEN = '#44edce'
export const PURPLE_BLUE = '#4f67ff'
export const ORANGE = '#f09558'
export const RED = '#f5564e'

export const AIRBNB_MEDIUM = 'Airbnb Cereal App';
export const AIRBNB_BOOK = 'AirbnbCereal Book';
export const AIRBNB_BOLD = 'AirbnbCereal Bold';
export const AIRBNB_BLACK = 'AirbnbCereal Black';
export const AIRBNB_EXTRA_BOLD = 'AirbnbCereal ExtraBold';