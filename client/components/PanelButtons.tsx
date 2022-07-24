import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Animated from "react-native-reanimated";

import { AppState } from '../App';
import Colors from "../styles/colors";
import { home_styles, home_animated_styles } from '../styles/home-stylesheet'

interface PanelButtonComponentProps {
    appStateControl: React.Dispatch<React.SetStateAction<AppState>>;
};

const PanelButtons: React.FC<PanelButtonComponentProps> = (props: PanelButtonComponentProps) => {
    const [componentDisplayed, setComponentDisplayed] = useState(false);

    // opening sequence
    useState(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        setComponentDisplayed(true)
    });

    const closingSequence = async () => {
        setComponentDisplayed(false);
        await new Promise(resolve => setTimeout(resolve, 500));
        props.appStateControl('AUTH');
    };

    return (
        <Animated.View
            style={[home_styles.view_button_container,
            home_animated_styles({ componentDisplayed: componentDisplayed })]}>
            <TouchableOpacity>
                <FontAwesome
                    name="refresh"
                    size={24}
                    color={Colors.gold}
                    style={home_styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={closingSequence}>
                <FontAwesome5
                    name="bars"
                    size={25}
                    color={Colors.gold}
                    style={[home_styles.icon, home_styles.icon_settings]} />
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialCommunityIcons
                    name="bookmark-multiple-outline"
                    size={24}
                    color={Colors.gold}
                    style={home_styles.icon} />
            </TouchableOpacity>
        </Animated.View>
    );
};

export default PanelButtons;