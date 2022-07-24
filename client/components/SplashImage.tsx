import React, { useState, useEffect } from 'react'

import * as Font from 'expo-font';
import Animated, { onChange } from 'react-native-reanimated'

import { ComponentState } from '../App';
import { splash_styles, image_splash_animated_styles } from '../styles/splash-stylesheet'

interface SplashComponentProps {
    componentStateControl: React.Dispatch<React.SetStateAction<ComponentState>>;
}

const SplashImage: React.FC<SplashComponentProps> = (props: SplashComponentProps) => {

    const SPLASH_IMG = require("./../assets/hb-logo.png");
    
    const [splashAnimationTriggered, setSplashAnimationTriggered] = useState(false);

    useEffect(() => {
        async function load_fonts() {
            try {
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
                await new Promise(resolve => setTimeout(resolve, 1000));
                setSplashAnimationTriggered(true);
                await new Promise(resolve => setTimeout(resolve, 250));
                props.componentStateControl('CLOSED');
            }
        }
        load_fonts();
    }, []);

    return (
        <Animated.Image
            source={SPLASH_IMG}
            style={[splash_styles.image_splash,
                image_splash_animated_styles({ splashAnimationTriggered: splashAnimationTriggered })]} />
    )
}

export default SplashImage;