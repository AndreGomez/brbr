import { createAppContainer, createStackNavigator } from 'react-navigation';

// screens
import Login from '../../screens/auth/login';
import CreateAccountStep1 from '../../screens/auth/create_account_step_1';
import CreateAccountFormTel from '../../screens/auth/create_account_form_tel';
import PaymentMethodAuth from '../../screens/auth/payment_method';
import AddCardForm from '../../screens/app/addCard';
import LoginForm from '../../screens/auth/login_form';
import forgotPassword from '../../screens/auth/forgot_password';
import UploadDUI from '../../screens/auth/upload_dui';
import FirstTime from '../../screens/app/fist_time';
import About from '../../screens/app/about';
import ExtraInfo from '../../screens/app/extra_info';
import SetProfileImage from '../../screens/auth/create_account_profile_image';

const authStackNavigator = createStackNavigator(
	{
		Login,
		CreateAccountStep1,
		CreateAccountFormTel,
		PaymentMethodAuth,
		AddCardForm,
		LoginForm,
		forgotPassword,
		UploadDUI,
		About,
		ExtraInfo,
		SetProfileImage
	},
	{
		initialRouteName: 'Login',
		defaultNavigationOptions: {
			header: null
		}
	}
);

const authNavigator = createAppContainer(authStackNavigator);

export default authNavigator;
