import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Animated from "react-native-reanimated";

import Colors from "../../styles/colors";
import { AppState, AppDisplay } from '../../App';
import { home_styles, home_animated_styles } from '../../styles/home-stylesheet';

interface PanelButtonComponentProps {
    appStateController: React.Dispatch<React.SetStateAction<AppState>>;
    appDisplayControl: AppDisplay;
    appDisplayController: React.Dispatch<React.SetStateAction<AppDisplay>>;
};

const PanelButtons: React.FC<PanelButtonComponentProps> = (props: PanelButtonComponentProps) => {

    /* useEffect(() => {
        async function openingSequence() {
            await new Promise(resolve => setTimeout(resolve, 500));
            props.appDisplayController({...props.appDisplayControl, PanelButtons: true});
        }
        openingSequence();
    }, []); */

    const closingSequence = async () => {
        props.appDisplayController({
            ...props.appDisplayControl,
            HeaderSmall: false,
            PanelButtons: false,
            LinkInput: false,});
        await new Promise(resolve => setTimeout(resolve, 500));
        props.appStateController('AUTH');
    };

    return (
        <Animated.View
            style={[home_styles.view_button_container,
            home_animated_styles({ componentDisplayed: props.appDisplayControl.PanelButtons })]}>
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

/*class A extends HeaderSmall {
    constructor(props?: any) {
        super(props);
    };
    func() {
        this.setComponentDisplayed(false);
    }
};*/