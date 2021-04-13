import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image
} from 'react-native';
import { connect } from 'react-redux';

//customs
import styles from './styles';

//icons
import vipIcon from '../../assets/icons/vip.png';
import starIcon from '../../assets/icons/star.png';
import ImagesCustom from '../imagesCustom';

function BrbrHistoryReserve(props) {

	const {
		lng,
	} = props
	return (
		<View
			style={styles.container}
		>
			<View
				style={styles.row}
			>
				<ImagesCustom
					styles={styles.avatar}
					img={props.barber.photo ? { uri: props.barber.photo } : null}
				/>
				<View
					style={styles.txtCont}
				>
					<Text
						style={styles.name}
					>
						{props.barber.name}
					</Text>
					<Text
						style={styles.city}
						numberOfLines={1}
					>
						{props.location[2]}
					</Text>
					<Text
						style={styles.date}
					>
						{`${props.date}, ${props.hour}`}
					</Text>
				</View>
			</View>
			<View
				style={styles.starCont}
			>
				<View
					style={[styles.row, { alignItems: 'center', justifyContent: 'flex-end' }]}
				>
					<Text
						style={styles.stars}
					>
						{
							parseFloat(props.barber.qualification).toFixed(1)
						}
					</Text>
					<Image
						source={starIcon}
					/>
				</View>
				<Text
					style={styles.efecti}
				>
					Tarjeta
        </Text>
				<Text
					style={styles.money}
				>
					{props.currentUser.country === 'mx' ? 'MXN' + ` $${props.services.beard.cost + props.services.eyebrows.cost + props.services.hair.cost}` : 'USD' + ` $${props.services.beard.cost + props.services.eyebrows.cost + props.services.hair.cost}`}
				</Text>
			</View>
		</View>
	);
}
const mapStateToProps = (state) => {
	return {
		currentUser: state.user
	}
};
export default connect(mapStateToProps)(BrbrHistoryReserve);

BrbrHistoryReserve.defaultProps = {

}