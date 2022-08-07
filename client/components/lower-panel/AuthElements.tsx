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

    const signInSequence = async (req_email: string, req_password: string) => {
        try {
            if (email === '' && password === '') {
                req_email = 'testuser';
                req_password = 'testpassword';
            };
            
            // Get authentication tokens
            // console.log({req_email, req_password})
            const response = await axiosStatic.post('token/', {
                username: req_email,
                password: req_password,
            });
            authContext?.setAuthState({
                user: jwtDecode(response.data.access),
                authTokens: response.data,
            });

            // Hide elements, close 
            props.states.setDisplayState(LSU.HiddenDisplayState);
            await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
            closeKeyboardSequence('HOME');
        } catch (error) {
            console.log(`AuthElements.tsx signinSequence ${error}`);
            // Set field to red [& display type of error]
        };
    };

    const registerSequence = async () => {
        try {
            // Create user
            await axiosStatic.post('register/', {
                username: email,
                password: password,
            });
            Keyboard.dismiss();
            signInSequence(email, password);
        } catch (error) {
            console.log(`AuthElements.tsx registerSequence ${error}`);
            // Set field to red [& display type of error]
        }
    }

    // On opening keyboard: Hide header, set target state to AuthInput
    const openKeyboardSequence = async () => {
        props.states.setDisplayState(LSU.AuthInputDisplayState);
        props.states.setTargetState('AUTH_INPUT');
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState('AUTH_INPUT');
    };

    // On closing keyboard: Set target to auth, hide keyboard,
    // ...set initial (allow header to display), display header
    const closeKeyboardSequence = async (targetState: LSU.PanelState) => {
        // Hide & transition
        Keyboard.dismiss();
        props.states.setTargetState(targetState);
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));

        props.states.setInitialState(targetState);
        props.states.setDisplayState(LSU.AuthDisplayState);
    };

    useEffect(() => {
        async function openingSequence() {
            props.states.setDisplayState(LSU.AuthDisplayState);
        };
        openingSequence();
        const keyboardListener = Keyboard.addListener("keyboardDidHide", async () => {
            closeKeyboardSequence(props.states.targetState);
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
                <TouchableOpacity onPress={() => signInSequence(email, password)}>
                    <Text style={authElementsStyles.textButton}>SIGN IN </Text>
                </TouchableOpacity>
                <Text style={authElementsStyles.textButton}> / </Text>
                <TouchableOpacity onPress={registerSequence}>
                    <Text style={authElementsStyles.textButton}> REGISTER</Text>
                </TouchableOpacity>
            </View>

        </Animated.View>
    );

};

export default AuthElements;