import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import jwtDecode from 'jwt-decode';

import { AppState, KeyboardState, AppDisplay } from '../../App';
import { AuthContext } from '../../context/AuthContext';
import { AxiosStatic } from '../../context/AxiosContext';
import { auth_styles, auth_animated_styles } from '../../styles/auth-stylesheet'

interface AuthElementComponentProps {
    states: any,
};

const AuthElements: React.FC<AuthElementComponentProps> = (props: AuthElementComponentProps) => {

    const authContext = useContext(AuthContext);
    const [email, set_email] = useState('');
    const [password, set_password] = useState('');

    const setAppDisplay = async (header_setting: boolean, auth_setting: boolean) => {
        props.states.appDisplayController({
            ...props.states.appDisplayControl,
            HeaderLarge: header_setting,
            AuthElements: auth_setting,
        });
    };

    useEffect(() => {
        async function openingSequence() {
            await new Promise(resolve => setTimeout(resolve, 500));
            setAppDisplay(true, true);
        }
        openingSequence();

        const keyboardListener = Keyboard.addListener("keyboardDidHide", async () => {
            setAppDisplay(true, true);
            Keyboard.dismiss();
            props.states.keyboardStateController('TRANSITION');
            await new Promise(resolve => setTimeout(resolve, 750));
            props.states.keyboardStateController('OFF');
        });
        return () => { keyboardListener.remove(); };
    }, []);

    const signInSequence = async () => {
        try {
            const response = await AxiosStatic.post('token/', {
                username: 'zani',
                password: 'adminpassword',
            });
            authContext?.setAuthState({
                user: jwtDecode(response.data.access),
                authTokens: response.data,
            });

            if (props.states.keyboardStateControl === 'AUTH') {
                Keyboard.dismiss();
            }

            props.states.keyboardStateController('OFF');
            setAppDisplay(false, false);
            await new Promise(resolve => setTimeout(resolve, 500));
            props.states.appStateController('HOME');
        } catch (error: any) {
            console.log('Login Failed', error);
        }
    };

    const registerSequence = async () => { };

    const setKeyboardState = async (keyboardState: KeyboardState) => {
        props.states.appDisplayController(keyboardState === 'AUTH' ? {
            ...props.states.appDisplayControl,
            HeaderLarge: false,
            AuthElements: true,
        } : {
            ...props.states.appDisplayControl,
            HeaderLarge: true,
            AuthElements: true,
        });
        props.states.keyboardStateController(keyboardState);
    };

    return (
        <Animated.View
            style={[auth_styles.view_auth_content,
            auth_animated_styles({ componentDisplayed: props.states.appDisplayControl.AuthElements })]}>
            <TextInput
                style={auth_styles.text_input_auth}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor='#c7d8d4'
                placeholder=" Email . . ."
                onFocus={() => setKeyboardState('AUTH')}
                onChangeText={current_text => set_email(current_text)}
                value={email} />
            <TextInput
                style={auth_styles.text_input_auth}
                autoCapitalize="none"
                placeholderTextColor='#c7d8d4'
                placeholder=" Password . . ."
                onFocus={() => setKeyboardState('AUTH')}
                onChangeText={current_text => set_password(current_text)}
                value={password}
                secureTextEntry={true} />
            <View style={auth_styles.view_button_container}>
                <TouchableOpacity onPress={signInSequence}>
                    <Text style={auth_styles.text_button}>SIGN IN </Text>
                </TouchableOpacity>
                <Text style={auth_styles.text_button}> / </Text>
                <TouchableOpacity onPress={registerSequence}>
                    <Text style={auth_styles.text_button}> REGISTER</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );

};

export default AuthElements;