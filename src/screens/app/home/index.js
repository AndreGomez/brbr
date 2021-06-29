import React, { Component } from 'react';
import {
	View,
	TouchableOpacity,
	Image,
	FlatList,
	Text,
	TextInput,
	StatusBar,
	Platform,
	AppState,
	RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import ModalAlert from '../../../components/modal_alerts';
import Logo from '../../../components/logo';
import BarberVip from '../../../components/barber_vip';
import BarberArround from '../../../components/barber_arround';
import Loading from '../../../components/loading';
import chatBubleIcon from '../../../assets/icons/chat_burble.png';

//customs
import styles from './styles';

//locale
import locale from '../../../locale';

//actions
import { DESTROY_SESSION } from '../../../actions/auth';

//api
import {
	getBarbersArround
} from '../../../api/barbers'

//icons
import prefIcon from '../../../assets/icons/preferencies.png';
import searchIcon from '../../../assets/icons/search.png';
import vipIcon from '../../../assets/icons/vip.png';
import locationIcon from '../../../assets/icons/marker.png';
import calendarIcon from '../../../assets/icons/calendar.png';
import brbr_machineIcon from '../../../assets/icons/brbr_machine.png';
import search_grey from '../../../assets/icons/search_grey.png';

//utils
import {
	getLocation,
	MAP_KEY,
	MAP_API_PLACE,
	getMyAddres
} from '../../../utils/location';
import { multiplePermissions } from '../../../utils/permissions';
import parseError from '../../../utils/parse_error';
import ServicesModal from '../../../components/services_modal';
import DateModal from '../../../components/date_modal';
import alertMessaje from '../../../utils/alertMessaje';
import { getAppoiment, getAppoimentPendingReview } from '../../../api/appoinments';
import MainButton from '../../../components/button';
import Review from '../review';
import LocationInput from '../../../components/location_input';
import { resize } from '../../../utils/styles';

class Home extends Component {

	state = {
		lng: {},
		barberVips: [],
		loading: true,
		search: false,
		acceptPermission: false,
		barbersArround: [],
		location: '',
		refreshing: false,
		barbersArroundSearch: null,
		servicesModal: {
			visible: false,
			hair: true,
			bear: false
		},
		dateModal: {
			visible: false,
			today: false,
			thisWeek: true,
			nextWeek: false
		},
		extraData: false,
		date: 'thisWeek',
		position: {
			lat: null,
			lng: null
		},
		resAppoInProgress: [],
		locationSearch: {
			value: '',
			type: '',
			required: false
		},
		appoPendingReview: null
	}

	async componentDidMount() {
		try {
			const lng = await locale()
			// AppState.addEventListener('change', this.handleGetResources)
			const resAppoInProgress = await getAppoiment(this.props.currentUser._id,
				{
					states: [
						{
							state: 'in progress'
						}
					]
				}
			)

			const resAppoPendingReview = await getAppoimentPendingReview()


			await this.verifyPermissions()
			this.setState({
				lng,
				loading: false,
				resAppoInProgress: resAppoInProgress.data,
				appoPendingReview: resAppoPendingReview.data != 0 ? resAppoPendingReview.data[0] : null
			})
		} catch (error) {
			console.log(error)
		}
	}

	componentWillUnmount = () => {
		AppState.removeEventListener('change')
	}

	handleGetResources = () => {
		this.verifyPermissions()
	}

	verifyPermissions = async () => {
		let permisos = ["ACCESS_FINE_LOCATION"];
		let requestPermissions = await multiplePermissions(permisos);
		const lng = await locale()
		if (requestPermissions) {
			await this.getCurrentLocation();
			return true;
		}
		this.setState({
			loading: false,
			acceptPermission: false,
			barbersArround: [],
			lng
		})
		return false;
	}

	getCurrentLocation = async () => {
		const { state } = this
		const { currentUser } = this.props
		const lng = await locale()
		try {
			const position = await getLocation()

			const barbersArround = await getBarbersArround({
				range: 4,
				location: [
					position.coords.latitude,
					position.coords.longitude
				]
			})

			const resMyAddress = await getMyAddres(position.coords)
			console.log(resMyAddress)
			state.position.lat = position.coords.latitude
			state.position.lng = position.coords.longitude
			state.location = resMyAddress.data.results[0].formatted_address
			state.acceptPermission = true
			state.locationCoords = position.coords
			state.barbersArround = barbersArround.data
			state.loading = false
			this.setState({
				...state,
				lng
			})
		} catch (error) {
			console.log(error)
			const barbersArround = await getBarbersArround({
				range: 7,
				location: currentUser.country === 'mx' ? [
					19.4270245,
					-99.1676647
				] :
					[
						13.6914757, -89.2502714
					]
			})

			const resMyAddress = await getMyAddres(
				currentUser.country === 'mx' ?
					{ latitude: 19.4270245, longitude: -99.1676647 } :
					{ latitude: 13.6914757, longitude: -89.2502714 }
			)
			console.log(resMyAddress)
			state.position.lat = currentUser.country === 'mx' ? 19.4270245 : 13.6914757
			state.position.lng = currentUser.country === 'mx' ? -99.1676647 : -89.2502714
			state.location = resMyAddress.data.results[0].formatted_address
			state.acceptPermission = true
			state.locationCoords = currentUser.country === 'mx' ?
				{ latitude: 19.4270245, longitude: -99.1676647 } :
				{ latitude: 13.6914757, longitude: -89.2502714 }
			state.barbersArround = barbersArround.data
			state.loading = false
			this.setState({
				...state,
				lng
			})
			// parseError(error)
		}
	}

	onDestroySession = () => {
		const { dispatch } = this.props;

		dispatch({
			type: DESTROY_SESSION,
			payload: {}
		});
	}

	renderVipsList = () => (
		<FlatList
			horizontal={!this.state.search}
			data={this.state.barberVips}
			renderItem={(barberVip) => this.renderVips(barberVip)}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.vipList}
			keyExtractor={(a, i) => `${i}`}
			ListEmptyComponent={<Text style={styles.empty}>{this.state.lng.not_barbers_arround}</Text>}
		/>
	)

	renderVips = (brbr) => (
		<BarberVip
			onPressBarberVip={() => this.navigateTo('BrbrProfile', brbr)}
			img={brbr.item.barber.img}
			addres={brbr.item.barber.addres}
			stars={brbr.item.barber.stars}
			name={brbr.item.barber.name}
			horizontal={this.state.search}
		/>
	)

	onPressBarberVip = (id) => {

	}

	renderArroundList = () => (
		<FlatList
			data={this.state.barbersArroundSearch ? this.state.barbersArroundSearch : this.state.barbersArround}
			ListEmptyComponent={<Text style={styles.empty}>{this.state.lng.not_barbers_arround}</Text>}
			renderItem={(barberArround) => this.renderArround(barberArround)}
			showsVerticalScrollIndicator={false}
			keyExtractor={(a, i) => `${i}`}
		/>
	)

	renderArround = (brbr) => {
		const { servicesModal, extraData, date } = this.state
		return (
			<BarberArround
				extraData={extraData}
				languages={brbr.item.barber.languages}
				onPressBarberArround={() => this.navigateTo('BrbrProfile', brbr)}
				img={brbr.item.barber.photo}
				addres={brbr.item.barber.address.description}
				stars={brbr.item.barber.qualification}
				name={`${brbr.item.barber.name}`}
				price={
					brbr.item.barber.services.hair.cost ||
						brbr.item.barber.services.beard.cost ?
						servicesModal.hair && servicesModal.bear ? brbr.item.barber.services.hair.cost + brbr.item.barber.services.beard.cost :
							servicesModal.hair ? brbr.item.barber.services.hair.cost :
								servicesModal.bear ? brbr.item.barber.services.beard.cost :
									'0.0'
						:
						'0.0'}
				cash={this.state.lng.CASH}
				reserve={this.state.lng.RESERVE}
				onPress={() => this.onPressBarberReserve(brbr)}
			/>
		)
	}

	onPressBarberReserve = async (brbr) => {
		const { servicesModal, dateModal, date, position } = this.state

		var passDate = false
		var passService = false

		await Object.keys(servicesModal).map(res => {
			if (servicesModal[res]) {
				passDate = true
			}
		})

		await Object.keys(servicesModal).map(res => {
			if (servicesModal[res]) {
				passService = true
			}
		})

		if (passDate && passService) {
			var hairCost = servicesModal.hair ? brbr.item.barber.services.hair.cost : '0'
			if (this.props.currentUser.promotion.use_code.code) {

				const percent = (hairCost / 100) * parseInt(this.props.currentUser.promotion.use_code.percentage)
				hairCost = hairCost - percent
			}
			this.navigateTo('BrbrReserve',
				{
					...brbr,
					positionAppoint: { ...position },
					dateForService: date,
					location: this.state.location,
					servicesSelected: { hair: servicesModal.hair, bear: servicesModal.bear },
					price: brbr.item.barber.services.hair.cost ||
						brbr.item.barber.services.beard.cost ?
						servicesModal.hair && servicesModal.bear ? hairCost + brbr.item.barber.services.beard.cost :
							servicesModal.hair ? hairCost :
								servicesModal.bear ? brbr.item.barber.services.beard.cost :
									'0.0'
						:
						'0.0'
				})
		} else {
			alertMessaje('Debe seleccionar un dia y que servicios desea')
		}


	}

	navigateTo = (screen, data = {}) => {
		const { navigation } = this.props

		navigation.navigate(screen, data)
	}

	searchText = (e) => {
		const { state } = this
		let text = e.toLowerCase()
		let item = state.barbersArround
		let filteredName = item.filter((item) => {
			return item.barber.name.toLowerCase().match(text)
		})
		if (!text || text === '') {
			state.barbersArroundSearch = null
			this.setState({
				...state
			})
		} else if (!Array.isArray(filteredName) && !filteredName.length) {
			state.barbersArroundSearch = []
			this.setState({
				...state
			})
		} else if (Array.isArray(filteredName)) {
			state.barbersArroundSearch = filteredName
			this.setState({
				...state
			})
		}
	}

	onPressType = (type) => {
		const { state } = this

		state.servicesModal[type] = !state.servicesModal[type]

		this.setState({
			...state,
			extraData: !state.extraData
		})
	}

	onPressTypeDate = (type) => {
		const { state } = this

		state.dateModal[type] = !state.dateModal[type]
		if (type != 'visible') {
			Object.keys(state.dateModal).map(res => {
				if (res != type) {
					state.dateModal[res] = false
				}
			})
			state.date = type
		}

		this.setState({
			...state,
			extraData: !state.extraData
		})
	}

	_onRefresh = async () => {
		this.setState({ refreshing: true });
		await this.verifyPermissions()
		this.setState({ refreshing: false });
	};

	onChange = (key, value) => {
		const { state } = this

		state[key].value = value

		this.setState({
			...state
		})
	}

	getCoords = async (data, details) => {
		const description = data.description
		const lat = details.result.geometry.location.lat
		const lng = details.result.geometry.location.lng

		try {
			const barbersArround = await getBarbersArround({
				range: 7,
				location: [
					lat,
					lng
				]
			})

			const barbersData = barbersArround.data.sort(this.compare)

			this.setState({
				position: {
					lat,
					lng
				},
				location: description,
				locationSearch: { value: '' },
				barbersArround: barbersData
			})
		} catch (error) {
			console.log('error', error)
		}
	}

	compare(a, b) {
		const bandA = a.distance;
		const bandB = b.distance;

		let comparison = 0;
		if (bandA > bandB) {
			comparison = 1;
		} else if (bandA < bandB) {
			comparison = -1;
		}
		return comparison;
	}

	render() {

		const {
			lng,
			loading,
			location,
			search,
			acceptPermission,
			barbersArround,
			barberVips,
			servicesModal,
			dateModal,
			refreshing,
			resAppoInProgress,
			locationSearch,
			appoPendingReview
		} = this.state

		const {
			currentUser
		} = this.props

		return (
			<Container
				style={styles.container}
			>
				<StatusBar
					backgroundColor={Platform.OS === 'ios' ? '#fff' : 'black'}
					barStyle='light-content'
				/>
				<View
					style={styles.header}
				>
					<CustomHeader
						center={
							<Logo
								imageContainerStyles={styles.logo}
							/>
						}
						left={
							<TouchableOpacity
								onPress={() => this.props.navigation.toggleDrawer()}
							>
								<Image
									source={prefIcon}
								/>
							</TouchableOpacity>
						}
						right={
							<TouchableOpacity
								style={styles.searchIcon}
								onPress={() =>
									// this.setState({ search: !this.state.search, barbersArroundSearch: null })
									this.navigateTo('MyProfile')
								}
							>
								{
									// search ?
									//   <Text
									//     style={styles.cancel}
									//   >
									//     {lng.cancel}
									//   </Text>
									//   :
									<Image
										style={styles.chatBubleIcon}
										source={chatBubleIcon}
									/>
								}
							</TouchableOpacity>
						}
					/>
				</View>
				{
					loading ?
						<Content>
							<Spinner
								color={'white'}
							/>
						</Content>
						:
						acceptPermission ?
							<Content
								refreshControl={
									<RefreshControl
										refreshing={refreshing}
										onRefresh={this._onRefresh}
									/>
								}
								contentContainerStyle={styles.content}
							>
								{
									search ?
										<View
											style={styles.search}
										>
											<Image
												source={search_grey}
											/>
											<TextInput
												onChangeText={(text) => this.searchText(text)}
												placeholder={lng.start_search}
												style={styles.input}
											/>
										</View>
										:
										<View
											style={styles.searchContainer}
										>
											<View
												style={styles.location}
												activeOpacity={1}
											>
												<Image
													source={locationIcon}
												/>
												<LocationInput
													text="Starting Point *"
													placeholder={{
														label: location,
														value: null,
														color: 'red',
													}}
													top={resize(45, 'h')}
													valueP={locationSearch.value}
													onValueChange={(value) => this.onChange('locationSearch', value)}
													onPress={(data, details) => this.getCoords(data, details)}
												/>
											</View>
											<View
												style={styles.calendarAndServices}
											>
												<TouchableOpacity
													onPress={() => this.onPressTypeDate('visible')}
													style={styles.calendar}
													activeOpacity={0.8}
												>
													<Image
														source={calendarIcon}
													/>
													<Text
														numberOfLines={1}
														style={styles.locationText}
													>
														{
															dateModal.today ?
																'Hoy' :
																dateModal.thisWeek ?
																	'Esta Semana' :
																	dateModal.nextWeek ?
																		'Prox. Semana' :
																		lng.add
														}
													</Text>
												</TouchableOpacity>
												<TouchableOpacity
													onPress={() => this.onPressType('visible')}
													style={styles.services}
													activeOpacity={0.8}
												>
													<Image
														source={brbr_machineIcon}
													/>
													<Text
														numberOfLines={1}
														style={styles.locationText}
													>
														{
															servicesModal.hair || servicesModal.bear ?
																`${servicesModal.hair ? 'Cabello' : ''} ${servicesModal.bear ? 'Barba' : ''}`
																:
																lng.select
														}
													</Text>
												</TouchableOpacity>
											</View>
										</View>
								}
								<View>
									{
										search ?
											<Text
												style={styles.reco}
											>
												{lng.reco}
											</Text>
											:

											barberVips.length != 0 &&
											<View
												style={styles.vipContainer}
											>
												<Image
													source={vipIcon}
												/>
												<Text
													style={styles.vipText}
												>
													{lng.vip_experience}
												</Text>
											</View>
									}

									{
										barberVips.length != 0 && (
											this.renderVipsList()
										)
									}
								</View>
								<View
									style={styles.separator}
								/>
								<View
									style={styles.brbrArroundContainer}
								>
									<Text
										style={styles.brbrArroundText}
									>
										{`${barbersArround.length} ${lng.arround_of_you}`}
									</Text>
									{this.renderArroundList()}
								</View>
							</Content>
							:
							<Content>
								<Text
									style={styles.empty}
								>
									{lng.accept_permissions}
								</Text>
							</Content>
				}
				<ServicesModal
					visible={servicesModal.visible}
					onPress={() => this.onPressType('visible')}
					onPressClose={() => this.onPressType('visible')}
					hair={servicesModal.hair}
					bear={servicesModal.bear}
					onPressType={(type) => this.onPressType(type)}
				/>
				<DateModal
					visible={dateModal.visible}
					onPress={() => this.onPressTypeDate('visible')}
					onPressClose={() => this.onPressTypeDate('visible')}
					today={dateModal.today}
					thisWeek={dateModal.thisWeek}
					nextWeek={dateModal.nextWeek}
					onPressType={(type) => this.onPressTypeDate(type)}
				/>
				{
					resAppoInProgress.length != 0 &&
					<MainButton
						bottom

						text={lng.service_in_progress}
						onPress={() => this.navigateTo('DateDetail', { service: true, ...resAppoInProgress[0] })}
					/>
				}
				{
					currentUser.appoinmentFinish &&
					!loading &&
					<Review
						visible={true}
						dateId={currentUser.appoinmentFinish}
					/>
				}
				{
					currentUser.appoinmentFinish &&
					!loading &&
					<Review
						visible={true}
						dateId={currentUser.appoinmentFinish}
					/>
				}
				{
					appoPendingReview &&
					!loading &&
					<Review
						visible={true}
						dateId={appoPendingReview._id}
					/>
				}
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.user
	}
};

export default connect(mapStateToProps)(Home);