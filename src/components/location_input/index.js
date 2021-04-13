import React, { Component } from 'react';
import {
	View,
	TextInput,
	Image,
	Text
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';


//custom
import styles from './styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { resize } from '../../utils/styles';

const MAP_KEY = 'AIzaSyAomkkJKfTlE9WOc_yMt2btwNjzkLSjqw0'
const MAP_API_PLACE = 'https://maps.googleapis.com/maps/api/'
const CancelToken = axios.CancelToken;
let cancel = null;

class LocationInput extends Component {

	state = {
		places: []
	}

	onChange = async (text) => {
		this.props.onValueChange(text)
		try {
			this.setState({
				value: text
			})
			const res = await this.beginFetching(text)

			this.setState({
				places: res
			})
		} catch (error) {
			console.log(error)
		}
	}

	predictionToSuggestion = async (placeId, map_key = MAP_KEY) => {

		try {
			const fields =
				"address_component,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,plus_code,scope,type,url,utc_offset,vicinity";
			const suggestions = await fetch(
				`${MAP_API_PLACE}place/details/json?placeid=${placeId}&fields=${fields}&key=${map_key}`
			);
			return new Promise.resolve(suggestions.json());
		} catch (error) {
			return new Promise.reject(error);
		}
	};

	beginFetching = async (query, map_key = MAP_KEY) => {
		const { currentUser } = this.props
		const country = currentUser.country
		try {
			this.abortFetching();
			const urlToFetch = `${MAP_API_PLACE}place/autocomplete/json?input=${query}&language=es-419&key=${map_key}&components=country:${country}`;
			const response = await axios.get(urlToFetch, {
				cancelToken: new CancelToken(function executor(c) {
					cancel = c;
				}),
			});
			console.log(response.data)
			return new Promise.resolve(response.data.predictions);
		} catch (error) {
			return new Promise.reject(error);
		}
	};

	abortFetching = () => {
		if (cancel !== null) {
			cancel();
		}
	};

	onPressLocation = async (res, i) => {
		try {
			const place = await this.predictionToSuggestion(res.place_id)
			this.props.onPress(res, place)
			this.setState({
				places: []
			})
		} catch (error) {
			console.log('err', error)
		}
	}

	render() {
		const {
			text,
			placeholder,
			valueP,
			top
		} = this.props;

		const {
			places
		} = this.state;

		return (
			<React.Fragment>
				<View
					style={styles.content}
				>
					<View
						style={styles.container}
					>
						<TextInput
							numberOfLines={1}
							style={styles.input}
							onChangeText={(txt) => this.onChange(txt)}
							placeholderTextColor={'#000'}
							placeholder={placeholder.label}
							value={valueP}
						/>
						{/* <LocationIconRed /> */}
					</View>

				</View>
				{
					places.length != 0 &&
					<ScrollView
						style={[styles.list, { alignSelf: 'center', top: resize(top, 'h') }]}
					>
						{
							places.map((res, i) =>
								<ScrollView
									horizontal
									showsHorizontalScrollIndicator={false}
								>
									<TouchableOpacity
										key={i}
										style={styles.touch}
										onPress={() => this.onPressLocation(res, i)}
									>

										<Text
											style={styles.label}
										>
											{res.description}
										</Text>
									</TouchableOpacity>
								</ScrollView>

							)
						}
					</ScrollView>
				}
			</React.Fragment>
		)
	}
}

LocationInput.defaultProps = {
	text: '',
	top: 0
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.user
	}
};

export default connect(mapStateToProps)(LocationInput);