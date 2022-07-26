import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import Animated from "react-native-reanimated";

import { AppState, AppDisplay } from '../App';
import { auth_styles, auth_animated_styles } from '../styles/auth-stylesheet'

interface AuthElementComponentProps {
    appStateController: React.Dispatch<React.SetStateAction<AppState>>;
    appDisplayControl: AppDisplay;
    appDisplayController: React.Dispatch<React.SetStateAction<AppDisplay>>;
};

const AuthElements: React.FC<AuthElementComponentProps> = (props: AuthElementComponentProps) => {
    const [keyboard_focused, set_keyboard_focused] = useState(false);
    const [email, set_email] = useState('');
    const [password, set_password] = useState('');

    useEffect(() => {
        async function openingSequence() {
            await new Promise(resolve => setTimeout(resolve, 500));
            props.appDisplayController({
                ...props.appDisplayControl,
                HeaderLarge: true,
                AuthElements: true,});
        }
        openingSequence();
    }, []);

    const closingSequence = async () => {
        props.appDisplayController({
            ...props.appDisplayControl,
            HeaderLarge: false,
            AuthElements: false,});
        await new Promise(resolve => setTimeout(resolve, 500));
        props.appStateController('HOME');
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
                // onfocus
                onChangeText={current_text => set_email(current_text)}
                value={email} />
            <TextInput
                style={auth_styles.text_input_auth}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor='#c7d8d4'
                placeholder=" Password . . ."
                // onfocus
                secureTextEntry={true}
                onChangeText={current_text => set_password(current_text)}
                value={password} />
            <View style={auth_styles.view_button_container}>
                <TouchableOpacity onPress={closingSequence}>
                    <Text style={auth_styles.text_button}>SIGN IN </Text>
                </TouchableOpacity>
                <Text style={auth_styles.text_button}> / </Text>
                <TouchableOpacity onPress={closingSequence}>
                    <Text style={auth_styles.text_button}> REGISTER</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default AuthElements;