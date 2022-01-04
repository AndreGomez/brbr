import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image
} from 'react-native';

//customs
import styles from './styles';

//icons
import vipIcon from '../../assets/icons/vip.png';
import starIcon from '../../assets/icons/star.png';
import ImagesCustom from '../imagesCustom';
import moment from 'moment';
import getFormatDate from '../../utils/getFormatDate';

export default function BrbrPaymentReview(props) {

	const {
		lng,
		vip,
		avatar,
		name,
		date,
		city,
		stars,
		paymentMethod,
		onPressProfile,
		onPressChange,
		hour,
		change,
		viewDate,
		type,
		address_name
	} = props

	return (
		<View
			style={styles.container}
		>
			<View
				style={styles.top}
			>
				<View
					style={styles.topHeader}
				>
					<Text
						style={styles.barber}
					>
						{type === 'barbershop' ? lng.brbr_profile_title_barbershop : lng.brbr_profile_title}
					</Text>
					{/* {
            vip &&
            <Image
              source={vipIcon}
            />
          } */}
					{
						viewDate &&
						<Text
							style={styles.barber}
						>
							{`${getFormatDate(date, 'es')}, ${hour}`}
						</Text>
					}
				</View>
				<View
					style={styles.topHeader}
				>
					<View
						style={styles.topHeaderContent}
					>
						<ImagesCustom
							img={avatar ? { uri: avatar } : null}
							styles={styles.avatar}
						/>
						<View>
							<Text
								style={styles.name}
							>
								{name}
							</Text>
							<Text
								style={styles.city}
								numberOfLines={2}
							>
								{address_name ? address_name : city}
							</Text>
						</View>
					</View>
					<View
						style={styles.starContent}
					>
						<View
							style={styles.asap}
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
						<TouchableOpacity
							onPress={onPressProfile}
						>
							<Text
								style={styles.txtTouch}
							>
								{lng.view_profile}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View
				style={styles.bottom}
			>
				<Text
					style={styles.payment}
				>
					{lng.method}
				</Text>
				<View>
					<Text
						style={styles.name}
					>
						{paymentMethod}
					</Text>
					{
						change &&
						<TouchableOpacity
							onPress={onPressChange}
						>
							<Text
								style={styles.txtTouch}
							>
								{'Cambiar o agregar'}
							</Text>
						</TouchableOpacity>
					}
				</View>
			</View>
		</View>
	);
}

BrbrPaymentReview.defaultProps = {
	vip: false,
	avatar: '',
	name: '',
	city: '',
	star: 0,
	date: '',
	paymentMethod: '',
	onPressProfile: () => { },
	onPressChange: () => { },
	hour: '',
	viewDate: false,
	type: '',
	address_name: null
}