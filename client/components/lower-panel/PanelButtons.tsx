import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';
import AxiosDynamic from '../../utils/AxiosDynamic';
import { panelButtonsAnimatedStyles, panelButtonsStyles } from '../../styles/lower-panel/PanelButtonsStylesheet';

const PanelButtons: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const axiosDynamic = AxiosDynamic();

    const refreshSequence = async () => {
        try {
            // Get all of user's articles
            props.states.setDisplayState({
                ...LSU.HomeDisplayState,
                ExtraHeadlines: false,
            });
            await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
            const response = await axiosDynamic.get('articles/');
            props.states.setArticles(response.data);
            props.states.setDisplayState(LSU.HomeDisplayState);
        } catch (error) {
            console.log(`StoredHeadline.tsx openingSequence ${error}`);
        };
    };

    const closingSequence = async () => {
        // Hide elements
        props.states.setDisplayState(LSU.HiddenDisplayState);
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));

        // Transition to auth
        props.states.setTargetState('AUTH');
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState('AUTH');
    };

    return (
        <Animated.View style={[
            panelButtonsStyles.viewButtonContainer,
            panelButtonsAnimatedStyles(props.states.displayState)]}>

            <TouchableOpacity onPress={refreshSequence}>
                <FontAwesome
                    name="refresh"
                    size={24}
                    color={SCU.COLORS.GOLD}
                    style={panelButtonsStyles.icon} />

            </TouchableOpacity>
            <TouchableOpacity onPress={closingSequence}>
                <FontAwesome5
                    name="bars"
                    size={25}
                    color={SCU.COLORS.GOLD}
                    style={[panelButtonsStyles.icon, panelButtonsStyles.iconSettings]} />
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialCommunityIcons
                    name="bookmark-multiple-outline"
                    size={24}
                    color={SCU.COLORS.GOLD}
                    style={panelButtonsStyles.icon} />
            </TouchableOpacity>

        </Animated.View>
    );

};

export default PanelButtons;