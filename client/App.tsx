import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { RootStackParamList } from './components/root-stack-param-list';
import AnimatedSplashScreen from './screens/animated-splash-screen';
import AuthScreen from './screens/auth-screen';
import HomeScreen from './screens/home-screen';

// Prevent auto-hide splash screen
SplashScreen.preventAutoHideAsync().catch((error) => {
    console.log(error);
});

export default function App() {

    const { Navigator, Screen } = createSharedElementStackNavigator<RootStackParamList>();

    // Container id: 0, Panel id: 1
    return (
        <NavigationContainer>
            <Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
                <Screen name='Splash' component={AnimatedSplashScreen} />
                <Screen name='Auth' component={AuthScreen}/>
                <Screen name='Home' component={HomeScreen}/>
            </Navigator>
        </NavigationContainer>
    );

};