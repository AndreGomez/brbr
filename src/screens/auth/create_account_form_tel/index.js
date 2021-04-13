
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container } from 'native-base';

//customs
import styles, { modalDark } from './styles';
import locale from '../../../locale';

//component
import MainButton from '../../../components/button';
import MainInput from '../../../components/input';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import BackButton from '../../../components/back_button';
import ModalAlert from '../../../components/modal_alerts';
import successMessage from '../../../utils/success_message';
import nodeEmoji from 'node-emoji';

//assets
import upsIcon from '../../../assets/icons/ups.png';
import checkIcon from '../../../assets/icons/check.png';
import storeIcon from '../../../assets/icons/store.png';

//api
import { getCountries } from '../../../api/countries.js'
import firebase from 'react-native-firebase';
import {
	createAccount,
	loginUser,
	validateEmail,
	validatePhone
} from '../../../api/auth';

//actions
import { INIT_SESSION } from '../../../actions/auth';
import { SET_USER } from '../../../actions/user';

//utils
import { validateFields } from '../../../utils/validators';
import { CheckBox } from 'react-native-elements';
import CountryPicker from '../../../components/country_picker';
import { resize } from '../../../utils/styles';


const PLACEHOLDER_COLOR = "rgba(255,255,255,0.2)";

class CreateAccountFormTel extends Component {

	state = {
		lng: {},
		email: {
			value: '',
			type: 'email',
			required: true
		},
		name: {
			value: '',
			type: '',
			required: true
		},
		phone: {
			value: '',
			type: '',
			required: true
		},
		confirmCode: {
			value: '',
			type: '',
			required: true
		},
		password: {
			value: '',
			type: '',
			required: true
		},
		rPassword: {
			value: '',
			type: '',
			required: true
		},
		modalDataError: {
			visibleError: false
		},
		modalConfirmPhone: {
			visibleConfirm: false
		},
		modalData: {
			visible: false
		},
		check: false,
		callingCode: '52',
		flag: 'flag-mx',
		errorMessage: '',
		loadingButton: false,
		visiblePicker: false,
		country: {
			value: '',
			type: '',
			required: true
		},
		countries: []
	}

	async componentDidMount() {
		this.getCountriesList()
		const lng = await locale()
		this.setState({
			lng
		})
	}

	getCountriesList = async () => {
		try {
			const countries = await getCountries()
			this.setState({ countries: countries.data })
		} catch (error) {
			console.log(error)
		}
	}

	onChange = (key, value) => {
		const { state } = this
		if (key === 'phone') {
			value = value.split(' ')

			state[key].value = value[1] ? value[1] : ''
			this.setState({
				...state
			})
		} else {
			state[key].value = value
			this.setState({
				...state
			})
		}
	}

	goBack = () => {
		const { navigation } = this.props

		navigation.goBack()
	}

	toggleModalError = () => {
		this.setState({
			modalDataError: {
				...this.state.modalDataError,
				visibleError: !this.state.modalDataError.visibleError
			}
		})
	}

	toggleModal = () => {
		this.setState({
			modalData: {
				...this.state.modalData,
				visible: !this.state.modalData.visible
			}
		})
	}

	toggleModalConfirmPhone = () => {
		this.setState({
			modalConfirmPhone: {
				...this.state.modalConfirmPhone,
				visibleConfirm: !this.state.modalConfirmPhone.visibleConfirm
			}
		})
	}

	onPressNext = async () => {

		const {
			email,
			name,
			phone,
			callingCode,
			password,
			rPassword,
			check,
			country
		} = this.state

		if (check) {
			if (password.value === rPassword.value) {
				if (password.value.length >= 8) {
					try {
						this.setState({
							loadingButton: true
						})
						const res = await validateEmail({ email: email.value })
						if (res.data.exist == false) {

							const cell_phone = `+${callingCode} ${phone.value}`
							await validateFields({ email, name, phone, country })
							const confirmResult = await validatePhone({ cell_phone })
							if (confirmResult.data.code) {
								this.setState({
									confirmResult: confirmResult.data.code
								})
								this.toggleModalConfirmPhone()
							} else {
								this.setState({
									errorMessage: 'Este telefono ya existe o es invalido',
									loadingButton: false
								})
								return this.toggleModalError()
							}
						} else {
							this.setState({
								errorMessage: 'Este correo ya esta en uso',
								loadingButton: false
							})
							return this.toggleModalError()
						}
					} catch (error) {
						console.log(error)
						this.setState({
							loadingButton: false,
							errorMessage: error.response ?
								error == 'invalid_email' ?
									'Correo invalido' :
									error.response.data &&
										error.response.data.message === 'There was an error sending the message.' ?
										'Error al enviar el mensaje, revisa que el numero sea valido'
										:
										'Revisa tu info' : 'Verifique sus datos',
						})
						this.toggleModalError()
					}
					// this.toggleModal()
				} else {
					this.setState({
						errorMessage: 'La contraseña debe contener minimo 8 caracteres'
					})
					return this.toggleModalError()
				}
			} else {
				this.setState({
					errorMessage: 'las contraseñas no son iguales'
				})
				return this.toggleModalError()
			}
		} else {
			this.setState({
				errorMessage: 'Debe aceptar los terminos y condiciones'
			})
			return this.toggleModalError()
		}
	}

	onPressConfirmCode = async () => {
		const {
			confirmCode,
			confirmResult,
			email,
			name,
			phone,
			callingCode,
			password,
			country
		} = this.state

		const {
			dispatch
		} = this.props;

		try {
			if (confirmResult === confirmCode.value) {
				console.log(country.value)
				const dataSend = {
					email: email.value,
					password: password.value,
					name: name.value,
					lastname: 'Me encanta mi trabajo!',
					cell_phone: `+${callingCode} ${phone.value}`,
					device_token: '000',
					country: country.value
				}

				await createAccount(dataSend)

				const res = await loginUser({
					email: email.value,
					password: password.value,
				})

				dispatch({
					type: SET_USER,
					payload: {
						...res.data.user
					}
				});

				dispatch({
					type: INIT_SESSION,
					payload: {
						authorize: false,
						token: `Bearer ${res.data.token}`,
					}
				});

				this.toggleModalConfirmPhone()
				this.setState({
					loadingButton: false
				})

				this.navigateTo('PaymentMethodAuth', { email, name, phone, callingCode, country: country.value })
			} else {
				return successMessage('Codigo invalido', 'danger')
			}
		} catch (error) {
			console.log(error)
			this.setState({
				errorMessage: 'Revisa tu informacion',
				loadingButton: false
			})
			this.toggleModalError()
		}
	}

	onPressTryLogin = () => {
		const { navigation } = this.props

		navigation.popToTop()
	}

	navigateTo = (screen) => {
		const { navigation } = this.props

		navigation.navigate(screen)
	}

	onPressItemCountryPicker = (item) => {
		this.setState({
			flag: item.flag,
			callingCode: item.callingCode,
			visiblePicker: false
		})
	}

	render() {

		const {
			lng,
			email,
			name,
			phone,
			modalDataError: {
				visibleError
			},
			modalData: {
				visible
			},
			callingCode,
			errorMessage,
			loadingButton,
			modalConfirmPhone: {
				visibleConfirm,
			},
			password,
			rPassword,
			check,
			country,
			countries
		} = this.state

		return (
			<Container style={styles.container}>
				<CustomHeader
					center={
						<HeaderTitle
							text={lng.create_account_single}
						/>
					}
					left={
						<BackButton
							onPress={() => this.goBack()}
						/>
					}
				/>
				<Content
					contentContainerStyle={styles.content}
				>
					<MainInput
						placeholder={lng.create_account_name}
						onChangeText={(name) => this.onChange('name', name)}
						value={name.value}
						underText={lng.create_account_name_message}
					/>
					<MainInput
						customStyle={styles.input}
						placeholder={lng.create_account_email}
						onChangeText={(email) => this.onChange('email', email)}
						keyboardType={'email-address'}
						value={email.value}
					/>

					<MainInput
						customStyle={
							styles.inputPhone
						}
						placeholder={lng.create_account_tel}
						onChangeText={(phone) => this.onChange('phone', phone)}
						keyboardType={'phone-pad'}
						value={`+(${callingCode}) ${phone.value}`}
						underText={lng.create_account_tel_message}
						icon={
							<TouchableOpacity
								onPress={() => this.setState({ visiblePicker: true })}
								style={styles.country}
							>
								<Text style={styles.emoji}>{nodeEmoji.get(this.state.flag)}</Text>
							</TouchableOpacity>
						}
					/>
					<MainInput
						placeholder={lng.password}
						onChangeText={(value) => this.onChange('password', value)}
						value={password.value}
						secureTextEntry
						customStyle={styles.input}
					/>
					<MainInput
						customStyle={styles.input}
						placeholder={lng.re_new_password}
						onChangeText={(value) => this.onChange('rPassword', value)}
						secureTextEntry
						value={rPassword.value}
					/>
					<Text style={styles.label}>{lng.country_label}</Text>
					<View style={styles.row}>
						<FlatList
							data={countries}
							keyExtractor={(a, i) => `${i}`}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							extraData={this.state}
							renderItem={
								({ item, index }) => (
									<TouchableOpacity onPress={() => this.onChange('country', item.iso)} style={[styles.rowAltern,
									country.value === item.iso && styles.rowAlternSelect]}>
										<CheckBox
											checkedIcon='dot-circle-o'
											uncheckedIcon='circle-o'
											size={resize(25, 'h')}
											checkedColor={'#000'}
											uncheckedColor={'#FFF'}
											type="FontAwesome"
											checked={country.value === item.iso}
											containerStyle={styles.checkContainer}
											onPress={() => this.onChange('country', item.iso)}
										/>
										<Text style={[styles.textDoc, country.value === item.iso && styles.textDocSelect]}>{item.name}</Text>
									</TouchableOpacity>
								)
							}
						/>
					</View>
					<TouchableOpacity
						onPress={() => this.navigateTo('About')}
						style={styles.aboutContainer}
					>
						<Text
							style={styles.about}
						>
							Ver terminos y condiciones
            </Text>
					</TouchableOpacity>
					<CheckBox
						containerStyle={styles.check}
						checked={check}
						checkedColor={'black'}
						onPress={() => this.setState({ check: !check })}
						title={'He Leído y estoy de acuerdo con los términos y condiciones del servicio.'}
					/>
					<MainButton
						onPress={() => this.onPressNext()}
						text={lng.next}
						containerStyle={styles.btn}
						white
						sm
						loading={loadingButton}
					/>
				</Content>

				{/* error */}
				<ModalAlert
					visible={visibleError}
					title={
						<Text
							style={styles.upsTitle}
						>
							¡Ups!
            </Text>
					}
					message={errorMessage}
					btnTitle={lng.accept}
					onPress={() => this.toggleModalError()}
					close={true}
					onPressClose={() => this.toggleModalError()}
				/>

				{/* pass */}
				<ModalAlert
					visible={visible}
					title={
						<Image
							source={checkIcon}
						/>
					}
					message={lng.create_account_email_pass_message}
					btnTitle={lng.create_account_email_pass}
					onPress={() => this.onPressCompleteRegister()}
					close={true}
					onPressClose={() => this.toggleModal()}
				/>

				{/* confirm */}
				<ModalAlert
					close
					onPressClose={() => {
						this.setState({ loadingButton: false })
						this.toggleModalConfirmPhone()
					}}
					visible={visibleConfirm}
					title={
						<Image
							source={checkIcon}
						/>
					}
					phoneNumber
					onChangeText={(value) => this.onChange('confirmCode', value)}
					message={lng.confirm_your_code}
					subtitle={lng.set_code}
					btnTitle={lng.confirm}
					placeholder={lng.code}
					onPress={() => this.onPressConfirmCode()}
				/>
				<CountryPicker
					onPressItem={(item) => this.onPressItemCountryPicker(item)}
					onPressClose={() => this.setState({ visiblePicker: false })}
					visible={this.state.visiblePicker} />
			</Container>
		);
	}
}

export default connect()(CreateAccountFormTel);