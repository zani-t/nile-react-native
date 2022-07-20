// expo, react, external, internal
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import AnimatedSplashScreen from './screens/animated-splash-screen';

export default function App() {

  type SharedStackParams = {
    Splash: { id: string };
    Auth: { id: string };
    Home: { id: string };
    Sort: { id: string };
  };
  
  const { Navigator, Screen } = createSharedElementStackNavigator<SharedStackParams>();

  // container id 0
  // panel id 1

  return (
    
    <NavigationContainer>
      <Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
        <Screen name='Splash' component={AnimatedSplashScreen}/>
      </Navigator>
    </NavigationContainer>

  );
};