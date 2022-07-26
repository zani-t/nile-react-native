import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

import { AppState, AppDisplay } from '../../App';
import { home_styles, home_animated_styles } from '../../styles/home-stylesheet';

interface LinkInputComponentProps {
    appStateController: React.Dispatch<React.SetStateAction<AppState>>;
    appDisplayControl: AppDisplay;
    appDisplayController: React.Dispatch<React.SetStateAction<AppDisplay>>;
};

const LinkInput: React.FC<LinkInputComponentProps> = (props: LinkInputComponentProps) => {

    const [link, setLink] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        async function openingSequence() {
            await new Promise(resolve => setTimeout(resolve, 500));
            props.appDisplayController({
                ...props.appDisplayControl,
                HeaderSmall: true,
                PanelButtons: true,
                LinkInput: true,});
        }
        openingSequence();
    }, []);

    /*const closingSequence = async () => {
        setComponentDisplayed(false);
        await new Promise(resolve => setTimeout(resolve, 500));
        // props.appStateControl('CONFIRM');
    };*/

    return (
        <Animated.View
            style={[home_styles.view_link_container,
            home_animated_styles({ componentDisplayed: props.appDisplayControl.LinkInput })]}>
            <TextInput
                style={home_styles.text_input_link}
                autoCapitalize="none"
                placeholder=" Enter link..."
                placeholderTextColor="#b7b7b7"
                onChangeText={text => setLink(text)}
                value={link} />
            <TouchableOpacity
                style={home_styles.icon_enter_link}
                onPress={undefined}>
                <MaterialCommunityIcons
                    name="pencil-plus"
                    size={20}
                    color="#38761d" />
            </TouchableOpacity>
        </Animated.View>
    );
};

export default LinkInput;