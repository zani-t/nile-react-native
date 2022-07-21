import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from './../components/root-stack-param-list'
import { styles } from './../styles/auth-stylesheet';

interface AuthScreenProp {
    navigation: StackNavigationProp<RootStackParamList, 'Auth'>
    route: RouteProp<RootStackParamList, 'Auth'>
}

const AuthScreen: React.FC<AuthScreenProp> = ({ navigation, route }) => {

    const { SHARED_ELEMENT_ID } = route.params;

    // states
    const [email, set_email] = useState('');
    const [password, set_password] = useState('');

    // state/type - when triggered hide header and change height of panel via animation
    const [keyboard_focused, set_keyboard_focused] = useState(false);

    // animation values

    // functions
    const trigger_keyboard_focused = () => {
        set_keyboard_focused(!keyboard_focused);
    }; // any way to correctly type check and remove this function?

    return (
        <Animated.View style={styles.view_container}>
            <View style={styles.view_above_panel}>
                <Animated.Text style={styles.text_header}
                    entering={FadeIn.delay(750)}
                    exiting={FadeOut}>YW</Animated.Text>
            </View>
            <Animated.View style={styles.view_panel}
                entering={SlideInDown.duration(1000)}
                exiting={SlideOutDown.duration(1000).delay(750)}>
                <Animated.View style={styles.view_panel_content}
                    entering={FadeIn.delay(750)}
                    exiting={FadeOut}>
                    <TextInput style={styles.text_input_auth}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholderTextColor='#c7d8d4'
                        placeholder=" Email . . ."
                        onFocus={trigger_keyboard_focused}
                        onChangeText={current_text => set_email(current_text)}
                        value={email} />
                    <TextInput style={styles.text_input_auth}
                        autoCapitalize="none"
                        placeholderTextColor="#c7d8d4"
                        placeholder=" Password . . ."
                        onChangeText={current_text => set_password(current_text)}
                        value={password}
                        secureTextEntry />
                    <View style={styles.view_button_container}>
                        <TouchableOpacity onPress={() => {navigation.navigate('Home', { SHARED_ELEMENT_ID: 1 })}}>
                            <Text style={styles.text_button}>SIGN IN </Text>
                        </TouchableOpacity>
                        <Text style={styles.text_button}> / </Text>
                        <TouchableOpacity>
                            <Text style={styles.text_button}> REGISTER</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>
            <StatusBar style="light" />
        </Animated.View>
    );
};

export default AuthScreen;