import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import jwtDecode from 'jwt-decode';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';
import axiosStatic from '../../utils/AxiosStatic';
import { AuthContext } from '../../context/AuthContext';
import { authElementsAnimatedStyles, authElementsStyles } from '../../styles/lower-panel/AuthElementsStylesheet';

const AuthElements: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInSequence = async () => {
        try {
            // Get authentication tokens
            const response = await axiosStatic.post('token/', {
                username: 'zani',
                password: 'adminpassword',
            });
            authContext?.setAuthState({
                user: jwtDecode(response.data.access),
                authTokens: response.data,
            });
        } catch (error) {
            console.log(`AuthElements signInSequence error ${error}`);
        } finally {
            // Hide elements
            props.states.setDisplayState(LSU.HiddenDisplayState);
            await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
            // Transition to home
            props.states.setTargetState('HOME');
            await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
            props.states.setInitialState('HOME');
        };
    };

    // On opening keyboard: Hide header, set target state to AuthInput
    const openKeyboardSequence = async () => {
        props.states.setDisplayState(LSU.AuthInputDisplayState);
        props.states.setTargetState('AUTH_INPUT');
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState('AUTH_INPUT');
    };

    // On closing keyboard: Set target to auth, hide keyboard,
    // ...set initial (allow header to display), display header
    const closeKeyboardSequence = async () => {
        props.states.setTargetState('AUTH');
        Keyboard.dismiss();
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState('AUTH');
        props.states.setDisplayState(LSU.AuthDisplayState);
    };

    useEffect(() => {
        async function openingSequence() {
            props.states.setDisplayState(LSU.AuthDisplayState);
        };
        openingSequence();
        const keyboardListener = Keyboard.addListener("keyboardDidHide", async () => {
            closeKeyboardSequence();
        });
        return () => { keyboardListener.remove(); };
    }, []);

    return (
        <Animated.View style={[
            authElementsStyles.viewAuthContent,
            authElementsAnimatedStyles(props.states.displayState)]}>

            <TextInput
                style={authElementsStyles.textInputAuth}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholderTextColor={SCU.COLORS.LIGHT_GREEN}
                placeholder=' Email . . .'
                onFocus={() => openKeyboardSequence()}
                onChangeText={current_text => setEmail(current_text)}
                value={email} />
            <TextInput
                style={authElementsStyles.textInputAuth}
                autoCapitalize="none"
                placeholderTextColor='#c7d8d4'
                placeholder=" Password . . ."
                onFocus={() => openKeyboardSequence()}
                onChangeText={current_text => setPassword(current_text)}
                value={password}
                secureTextEntry />

            <View style={authElementsStyles.viewButtonContainer}>
                <TouchableOpacity onPress={signInSequence}>
                    <Text style={authElementsStyles.textButton}>SIGN IN </Text>
                </TouchableOpacity>
                <Text style={authElementsStyles.textButton}> / </Text>
                <TouchableOpacity>
                    <Text style={authElementsStyles.textButton}> REGISTER</Text>
                </TouchableOpacity>
            </View>

        </Animated.View>
    );

};

export default AuthElements;