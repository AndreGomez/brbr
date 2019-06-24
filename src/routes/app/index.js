import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';

// screens
import Home from '../../screens/app/home';
import FirstTime from '../../screens/app/fist_time';
import BrbrProfile from '../../screens/app/brbr_profile';
import BrbrReserve from '../../screens/app/brbr_reserve';
import ServiceReview from '../../screens/app/services_review';
import EditProfile from '../../screens/app/edit_profile';
import ExtraInfo from '../../screens/app/extra_info';
import About from '../../screens/app/about';

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
    About
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