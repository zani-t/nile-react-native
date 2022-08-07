import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import { queriedHeadlineAnimatedStyles, queriedHeadlineStyles } from '../../styles/lower-panel/QueriedHeadlineStylesheet';
import AxiosDynamic from '../../utils/AxiosDynamic';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

const QueriedHeadline: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const axiosDynamic = AxiosDynamic();

    const closingSequence = async () => {
        try {
            // Post to database
            await axiosDynamic.post('articles/', {
                ...props.states.queriedArticle,
                category: 'Unsorted'
            });

            // Fade out content, transition queried content & panel height
            props.states.setDisplayState(LSU.QueryDisplayState);
            await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
            props.states.setDisplayState(LSU.HomeDisplayState);
            props.states.setTargetState('HOME');
            await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
            props.states.setInitialState('HOME');
        } catch (error) {
            console.log(`QueriedHeadline.tsx closingSequence error ${error}`);
        }
    };

    return (
        <Animated.View style={[
            queriedHeadlineStyles.viewQueryContainer,
            queriedHeadlineAnimatedStyles(props)]}>

            <TouchableOpacity onPress={() => closingSequence()}>
                <View style={queriedHeadlineStyles.viewImageContainer}>
                    <Image
                        style={queriedHeadlineStyles.imageQuery}
                        source={{ uri: props.states.queriedArticle?.img }} />
                </View>
                <Text style={queriedHeadlineStyles.textConfirm}>Confirm Article</Text>
                <Text style={queriedHeadlineStyles.textQueryHeadline}>{props.states.queriedArticle?.title}</Text>
            </TouchableOpacity>

        </Animated.View>
    );

};

export default QueriedHeadline;