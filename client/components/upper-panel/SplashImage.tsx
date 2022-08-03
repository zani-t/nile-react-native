import React, { useEffect } from 'react';

import * as Font from 'expo-font';
import Animated from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

import { imageSplashAnimatedStyles, splashStyles } from '../../styles/upper-panel/SplashImageStylesheet';

const SplashImage: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const SPLASH_IMG = require("./../../assets/hb-logo.png");

    useEffect(() => {

        // Opening sequence: Load fonts, check for auth token -> Navigate to auth/home
        async function openingSequence() {
            try {
                // Load fonts
                await Font.loadAsync({
                    Poppins: require('./../../assets/fonts/Poppins-Regular.ttf'),
                    'Poppins-Bold': {
                        uri: require('./../../assets/fonts/Poppins-Bold.ttf'),
                        display: Font.FontDisplay.FALLBACK,
                    },
                    'Poppins-SemiBoldItalic': {
                        uri: require('./../../assets/fonts/Poppins-SemiBoldItalic.ttf'),
                        display: Font.FontDisplay.FALLBACK,
                    },
                    'Poppins-Light': {
                        uri: require('./../../assets/fonts/Poppins-Light.ttf'),
                        display: Font.FontDisplay.FALLBACK,
                    }
                });

                // Check for auth token

            } catch (error) {
                console.log(`SplashImage openingSequence error ${error}`);
            } finally {
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Hide splash image
                props.states.setDisplayState(LSU.HiddenDisplayState);
                
                await new Promise(resolve => setTimeout(resolve, SCU.DURATION));

                // Begin transition to auth
                props.states.setTargetState('AUTH');
                await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
                
                props.states.setInitialState('AUTH');
            };
        };

        openingSequence();

    }, []);

    return (
        <Animated.Image
            source={SPLASH_IMG}
            style={[
                splashStyles.imageSplash,
                imageSplashAnimatedStyles(props.states.displayState),]}/>
    );

};

export default SplashImage;