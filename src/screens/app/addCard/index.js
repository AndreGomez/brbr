
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container } from 'native-base';
import { createDeviceSessionId } from 'openpay-react-native';

//customs
import styles from './styles';
import locale from '../../../locale';

//component
import MainButton from '../../../components/button';
import MainInput from '../../../components/input';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import ModalAlert from '../../../components/modal_alerts';
import Select from '../../../components/select';

//assets
import upsIcon from '../../../assets/icons/ups.png';
import cardsIcon from '../../../assets/icons/cards.png';
import cuestionIcon from '../../../assets/icons/cuestion.png';
import dateIcon from '../../../assets/icons/date_exp.png';
import cvvIcon from '../../../assets/icons/cvv.png';
import logoOpenPay from '../../../assets/images/logoOpenpay.png';

//utils
import countrys from '../../../utils/country_list';
import { validateFields } from '../../../utils/validators';

import { store } from '../../../../store';

//actions
import { SET_USER } from '../../../actions/user';

//api
import {
	addPaymentMethodToken,
	generateToken, serfinsaCard
} from '../../../api/payment';
import { GetMyInfo } from '../../../api/user';
import successMessage from '../../../utils/success_message';

class AddCardForm extends Component {

	state = {
		lng: {},
		modalDateData: {
			visible: false
		},
		modalCVVData: {
			visible: false
		},
		modalErrorData: {
			visible: false,
			message: ''
		},
		cardInfo: {
			name: {
				value: '',
				type: '',
				required: true
			},
			cardNumber: {
				value: '',
				type: '',
				required: true
			},
			cvv: {
				value: '',
				type: '',
				required: true
			},
			date: {
				value: '',
				type: '',
				required: true
			},
			country: {
				value: '',
				type: '',
				required: true
			}
		},
		loadingButton: false
	}

	async componentDidMount() {
		const lng = await locale()
		const { currentUser, navigation } = this.props
		this.setState({
			lng
		})
	}

	goBack = () => {
		const { navigation } = this.props

		navigation.goBack()
	}

	onChange = (key, value) => {
		let { state } = this;

		state.cardInfo[key].value = value;
		this.setState({ ...state });
	}

	toggleModal = (key, message = '') => {
		let { state } = this;

		state[key].visible = !state[key].visible;

		if (message != '') {
			state[key].message = message
		}
		this.setState({ ...state });
	}

	onPressAccept = async () => {
		const {
			dispatch,
			navigation,
			currentUser
		} = this.props

		try {
			this.setState({ loadingButton: true })
			const { cardInfo, lng } = this.state

			await validateFields(cardInfo)

			const date = cardInfo.date.value.split('/')
			const data = {
				card_number: cardInfo.cardNumber.value,
				holder_name: `${cardInfo.name.value}`,
				expiration_year: date[1],
				expiration_month: date[0],
				cvv2: cardInfo.cvv.value
			}
			let res = ''
			let authcode = null
			let brand = null
			let card_number = null
			let expiration_year = null
			let expiration_month = null
			let infoOpenPay = ''
			if (currentUser.country === 'sv') {
				const serfisaData = await serfinsaCard({
					card: data.card_number,
					cvv: data.cvv2,
					date: data.expiration_month + data.expiration_year
				})
				authcode = serfisaData.data.auth
				card_number = serfisaData.data.card_number
				brand = serfisaData.data.brand
				expiration_year = serfisaData.data.expiration_year
				expiration_month = serfisaData.data.expiration_month
				res = serfisaData
			} else {
				res = await generateToken(data)
				infoOpenPay = await res.json()
				console.log(infoOpenPay)
				card_number = infoOpenPay.card.card_number
				brand = infoOpenPay.card.brand
				expiration_year = infoOpenPay.card.expiration_year
				expiration_month = infoOpenPay.card.expiration_month
			}
			const card = currentUser.country === 'sv' ? {
				id: res.data.token,
				card: data
			} : infoOpenPay
			console.log(card)
			const device_session_id = await createDeviceSessionId()
			if (card.card) {
				const resAAAA = await addPaymentMethodToken({
					device_session_id,
					token: card.id,
					payment_type: currentUser.country === 'sv' ? 'serfinsa' : 'openpay',
					authcode,
					brand,
					expiration_year,
					card_number,
					expiration_month
				})
				console.log('resAAAAresAAAA', resAAAA)
				const resUser = await GetMyInfo(currentUser._id)

				dispatch({
					type: SET_USER,
					payload: {
						...resUser.data
					}
				});

				if (!navigation.state.params.addExternal) {
					navigation.state.params.addCard(card.card)
				}

				successMessage('Agregado exitosamente')
				navigation.goBack()
				this.setState({ loadingButton: false })
			} else {
				console.log('card', card)

				if (card.description === 'expiration_month 22 is invalid, valid expirations months are 01 to 12') {
					this.toggleModal('modalErrorData', 'El formato de fecha debe ser YY/MM')
					this.setState({ loadingButton: false })
				} else {
					this.toggleModal('modalErrorData', this.error_callbak(card))
					this.setState({ loadingButton: false })
				}
			}
		} catch (error) {
			console.log('error', error)
			this.setState({ loadingButton: false })
			if (error.response) {
				if (error.response.data) {
					if (error.response.data.error) {
						if (error.response.data.error.description) {
							return this.toggleModal('modalErrorData', 'La tarjeta a sido declinada, ponte en contacto con tu banco.')
						}
					}
				}
			}
			this.toggleModal('modalErrorData', this.state.lng.all_fields_are_required)
		}
	}

	error_callbak = (response) => {
		var desc = response.description != undefined ? response.description : response.message;
		var error_code = response.http_code;
		var error_code2 = response.error_code;
		error_message = ''
		if (error_code === 400 && desc === 'card_number is required, holder_name is required, expiration_year expiration_month is required' ||
			error_code === 400 && desc === 'holder_name is required, card_number is required, expiration_year expiration_month is required' ||
			error_code === 400 && desc === 'holder_name is required, expiration_year expiration_month is required' ||
			error_code === 400 && desc === 'The CVV2 security code is required' ||
			error_code === 400 && desc === 'holder_name is required' ||
			error_code === 400 && desc === 'card_number is required, card_number is required' ||
			error_code === 400 && desc === 'expiration_year expiration_month is required' ||
			error_code === 400 && desc === 'expiration_month 00 is invalid, valid expirations months are 01 to 12' ||
			error_code === 400 && desc === 'holder_name is required, expiration_month 00 is invalid, valid expirations months are 01 to 12' ||
			error_code === 400 && desc === 'card_number is required, holder_name is required, card_number is required' ||
			error_code === 400 && desc === 'card_number is required, expiration_year expiration_month is required' ||
			error_code === 400 && desc === 'holder_name is required, card_number is required, card_number is required' ||
			error_code === 400 && desc === 'holder_name is required, card_number length is invalid' ||
			error_code === 400 && desc === 'card_number length is invalid') {
			error_message = 'Por favor, proporciona todos los datos que se solicitan de la tarjeta.';
		} else if (error_code === 400 && desc === 'cvv2 length must be 3 digits' || error_code === 400 && desc === 'cvv2 length must be 4 digits' || error_code === 400 && desc === 'cvv2 must contain only digits') {
			error_message = 'Por favor, proporciona correctamente el código de seguridad de la tarjeta.';
		} else if (error_code === 422 && desc === 'The card number verification digit is invalid') {
			error_message = 'Por favor, proporciona de forma correcta todos los datos que se solicitan de la tarjeta.';
		} else if (error_code === 400 && desc === 'The expiration date has already passed') {
			error_message = 'Por favor, proporciona de forma correcta la fecha de vencimiento de la tarjeta año/mes.';
		} else if (error_code === 400 && desc === 'card_number must contain only digits') {
			error_message = 'Por favor, proporciona de forma correcta el número de la tarjeta.';
		}

		return error_message
	}

	render() {

		const {
			lng,
			cardInfo: {
				name,
				lastName,
				cardNumber,
				cvv,
				date,
				country
			},
			modalDateData,
			modalCVVData,
			modalErrorData,
			loadingButton
		} = this.state
		const { currentUser } = this.props
		return (
			<Container
				style={styles.container}
			>
				<CustomHeader
					center={
						<HeaderTitle
							text={lng.add_card_form_title}
						/>
					}
					left={
						<BackButton
							onPress={() => this.goBack()}
						/>
					}
				/>
				<Content
					bounces={false}
					style={styles.content}
				>
					<View
						style={styles.titleContainer}
					>
						<Image
							source={cardsIcon}
							style={styles.cardsIcon}
						/>
						<Text
							style={styles.title}
						>
							{lng.add_card_form_complete_form}
						</Text>
					</View>
					<MainInput
						placeholder={'Nombre del titular'}
						value={name.value}
						onChangeText={(value) => this.onChange('name', value)}
					/>
					{/* <MainInput
            placeholder={lng.last_name}
            value={lastName.value}
            onChangeText={(value) => this.onChange('lastName', value)}
            customStyle={styles.input}
          /> */}
					<MainInput
						keyboardType={'numeric'}
						placeholder={lng.add_card_form_card_number}
						value={cardNumber.value}
						onChangeText={(value) => {
							if (value.length <= 16) {
								this.onChange('cardNumber', value)
							}
						}}
						customStyle={styles.input}
					/>
					<View
						style={styles.inputContainer}
					>
						<MainInput
							keyboardType={'numeric'}
							placeholder={lng.date_exp}
							value={date.value}
							onChangeText={(value) => {
								if (value.length <= 5) {
									if (value.length === 2) {
										if (this.state.cardInfo.date.value.length === 3) {
											return this.onChange('date', value)
										} else {
											return this.onChange('date', `${value.slice(0, 2)}/${value.slice(3, 4)}`)
										}
									}
									if (this.state.cardInfo.date.value.length === 2 && value.length === 3) {
										return this.onChange('date', `${value.slice(0, 2)}/${value.slice(3, 4)}`)
									}
									return this.onChange('date', value)
								}
							}}
							customStyle={styles.input}
							icon={
								<TouchableOpacity
									onPress={() => this.toggleModal('modalDateData')}
									style={styles.inputIcon}
								>
									<Image
										source={cuestionIcon}
									/>
								</TouchableOpacity>
							}
							sm
						/>
						<MainInput
							placeholder={lng.CVV}
							value={cvv.value}
							keyboardType={'numeric'}
							onChangeText={(value) => {
								if (value.length <= 4) {
									this.onChange('cvv', value)
								}
							}}
							customStyle={styles.input}
							icon={
								<TouchableOpacity
									onPress={() => this.toggleModal('modalCVVData')}
									style={styles.inputIcon}
								>
									<Image
										source={cuestionIcon}
									/>
								</TouchableOpacity>
							}
							sm
						/>
					</View>
					<Select
						data={countrys()}
						placeholder={'Select...'}
						value={country.value}
						onValueChange={(value) => this.onChange('country', value)}
						customContainerStyle={styles.select}
					/>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('About')}
						style={styles.aboutContainer}
					>
						<Text
							style={styles.about}
						>
							Ver terminos y condiciones, contacto, privacidad
						</Text>
					</TouchableOpacity>
					{
						currentUser.country === 'mx' &&
						<Image
							source={logoOpenPay}
							resizeMode={'contain'}
							style={styles.openLogo}
						/>
					}

					<View
						style={[styles.btnContainer, currentUser.country === 'sv' && styles.addMargin]}
					>
						<MainButton
							raised_green
							text={lng.cancel}
							sm
							onPress={() => this.goBack()}
						/>
						<MainButton
							onPress={() => this.onPressAccept()}
							white
							text={lng.accept}
							sm
							loading={loadingButton}
						/>
					</View>
				</Content>
				{/* DATE */}
				<ModalAlert
					visible={modalDateData.visible}
					title={
						<Image
							source={dateIcon}
						/>
					}
					bottom
					message={lng.add_card_form_modal_date_message}
					btnTitle={lng.accept}
					onPress={() => this.toggleModal('modalDateData')}
					close={true}
					onPressClose={() => this.toggleModal('modalDateData')}
				/>
				{/* CVV */}
				<ModalAlert
					visible={modalCVVData.visible}
					title={
						<Image
							source={cvvIcon}
						/>
					}
					bottom
					message={lng.add_card_form_modal_cvv_message}
					btnTitle={lng.accept}
					onPress={() => this.toggleModal('modalCVVData')}
					close={true}
					onPressClose={() => this.toggleModal('modalCVVData')}
				/>

				{/* ERROR */}
				<ModalAlert
					visible={modalErrorData.visible}
					title={
						<Text
							style={styles.ups}>
							¡Ups!
						</Text>
					}
					message={modalErrorData.message}
					btnTitle={lng.accept}
					onPress={() => this.toggleModal('modalErrorData')}
					close={true}
					onPressClose={() => this.toggleModal('modalErrorData')}
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

export default connect(mapStateToProps)(AddCardForm);