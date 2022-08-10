import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';

import * as SecureStore from 'expo-secure-store';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';
import AxiosDynamic from '../../utils/AxiosDynamic';
import { AuthContext } from '../../context/AuthContext';
import { panelButtonsAnimatedStyles, panelButtonsStyles } from '../../styles/lower-panel/PanelButtonsStylesheet';

const PanelButtons: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const axiosDynamic = AxiosDynamic();
    const authContext = useContext(AuthContext);

    const refreshSequence = async () => {
        try {
            props.states.setDisplayState({
                ...LSU.HomeDisplayState,
                ExtraHeadlines: false,
            });
            await new Promise(resolve => setTimeout(resolve, SCU.DURATION));

            // Get all of user's articles
            const response = await axiosDynamic.get('articles/');
            props.states.setArticles(response.data);
            props.states.setDisplayState(LSU.HomeDisplayState);
        } catch (error) {
            console.log(`StoredHeadline.tsx openingSequence ${error}`);
        };
    };

    const logoutSequence = async () => {
        // Hide elements
        props.states.setDisplayState(LSU.HiddenDisplayState);
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));

        // Transition to auth
        props.states.setTargetState('AUTH');
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState('AUTH');

        authContext?.setAuthState({
            user: null,
            authTokens: null,
        });
        await SecureStore.deleteItemAsync('tokens');
    };

    const openSortSequence = async () => {
        props.states.setDisplayState({
            ...LSU.HomeDisplayState,
            StoredHeadline: false,
        });
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));

        // Transition to sort
        props.states.setTargetState('SORT');
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState('SORT');
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
            <TouchableOpacity onPress={logoutSequence}>
                <FontAwesome5
                    name="bars"
                    size={25}
                    color={SCU.COLORS.GOLD}
                    style={[panelButtonsStyles.icon, panelButtonsStyles.iconSettings]} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo onPress={openSortSequence}
                    name="folder"
                    size={25}
                    color={SCU.COLORS.GOLD}
                    style={panelButtonsStyles.icon} />
            </TouchableOpacity>

        </Animated.View>
    );

};

export default PanelButtons;