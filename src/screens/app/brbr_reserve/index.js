import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';

//component
import Loading from '../../../components/loading';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import MainButton from '../../../components/button';
import ModalAlert from '../../../components/modal_alerts';

//customs
import styles from './styles';

//locale
import locale from '../../../locale';

//icons
import vipIcon from '../../../assets/icons/vip.png';
import portraitBack from '../../../assets/images/portrait.png';
import starIcon from '../../../assets/icons/star.png';
import brbr_sithIcon from '../../../assets/icons/brbr_sith.png';
import { getBarberProfile } from '../../../api/barbers';
import ImagesCustom from '../../../components/imagesCustom';
import alertMessage from '../../../utils/alertMessaje';

//api
import moment from 'moment';
import daysOfTheWeek from '../../../utils/daysOfTheWeek';


class BrbrReserve extends Component {

	state = {
		lng: {},
		loading: true,
		days: [],
		hours: [],
		price: 0,
		daySelected: null,
		hourSelected: null,
		visible: false
	}

	async componentDidMount() {
		const lng = await locale()
		const barberProfile = await getBarberProfile(this.props.navigation.state.params.item.barber._id)
		const dateToSelectService = this.props.navigation.state.params.dateForService
		const schedule = barberProfile.data.schedule
		var days = []

		if (dateToSelectService == 'today') {
			const datToNow = moment().format('YYYY-MM-DD')

			days.push(
				{
					date: moment(datToNow).format('YYYY-MM-DD'),
					day: daysOfTheWeek[moment(datToNow).format('dddd')].dayEs,
					active: false
				}
			);

			var ultimateDays = []

			days.map((res, i) => {
				const filter = schedule.filter(scheduleRes => scheduleRes.date == res.date)
				if (filter.length != 0) {
					days[i]._id = filter[0]._id
					days[i].hours = filter[0].hours
					days[i].active = false

					ultimateDays.push(days[i])
				}
			})

			days = ultimateDays
		}

		if (dateToSelectService == 'thisWeek') {
			var numberDayOfTheWeek = moment().isoWeekday()
			numberDayOfTheWeek = numberDayOfTheWeek === 7 ? moment().subtract(1, 'days') : moment()

			var startOfWeek = moment(numberDayOfTheWeek).add(1, 'days').startOf('isoWeek');
			var endOfWeek = moment(numberDayOfTheWeek).add(1, 'days').endOf('isoWeek');

			var days = [];
			var day = startOfWeek;

			while (day <= endOfWeek) {
				days.push(
					{
						date: moment(day).format('YYYY-MM-DD'),
						day: daysOfTheWeek[moment(day).format('dddd')].dayEs,
						active: false
					}
				);
				day = day.clone().add(1, 'd');
			}

			var ultimateDays = []
			days.map((res, i) => {
				const filter = schedule.filter(scheduleRes => scheduleRes.date == res.date)
				if (filter.length != 0) {
					if (moment(res.date, 'YYYY-MM-DD').isAfter(moment().format('YYYY-MM-DD'), 'date') || moment(res.date, 'YYYY-MM-DD').format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {

						days[i]._id = filter[0]._id
						days[i].hours = filter[0].hours
						days[i].active = false

						ultimateDays.push(days[i])
					}
				}
			})

			days = ultimateDays
		}

		if (dateToSelectService == 'nextWeek') {
			var startOfWeek = moment().add(1, 'weeks').startOf('isoWeek');
			var endOfWeek = moment().add(1, 'weeks').endOf('isoWeek');

			var days = [];
			var day = startOfWeek;

			while (day <= endOfWeek) {
				days.push(
					{
						date: moment(day).format('YYYY-MM-DD'),
						day: daysOfTheWeek[moment(day).format('dddd')].dayEs,
						active: false
					}
				);
				day = day.clone().add(1, 'd');
			}
			console.log('daysdays', days)
			var ultimateDays = []

			days.map((res, i) => {
				const filter = schedule.filter(scheduleRes => scheduleRes.date == res.date)
				console.log('filter', filter)
				if (filter.length != 0) {
					days[i]._id = filter[0]._id
					days[i].hours = filter[0].hours
					days[i].active = false

					ultimateDays.push(days[i])
				}
			})
			console.log('ultimateDays,ultimateDaysultimateDays', ultimateDays)
			days = ultimateDays
		}

		this.setState({
			lng,
			loading: false,
			barberInfo: { ...barberProfile.data },
			price: this.props.navigation.state.params.price,
			days
		})
	}

	setItemList = async (key, i) => {
		const { state } = this
		const today = moment().format('YYYY-MM-DD')

		var hourToday = moment().format('h:m A')

		if (moment().format('hh') < 10) {
			hourToday = moment().add(2, 'hours').format('h:m A')
		}

		await state[key].map((res, e) => {
			if (i != e) {
				state[key][e].active = false
			} else {
				state[key][e].active = true
			}
		})

		if (key == 'days') {
			state.daySelected = state[key][i]

			if (state.daySelected.date == today) {
				const realHours = []
				state[key][i].hours.map(res => {
					var beginningTime = moment(hourToday, 'h:m A');
					var endTime = moment(res.hour, 'h:m A');
					if (beginningTime.isBefore(endTime)) {
						realHours.push(res)
					}
				})

				state.hours = realHours
			} else {
				state.hours = state[key][i].hours
			}
		}

		if (key == 'hours') {
			state.hourSelected = state[key][i]
		}

		this.setState({
			...state,
		})
	}

	dayList = () => (
		<ScrollView
			horizontal
		>
			{
				this.state.days.length != 0 ?
					this.state.days.map((res, i) =>
						<TouchableOpacity
							key={i}
							onPress={() => this.setItemList('days', i)}
							style={
								[
									styles.hour,
									res.active &&
									styles.hourActive
								]
							}
						>
							<Text
								style={
									[
										styles.hours,
										res.active &&
										styles.activeText
									]
								}
							>
								{res.day}
							</Text>
						</TouchableOpacity>

					)
					:
					<Text style={{ color: 'white' }}>
						Lo sentimos, este barbero no trabajara
						{
							this.props.navigation.state.params.dateForService == 'today' ?
								' hoy' :
								this.props.navigation.state.params.dateForService == 'thisWeek' ?
									' esta semana' :
									this.props.navigation.state.params.dateForService == 'nextWeek' &&
									' la proxima semana'
						}
					</Text>
			}
		</ScrollView>
	)

	hourList = () => (
		<ScrollView
			horizontal
		>
			{
				this.state.hours.length != 0 ?
					this.state.hours.map((res, i) =>
						!res.reserve &&
						i % 2 == 0 &&
						<TouchableOpacity
							key={i}
							onPress={() => this.setItemList('hours', i)}
							style={
								[
									styles.hour,
									res.active &&
									styles.hourActive
								]
							}
						>
							<Text
								style={
									[
										styles.hours,
										res.active &&
										styles.activeText
									]
								}
							>
								{res.hour}
							</Text>
						</TouchableOpacity>
					)
					:
					<Text style={{ color: 'white', paddingTop: 30 }}>No hay horas disponibles</Text>
			}
		</ScrollView>
	)

	onPressNext = () => {
		console.log('het')
		const { state } = this
		const { navigation } = this.props
		this.setState({
			visible: false
		})
		if (state.daySelected && state.hourSelected) {
			navigation.navigate('ServiceReview',
				{
					...this.props.navigation.state.params,
					daySelected: state.daySelected,
					hourSelected: state.hourSelected
				}
			)

		} else {
			alertMessage('Debe seleccionar un dia y una hora')
		}
	}

	toggleModal = () => {
		this.setState({
			visible: !this.state.visible
		})
	}

	render() {

		const {
			lng,
			loading,
			price,
			barberInfo,
			hours,
			visible,
			daySelected
		} = this.state

		const {
			dateForService
		} = this.props.navigation.state.params

		const { currentUser } = this.props
		return (
			<Container
				style={styles.container}
			>
				<CustomHeader
					center={
						!loading &&
						<HeaderTitle
							text={barberInfo.name}
						/>
					}
					left={
						<BackButton
							onPress={() => this.props.navigation.goBack()}
						/>
					}
					right={
						!loading &&
						barberInfo.vip &&
						<Image
							style={styles.vipIcon}
							source={vipIcon}
						/>
					}
				/>
				{
					loading ?
						<Content>
							<Spinner
								color={'white'}
							/>
						</Content>
						:
						<React.Fragment>
							<Image
								style={styles.portraitBack}
								source={portraitBack}
							/>
							<View
								style={styles.portraitBackFront}
							>
								{/* <Text
                  style={styles.name}
                >
                  {barberInfo.name}
                </Text> */}
								{
									barberInfo.address_name &&

									<Text
										style={styles.description}
										numberOfLines={6}
									>
										<Text
											style={styles.descriptionAltern}
										>
											{lng.address_barber}
										</Text>	{barberInfo.address_name}
									</Text>
								}
								<Text
									style={styles.description}
									numberOfLines={6}
								>
									{barberInfo.lastname}
								</Text>
								<View
									style={{ position: 'absolute', bottom: 10, left: 10 }}
								>
									<Text
										style={styles.talk}
									>
										Habla: ES{barberInfo.languages.english && '/EN'}{barberInfo.languages.french && '/FR'}
									</Text>
								</View>
							</View>
							<View
								style={styles.interSection}
							>
								<View
									style={styles.section}
								>
									<View
										style={{ flexDirection: 'row', alignItems: 'center' }}
									>
										<Text
											style={styles.stars}
										>
											{
												parseFloat(barberInfo.qualification).toFixed(1)
											}
										</Text>
										<Image
											source={starIcon}
										/>
									</View>
									<Text
										style={styles.lbl}
									>
										{lng.rese}
									</Text>
								</View>
								<View
									style={styles.section}
								>
									<ImagesCustom
										styles={styles.avatar}
										img={barberInfo.photo ? { uri: barberInfo.photo } : null}
									/>
								</View>
								<View
									style={styles.section}
								>
									<Text
										style={styles.stars}
									>
										{barberInfo.appointments}
									</Text>
									<Text
										style={styles.lbl}
									>
										{lng.cuts}
									</Text>
								</View>
							</View>
							<View
								style={styles.separator}
							/>
							{
								loading ?
									<Loading />
									:
									<Content
										bounces={false}
										contentContainerStyle={styles.content}
									>
										<Text
											style={styles.dateForService}
										>
											{
												dateForService == 'today' ?
													'Hoy' :
													dateForService == 'thisWeek' ?
														'Esta Semana' :
														dateForService == 'nextWeek' &&
														'Prox. Semana'
											}
										</Text>
										<Text
											style={styles.lblT}
										>
											{lng.day}
										</Text>
										{
											this.dayList()
										}
										<View
											style={styles.housContainer}
										>
											{
												hours.length != 0 &&
												<Text
													style={styles.lblT}
												>
													{lng.hour}
												</Text>
											}
											{
												daySelected &&
												this.hourList()
											}
										</View>
										<Text
											style={styles.price}
										>
											{barberInfo.country === 'mx' ? 'MXN ' + `$${parseFloat(price).toFixed(2)}` : 'USD ' + `$${parseFloat(price).toFixed(2)}`}
										</Text>
									</Content>
							}
							{
								!loading &&
								<MainButton
									bottom
									text={lng.reserve_now}
									onPress={() => barberInfo.type === 'barbershop' ? this.onPressNext() : this.toggleModal()}
								/>
							}
						</React.Fragment>
				}
				<ModalAlert
					visible={visible}
					title={
						<Text style={styles.brbrTxt}>
							brbr
						</Text>
					}
					message={'Confirma que tienes el permiso necesario del lugar al que llevamos tu servicio a domicilio. '}
					btnTitle={'Confirmar'}
					onPress={() => this.onPressNext()}
					close={true}
					onPressClose={() => this.toggleModal()}
				/>
			</Container>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		currentUser: state.user
	}
};

export default connect(mapStateToProps)(BrbrReserve);