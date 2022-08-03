import React, { useEffect, useState } from 'react';
import { Keyboard, TextInput, TouchableOpacity } from 'react-native';

import Animated from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';
import AxiosDynamic from '../../utils/AxiosDynamic';
import axiosStatic from '../../utils/AxiosStatic';
import { linkInputAnimatedStyles, linkInputStyles } from '../../styles/lower-panel/LinkInputStylesheet';

const LinkInput: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    // Keyboard listener needs to be able to switch to multiple panel states!

    const axiosDynamic = AxiosDynamic();
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);

    const querySequence = async () => {
        // Get queried article
        const response = await axiosDynamic.post('query/', { url: link, });
        props.states.setQueriedArticle(response.data);
        Keyboard.dismiss();

        props.states.setTargetState('QUERY'); // begin transition
        props.states.setDisplayState(LSU.QueryDisplayState);
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState('QUERY');
    };

    // On opening keyboard: Hide stored headline, set target state to HomeInput
    const openKeyboardSequence = async () => {
        props.states.setDisplayState(LSU.HomeInputDisplayState);
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

    // Initialize keyboard listener
    useEffect(() => {
        const keyboardListener = Keyboard.addListener("keyboardDidHide", async () => {
            closeKeyboardSequence();
        });
        return () => { keyboardListener.remove(); };
    }, []);

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