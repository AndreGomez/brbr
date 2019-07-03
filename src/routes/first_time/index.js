import { createAppContainer, createStackNavigator } from 'react-navigation';

// screens
import FirstTime from '../../screens/app/fist_time';

const appStackNavigator = createStackNavigator(
  {
    FirstTime,
  },
  {
    initialRouteName: 'FirstTime',
    defaultNavigationOptions: {
      header: null
    }
  }
);

const FirstTimeNavigation = createAppContainer(appStackNavigator);

export default FirstTimeNavigation;