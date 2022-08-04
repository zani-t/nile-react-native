import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import { queriedHeadlineAnimatedStyles, queriedHeadlineStyles } from '../../styles/lower-panel/QueriedHeadlineStylesheet';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

const QueriedHeadline: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const closingSequence = async () => {

        
        // Fade out content, transition queried content & panel height
        props.states.setDisplayState(LSU.QueryDisplayState);
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setDisplayState(LSU.HomeDisplayState);
        props.states.setTargetState('HOME');
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState('HOME');
    };

    // On tap -> update state variable to: show link border, remove text, show text "Category: ", change padding
    /* const setCategorySequence = async () => {
        props.states.setDisplayState({
            ...LSU.QueryDisplayState,
            QueriedHeadline: true,
            LinkInputMode: 'SET_CATEGORY',
        });
    }; */

    return (
        <Animated.View style={[
            queriedHeadlineStyles.viewQueryContainer,
            queriedHeadlineAnimatedStyles(props)]}>

            <TouchableOpacity onPress={() => closingSequence()}>
                <View style={queriedHeadlineStyles.viewImageContainer}>
                    <Image
                        style={queriedHeadlineStyles.imageQuery}
                        source={{ uri: props.states.queriedArticle?.image }} />
                </View>
                <Text style={queriedHeadlineStyles.textConfirm}>Confirm Article</Text>
                <Text style={queriedHeadlineStyles.textQueryHeadline}>{props.states.queriedArticle?.title}</Text>
            </TouchableOpacity>

        </Animated.View>
    );

};

export default QueriedHeadline;