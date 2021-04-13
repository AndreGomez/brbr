import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, AIRBNB_MEDIUM } from '../../../utils/styles';
const DARK_COLOR = "black";
const LIGHT_COLOR = "#FFF";

export default StyleSheet.create({
	container: {
		backgroundColor: 'black',
	},

	emoji: {
		fontSize: resize(25)
	},
	content: {
		paddingHorizontal: resize(20),
		alignItems: 'center',
		paddingTop: resize(42, 'h')
	},
	avatar: {
		borderColor: '#707070',
		borderWidth: 4,
		width: resize(100, 'h'),
		height: resize(100, 'h'),
		borderRadius: resize(50, 'h'),
	},
	inputCus: {
		marginTop: resize(25, 'height'),
		width: '100%'
	},
	title: {
		color: '#ffffff',
		fontFamily: AIRBNB_MEDIUM,
		fontSize: resize(18),
		fontWeight: Platform.OS === 'ios' ? '500' : '400',
		paddingTop: resize(21, 'h')
	},
	inputContainer: {
		width: '100%',
	},
	pencil: {
		position: 'absolute',
		right: 0,
		height: '100%',
		alignItems: 'center',
		flexDirection: 'row'
	},
	save: {
		color: '#94ffb4',
		fontFamily: AIRBNB_MEDIUM,
		fontSize: resize(16),
		fontWeight: Platform.OS === 'ios' ? '500' : '400',
		paddingRight: resize(20)
	},
	country: {
		height: resize(60, 'h'),
		width: resize(60, 'h'),
		position: 'absolute',
		right: 0,
		top: resize(25, 'h'),
		alignItems: 'flex-end'
	}
});

export const modalDark = StyleSheet.create({
	modalContainer: {
		backgroundColor: DARK_COLOR,
	},
	contentContainer: {
		backgroundColor: DARK_COLOR,
	},
	header: {
		backgroundColor: DARK_COLOR
	},
	itemCountryName: {
		borderBottomWidth: 0
	},
	countryName: {
		color: LIGHT_COLOR,
		fontFamily: AIRBNB_MEDIUM
	},
	letterText: {
		color: LIGHT_COLOR,
		fontFamily: AIRBNB_MEDIUM
	},
	input: {
		color: LIGHT_COLOR,
		borderBottomWidth: 1,
		borderColor: LIGHT_COLOR,
		fontFamily: AIRBNB_MEDIUM
	},
});