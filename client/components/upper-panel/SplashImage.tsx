import React, { useCallback, useContext, useEffect, useState } from 'react';

import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import Animated from 'react-native-reanimated';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';
import { AuthContext } from './../../context/AuthContext';
import { imageSplashAnimatedStyles, splashStyles } from '../../styles/upper-panel/SplashImageStylesheet';
import axiosStatic from '../../utils/AxiosStatic';

const SplashImage: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const SPLASH_IMG = require('./../../assets/hb-logo.png');
    const authContext = useContext(AuthContext);
    const [targetState, setTargetState] = useState<LSU.PanelState>('AUTH');
    const [loading, setLoading] = useState(true);

    async function loadFonts() {
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
    };

    async function loadTokens() {
        const tokens = await SecureStore.getItemAsync('tokens');
        if (tokens) {
            // Check if expired -> send refresh
            const user: any = jwt_decode(JSON.parse(tokens).access);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            if (isExpired) {
                // Send refresh request
                const response = await axiosStatic.post('token/refresh/', {
                    refresh: JSON.parse(tokens).refresh,
                });
                // Set new tokens in storage
                await SecureStore.setItemAsync('tokens', JSON.stringify(response.data));
                // Set context to refreshed details
                authContext?.setAuthState({
                    user: jwt_decode(response.data.access),
                    authTokens: response.data,
                });
            } else {
                authContext?.setAuthState({
                    user: user,
                    authTokens: JSON.parse(tokens),
                });
            };
            console.log(authContext?.authState.authTokens);
            setTargetState('HOME');
        };
        setLoading(false);
    };

    const closingSequence = useCallback(async (target: LSU.PanelState) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Hide splash image
        props.states.setDisplayState(LSU.HiddenDisplayState);
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        // Transition to next page
        props.states.setTargetState(target);
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState(target);
    }, [targetState]);

    useEffect(() => {
        async function openingSequence() {
            await loadFonts();
            await loadTokens();
        };
        openingSequence();
    }, []);

    useEffect(() => {
        if (!loading) {
            closingSequence(targetState);
        };
    }, [loading]);

    return (
        <Animated.Image
            source={SPLASH_IMG}
            style={[
                splashStyles.imageSplash,
                imageSplashAnimatedStyles(props.states.displayState),]} />
    );

};

export default SplashImage;