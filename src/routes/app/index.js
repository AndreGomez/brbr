import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';

// screens
import Home from '../../screens/app/home';
import FirstTime from '../../screens/app/fist_time';
import BrbrProfile from '../../screens/app/brbr_profile';
import BrbrReserve from '../../screens/app/brbr_reserve';
import ServiceReview from '../../screens/app/services_review';
import EditProfile from '../../screens/app/edit_profile';
import AddCardForm from '../../screens/app/addCard';
import ExtraInfo from '../../screens/app/extra_info';
import About from '../../screens/app/about';
import MyProfile from '../../screens/app/my_profile';
import UploadDUI from '../../screens/auth/upload_dui';
import MyAddress from '../../screens/app/my_address';
import Galery from '../../screens/app/galery';
import DateDetail from '../../screens/app/date_detail';
import Chat from '../../screens/app/chat';
import PaymentMethodsList from '../../screens/app/payment_methods_list'
import MeCode from '../../screens/app/me_code';

//components 
import Sidebar from '../../components/sidebar';
import { width } from '../../utils/styles';

const drawer = createDrawerNavigator(
  {
    Home,
  },
  {
    initialRouteName: 'Home',
    contentComponent: Sidebar,
    drawerWidth: width
  },
)

const appStackNavigator = createStackNavigator(
  {
    drawer,
    FirstTime,
    BrbrProfile,
    BrbrReserve,
    ServiceReview,
    EditProfile,
    ExtraInfo,
    About,
    DateDetail,
    MyProfile,
    MyAddress,
    Galery,
    PaymentMethodsList,
    AddCardForm,
    Chat,
    MeCode,
    UploadDUI
  },
  {
    initialRouteName: 'drawer',
    defaultNavigationOptions: {
      header: null
    }
  }
);

const appNavigator = createAppContainer(appStackNavigator);

export default appNavigator;