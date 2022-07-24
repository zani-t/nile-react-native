import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import Animated from "react-native-reanimated";

import { AppState } from '../App';
import { auth_styles, auth_animated_styles } from '../styles/auth-stylesheet'

interface AuthElementComponentProps {
    appStateControl: React.Dispatch<React.SetStateAction<AppState>>;
};

const AuthElements: React.FC<AuthElementComponentProps> = (props: AuthElementComponentProps) => {
    const [componentDisplayed, setComponentDisplayed] = useState(false);
    const [keyboard_focused, set_keyboard_focused] = useState(false);
    const [email, set_email] = useState('');
    const [password, set_password] = useState('');

    // opening sequence
    useState(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        setComponentDisplayed(true);
    });

    const closingSequence = async () => {
        setComponentDisplayed(false);
        await new Promise(resolve => setTimeout(resolve, 500));
        props.appStateControl('HOME');
    };

    return (
        <Animated.View
            style={[auth_styles.view_auth_content,
            auth_animated_styles({ componentDisplayed: componentDisplayed })]}>
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