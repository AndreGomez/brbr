
import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container } from 'native-base';

//customs
import styles from './styles';
import locale from '../../../locale';

import { resetPassword, resetPasswordSend } from '../../../api/auth'

//component
import MainButton from '../../../components/button';
import TextTouchable from '../../../components/text_touchable';
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import MainInput from '../../../components/input';
import BackButton from '../../../components/back_button';
import successMessage from '../../../utils/success_message';

class forgotPassword extends Component {

	state = {
		lng: {},
		form: {
			rePassword: {
				value: '',
				type: '',
				required: true
			},
			password: {
				value: '',
				type: '',
				required: true
			},
			email: {
				value: '',
				type: 'email',
				required: true
			},
			code: {
				value: '',
				type: '',
				required: true
			}
		},
		code: '',
		token: '',
		sendCode: false,
		loadingReset: false
	}

	async componentDidMount() {
		const lng = await locale()

		this.setState({
			lng
		})
	}

	onPressLogin = () => {
		const { dispatch } = this.props;

		dispatch({
			type: INIT_SESSION,
			payload: {
				authorize: true
			}
		});
	}

	createAccount = () => {
		const { navigation } = this.props

		navigation.navigate('CreateAccountStep1')
	}

	goBack = () => {
		const { navigation } = this.props

		navigation.goBack()
	}

	onChange = (key, value) => {
		let { state } = this;

		state.form[key].value = value;
		this.setState({ ...state });
	}

	onPressResetPassword = async () => {
		const {
			form: {
				rePassword,
				password,
			},
			code,
			form,
			token
		} = this.state

		if (code === form.code.value) {
			if (password.value === rePassword.value) {
				if (password.value.length >= 8) {
					try {
						this.setState({
							loadingReset: true
						})

						const res = await resetPasswordSend({
							password: password.value,
							token: token
						})
						console.log(res)

						this.setState({
							loadingReset: false,
						})

						successMessage('Cambio de contraseña exitoso!')
						this.props.navigation.goBack()
					} catch (error) {
						console.log(error.response)
						this.setState({
							loadingReset: false
						})
					}
				} else {
					successMessage('La contraseña debe tener mas de 8 caracteres', 'danger')
				}
			} else {
				successMessage('Las contraseñas no coinciden', 'danger')
			}
		} else {
			successMessage('Codigo invalido', 'danger')
		}
	}

	onPressSendCode = async () => {

		const {
			form: {
				rePassword,
				password,
				email
			}
		} = this.state

		if (email.value != null && email.value != '') {
			try {
				this.setState({
					loadingSendCode: true
				})

				const res = await resetPassword({
					email: email.value
				})
				console.log(res)
				this.setState({
					sendCode: true,
					loadingSendCode: false,
					code: res.data.code,
					token: res.data.token
				})
			} catch (error) {
				successMessage('Este correo no esta asociado a ninguna cuenta', 'danger')
				this.setState({
					loadingSendCode: false
				})
			}
		} else {
			successMessage('El correo es requerido', 'danger')
		}
	}

	render() {

		const {
			lng,
			form: {
				rePassword,
				password,
				email
			},
			sendCode,
			loadingSendCode,
			code,
			loadingReset
		} = this.state

		return (
			<Container style={styles.container}>
				<CustomHeader
					center={
						<HeaderTitle
							text={lng.reset_password}
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
					{
						sendCode ?
							<View>
								<MainInput
									placeholder={'Codigo de verificación'}
									onChangeText={(value) => this.onChange('code', value)}
									value={code.value}
									rounded
									underText={'Pon el codigo de verificación que enviamos a tu correo'}
									label={'Codigo de verificación'}
									customContainer={styles.input}
								/>
								<MainInput
									placeholder={lng.new_password}
									onChangeText={(value) => this.onChange('password', value)}
									value={password.value}
									rounded
									secureTextEntry
									underText={lng.password_validation}
									label={lng.new_password}
									customContainer={styles.input}
								/>
								<MainInput
									placeholder={lng.re_new_password}
									onChangeText={(value) => this.onChange('rePassword', value)}
									value={rePassword.value}
									rounded
									secureTextEntry
									label={lng.re_new_password}
									customContainer={styles.inputBottom}
								/>
								<View
									style={styles.btnContainer}
								>
									<MainButton
										onPress={() => this.onPressResetPassword()}
										sm
										text={lng.next}
										containerStyle={styles.btn}
										white
										loading={loadingReset}
									/>
								</View>
							</View>
							:
							<View>
								<MainInput
									placeholder={lng.email_placeholder}
									onChangeText={(value) => this.onChange('email', value)}
									value={email.value}
									rounded
									label={lng.email}
									customContainer={styles.input}
									underText={'Te enviaremos un codigo de verificación a tu correo, luego con ese codigo podras cambiar la contraseña.'}
								/>
								<View
									style={styles.btnContainer2}
								>
									<MainButton
										onPress={() => this.onPressSendCode()}
										sm
										text={lng.send}
										containerStyle={styles.btn}
										white
										loading={loadingSendCode}
									/>
								</View>
							</View>
					}
				</Content>
			</Container>
		);
	}
}

export default connect()(forgotPassword);