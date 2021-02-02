import { StyleSheet, Platform } from 'react-native';

//utils
import { resize, TERTIARY_GREY, AIRBNB_MEDIUM, width } from '../../../utils/styles';

const DARK_COLOR = "black";
const LIGHT_COLOR = "#FFF";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	content: {
		alignItems: 'center',
		paddingHorizontal: resize(20),
		paddingBottom: resize(25, 'h')
	},
	emoji: {
		fontSize: resize(25)
	},
	check: {
		marginTop: resize(10, 'h')
	},
	upsTitle: {
		fontSize: resize(80),
		fontFamily: AIRBNB_MEDIUM,
		fontWeight: '700'
	},
	aboutContainer: {
		width: resize(370),
		alignSelf: 'flex-start',
		marginTop: resize(10, 'h')
	},
	about: {
		color: 'white',
		textDecorationLine: 'underline',
	},
	input: {
		marginTop: resize(25, 'height'),
	},
	inputPhone: {
		marginTop: resize(25, 'height'),
		width: '100%'
	},
	btn: {
		marginTop: resize(40, 'height'),
	},
	ups: {

	},
	phone: {
		alignItems: 'center',
	},
	country: {
		height: resize(60, 'h'),
		position: 'absolute',
		width: resize(40),
		right: 0,
		alignItems: 'flex-end',
		justifyContent: 'center',
		top: resize(25, 'h'),
	},
	rowAltern: {
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderWidth: resize(2),
		borderColor: '#fff',
		marginVertical: resize(10, 'h'),
		paddingHorizontal: resize(20),
		borderRadius: resize(32),
		width: resize(140),
		marginHorizontal: resize(20)
	},
	rowAlternSelect: {
		borderColor: '#000',
		backgroundColor: '#fff',
	},
	textDoc: {
		fontSize: resize(14, 'h'),
		color: '#fff',
	},
	textDocSelect: {
		color: '#000',
		fontWeight: '700'
	},
	checkContainer: {
		paddingLeft: 0,
		marginLeft: 0
	},
	row: {
		flexDirection: 'row',
		alignContent: 'space-around',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: resize(5, 'h'),
	},
	label: {
		fontSize: resize(18),
		lineHeight: resize(20, 'h'),
		color: '#fff',
		marginTop: resize(30, 'h'),
		alignSelf: 'flex-start'
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
