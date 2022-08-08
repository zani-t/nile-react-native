import React, { useEffect, useState } from 'react';
import { Keyboard, TextInput, TouchableOpacity } from 'react-native';

import Animated from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';
import AxiosDynamic from '../../utils/AxiosDynamic';
import { linkInputAnimatedStyles, linkInputStyles } from '../../styles/lower-panel/LinkInputStylesheet';

const LinkInput: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    // Keyboard listener needs to be able to switch to multiple panel states!
    // [Keep app state variable in component file & pass as value into dismiss sequence]

    const axiosDynamic = AxiosDynamic();
    const [link, setLink] = useState('');

    // On opening keyboard: Hide stored headline, set target state to HomeInput
    const openKeyboardSequence = async () => {
        props.states.setDisplayState(LSU.HomeInputDisplayState);
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setTargetState('HOME_INPUT');
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState('HOME_INPUT');
    };

    // On closing keyboard: Set target to home, hide keyboard,
    // ...set initial (allow stored headline to display), display stored headline
    const closeKeyboardSequence = async () => {
        props.states.setTargetState('HOME');
        Keyboard.dismiss();
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState('HOME');
        props.states.setDisplayState(LSU.HomeDisplayState);
    };

    // When button pressed & input is on link query mode
    const querySequence = async () => {
        try {
            // Get queried article from online
            const response = await axiosDynamic.post('query/', { url: link, });
            props.states.setQueriedArticle(response.data);
            Keyboard.dismiss();

            // Transition queried article and lower panel height, fade in content
            props.states.setDisplayState(LSU.QueryDisplayState);
            props.states.setTargetState('QUERY');
            await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
            props.states.setInitialState('QUERY');
            props.states.setDisplayState({
                ...LSU.QueryDisplayState,
                QueriedHeadline: true,
            });
        } catch (error) {
            console.log(`LinkInput.tsx querySequence ${error}`);
            props.states.setDisplayState({
                ...LSU.HomeDisplayState,
                LinkInputMode: 'ERROR',
            });
        };
    };

    // Initialize keyboard listener on load
    useEffect(() => {
        const keyboardListener = Keyboard.addListener("keyboardDidHide", async () => {
            closeKeyboardSequence();
        });
        return () => { keyboardListener.remove(); };
    }, []);

    // Empty input text after article is confirmed (transitioning from query to home)
    useEffect(() => {
        if (props.states.initialState === 'QUERY' && props.states.targetState === 'HOME') {
            setLink('');
        };
    }, [(props.states)]);

    return (
        <Animated.View style={[
            linkInputStyles.viewLinkContainer,
            linkInputAnimatedStyles(props.states.displayState)]}>

            <TextInput
                style={linkInputStyles.textInputLink}
                autoCapitalize="none"
                placeholder=" Enter link..."
                placeholderTextColor={SCU.COLORS.DARK_GRAY}
                onFocus={() => openKeyboardSequence()}
                onChangeText={text => setLink(text)}
                value={link} />
            <TouchableOpacity
                style={linkInputStyles.iconEnterLink}
                onPress={() => querySequence()}>
                <MaterialCommunityIcons
                    name="pencil-plus"
                    size={20}
                    color={SCU.COLORS.GREEN} />
            </TouchableOpacity>

        </Animated.View>
    );

};

export default LinkInput;