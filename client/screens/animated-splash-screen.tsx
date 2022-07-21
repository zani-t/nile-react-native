import React, { useCallback, useEffect, useState } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import Animated, { useDerivedValue, withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from './../components/root-stack-param-list'

type SplashScreenProp = {
    navigation: StackNavigationProp<RootStackParamList, 'Splash'>
}

const AnimatedSplashScreen: React.FC<SplashScreenProp> = ({ navigation }) => {
    
    const SPLASH_IMG = require("./../assets/hb-logo.png");

    // states
    const [loading_finished, set_loading_finished] = useState(false);
    const [animation_triggered, set_animation_triggered] = useState(false);

    // animation values
    const animation_value = useDerivedValue(() => {
        return animation_triggered === true ? withTiming(0) : withTiming(1);
    }, [animation_triggered]);
    const container_animation = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                animation_value.value,
                [0, 1],
                ['#004b3e', '#1756f8']
            ),
            flex: 1,
        };
    });
    const image_animation = useAnimatedStyle(() => {
        return {
            opacity: animation_value.value,
            width: "100%",
            height: "100%",
            resizeMode: "contain",
        };
    });

    // functions
    // show hide async -> trigger animation -> navigate
    const on_image_loaded = useCallback(async () => {
        if (loading_finished) {
            try {
                await SplashScreen.hideAsync();
            } catch (error) {
                console.log("useCallback on_image_loaded " + error);
            } finally {
                await new Promise(resolve => setTimeout(resolve, 1000));
                set_animation_triggered(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                console.log('Beginning navigation to Auth');
                navigation.navigate('Auth', { SHARED_ELEMENT_ID: 0 });
            }
        }
    }, [loading_finished]);

    // load fonts -> load splash image
    useEffect(() => {
        async function load_fonts() {
            try {
                await SplashScreen.preventAutoHideAsync();
                // await Asset.fromURI("./../assets/hb-logo.png").downloadAsync();
                await Font.loadAsync({
                    Poppins: require('./../assets/fonts/Poppins-Regular.ttf'),
                    'Poppins-Bold': {
                        uri: require('./../assets/fonts/Poppins-Bold.ttf'),
                        display: Font.FontDisplay.FALLBACK,
                    },
                    'Poppins-SemiBoldItalic': {
                        uri: require('./../assets/fonts/Poppins-SemiBoldItalic.ttf'),
                        display: Font.FontDisplay.FALLBACK,
                    },
                    'Poppins-Light': {
                        uri: require('./../assets/fonts/Poppins-Light.ttf'),
                        display: Font.FontDisplay.FALLBACK,
                    }
                });
            } catch (error) {
                console.log("useEffect load_fonts " + error);
            } finally {
                set_loading_finished(true);
            }
        }
        load_fonts();
    }, []);

    // hide screen until loading_finished
    if (!loading_finished) { return null; }

    return (
        <Animated.View style={container_animation}>
            <Animated.Image
                style={image_animation}
                source={SPLASH_IMG}
                onLoadEnd={on_image_loaded}/>
            <StatusBar style="light"/>
        </Animated.View>
    );
};

export default AnimatedSplashScreen;