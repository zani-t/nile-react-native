import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import { authElementsAnimatedStyles, authElementsStyles } from '../../styles/lower-panel/AuthElementsStylesheet';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

const AuthElements: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

        async function openingSequence() {
            props.states.setDisplayState(LSU.AuthDisplayState);
        };
        openingSequence();

        // Keyboard listener

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
                /* onFocus={() => [Set target state, initial state to AUTH_INPUT]} */
                onChangeText={current_text => setEmail(current_text)}
                value={email} />
            <TextInput
                style={authElementsStyles.textInputAuth}
                autoCapitalize="none"
                placeholderTextColor='#c7d8d4'
                placeholder=" Password . . ."
                /* onFocus={() => [Set target state, initial state to AUTH_INPUT]} */
                onChangeText={current_text => setPassword(current_text)}
                value={password}
                secureTextEntry />

            <View style={authElementsStyles.viewButtonContainer}>
                <TouchableOpacity>
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