import { createAppContainer, createStackNavigator } from 'react-navigation';

// screens
import Home from '../../screens/app/home';
import FirstTime from '../../screens/app/fist_time';
import BrbrProfile from '../../screens/app/brbr_profile';
import BrbrReserve from '../../screens/app/brbr_reserve';

const appStackNavigator = createStackNavigator(
  {
    Home,
    FirstTime,
    BrbrProfile,
    BrbrReserve
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null
    }
  }
);

const appNavigator = createAppContainer(appStackNavigator);

export default appNavigator;