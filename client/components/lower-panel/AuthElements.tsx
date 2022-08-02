import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import axios from 'axios';

import { AppState, KeyboardState, AppDisplay } from '../../App';
import { AuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../context/AxiosContext';
import { auth_styles, auth_animated_styles } from '../../styles/auth-stylesheet'
import jwtDecode from 'jwt-decode';

interface AuthElementComponentProps {
    appStateController: React.Dispatch<React.SetStateAction<AppState>>;
    appDisplayControl: AppDisplay;
    appDisplayController: React.Dispatch<React.SetStateAction<AppDisplay>>;
    keyboardStateController: React.Dispatch<React.SetStateAction<KeyboardState>>;
};

const AuthElements: React.FC<AuthElementComponentProps> = (props: AuthElementComponentProps) => {

    const authContext = useContext(AuthContext);
    const [email, set_email] = useState('');
    const [password, set_password] = useState('');

    const setAppDisplay = async (header_setting: boolean, auth_setting: boolean) => {
        props.appDisplayController({
            ...props.appDisplayControl,
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
            props.keyboardStateController('TRANSITION');
            await new Promise(resolve => setTimeout(resolve, 750));
            props.keyboardStateController('OFF');
        });
        return () => { keyboardListener.remove(); };
    }, []);

    const signInSequence = async () => {
        try {
            /*const response = await axiosInstance.post('token/', {
                username: email,
                password: password
            });*/
            const response = await axiosInstance.post('token/', {
                username: 'zani',
                password: 'adminpassword'
            });
            console.log(jwtDecode(response.data.access));
            /*const data = ;
            authContext?.setAuthState({
                email: ,
                authTokens: ,
            });*/

            props.keyboardStateController('OFF');
            setAppDisplay(false, false);
            await new Promise(resolve => setTimeout(resolve, 500));
            props.appStateController('HOME');

        } catch (error: any) {
            console.log('Login Failed', error);
        }

        /*props.keyboardStateController('OFF');
        setAppDisplay(false, false);
        await new Promise(resolve => setTimeout(resolve, 500));
        props.appStateController('HOME');*/
    };

    const registerSequence = async () => { };

    const setKeyboardState = async (keyboardState: KeyboardState) => {
        props.appDisplayController(keyboardState === 'AUTH' ? {
            ...props.appDisplayControl,
            HeaderLarge: false,
            AuthElements: true,
        } : {
            ...props.appDisplayControl,
            HeaderLarge: true,
            AuthElements: true,
        });
        props.keyboardStateController(keyboardState);
    };

    return (
        <Animated.View
            style={[auth_styles.view_auth_content,
            auth_animated_styles({ componentDisplayed: props.appDisplayControl.AuthElements })]}>
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