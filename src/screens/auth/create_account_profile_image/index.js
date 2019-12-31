import React, { Component } from 'react';
import {
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { Image } from 'react-native-elements';

//component
import CustomHeader from '../../../components/header';
import HeaderTitle from '../../../components/header_title';
import Loading from '../../../components/loading';
import BackButton from '../../../components/back_button';

//customs
import styles, { modalDark } from './styles';

//locale
import locale from '../../../locale';

//action
import { SET_USER } from '../../../actions/user';

//icons
import img_empty from '../../../assets/images/img_empty.png';

//api
import { EditProfileUser } from '../../../api/user';

//utils
import successMessage from '../../../utils/success_message';
import ImageSelect from '../../../utils/image_picker';
import uploadAsset from '../../../utils/upload_asset';
import MainButton from '../../../components/button';
import { INIT_SESSION } from '../../../actions/auth';

class SetProfileImage extends Component {

	state = {
		lng: {},
		loading: true,
		avatar: null,
		loadingButton: false,
	}

	async componentDidMount() {
		const lng = await locale()
		this.setState({
			lng,
			loading: false
		})
	}

	selectImage = async () => {
		try {
			const res = await ImageSelect.ImageSelect()
			res.uri &&
				this.setState({
					avatar: res,
				})
		} catch (error) {

		}
	}

	onChange = (key, value) => {
		let { state } = this;

		state[key].value = value;
		this.setState({ ...state });
	}

	onPressSave = async () => {
		const {
			dispatch,
			currentUser
		} = this.props

		const {
			avatar,
		} = this.state

		const changes = {}

		try {
			this.setState({ loadingButton: true })
			if (avatar) {
				const urlPhoto = await uploadAsset(
					'profileImage',
					avatar.uri,
					`${avatar.fileName}${avatar.timestamp}`,
					{ contentType: avatar.type }
				)
				changes.photo = urlPhoto
			} else {
				this.setState({ loadingButton: false })
				return successMessage('Foto de perfil es requerida', 'danger')
			}

			const res = await EditProfileUser(changes, currentUser._id)
			dispatch({
				type: SET_USER,
				payload: {
					...res.data.user
				}
			});

			dispatch({
				type: INIT_SESSION,
				payload: {
					firstTime: true
				}
			});

			successMessage('Usuario Creado')
			this.setState({ loadingButton: false })
		} catch (error) {
			console.log(error)
			this.setState({ loadingButton: false })
		}
	}

	onPressSkip = () => {
		const {
			dispatch
		} = this.props

		dispatch({
			type: INIT_SESSION,
			payload: {
				firstTime: true
			}
		});
	}


	render() {

		const {
			lng,
			loading,
			avatar,
			loadingButton,
		} = this.state

		const {
			currentUser
		} = this.props

		return (
			<Container
				style={styles.container}
			>
				<CustomHeader
					center={
						<HeaderTitle
							text={'Foto de perfil'}
						/>
					}
					left={
						<BackButton
							onPress={() => this.props.navigation.goBack()}
						/>
					}
				/>
				{
					loading ?
						<Loading />
						:
						<Content
							bounces={false}
							contentContainerStyle={styles.content}
						>

							<TouchableOpacity
								onPress={() => this.selectImage()}
							>
								<Image
									PlaceholderContent={<Loading />}
									style={styles.avatar}
									source={avatar ? { uri: avatar.uri } : currentUser.photo ? { uri: currentUser.photo } : img_empty}
								/>
							</TouchableOpacity>
							<Text style={styles.title}>
								Pon tu foto de perfil para que podamos distinguirte mejor entre la variedad de usuarios
							</Text>

							<View
								style={styles.btnContainer}
							>
								<MainButton
									raised_green
									text={lng.skip}
									sm
									onPress={() => this.onPressSkip()}
								/>
								<MainButton
									white
									text={lng.next}
									sm
									onPress={() => this.onPressSave()}
									loading={loadingButton}
								/>
							</View>
						</Content>
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

export default connect(mapStateToProps)(SetProfileImage);