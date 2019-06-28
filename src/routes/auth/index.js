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

const authStackNavigator = createStackNavigator(
  {
    Login,
    CreateAccountStep1,
    CreateAccountFormTel,
    PaymentMethodAuth,
    AddCardForm,
    LoginForm,
    forgotPassword,
    UploadDUI
  },
  {
    initialRouteName: 'PaymentMethodAuth',
    defaultNavigationOptions: {
      header: null
    }
  }
);

const authNavigator = createAppContainer(authStackNavigator);

export default authNavigator;
