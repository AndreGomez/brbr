import { createAppContainer, createStackNavigator } from 'react-navigation';

// screens
import Home from '../../screens/app/home';

const appStackNavigator = createStackNavigator(
  {
    Home
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