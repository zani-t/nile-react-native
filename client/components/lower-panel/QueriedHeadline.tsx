import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import { queriedHeadlineAnimatedStyles, queriedHeadlineStyles } from '../../styles/lower-panel/QueriedHeadlineStylesheet';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

const QueriedHeadline: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const f = async () => {
        props.states.setTargetState('HOME');
        props.states.setDisplayState(LSU.HomeDisplayState);
        await new Promise(resolve => setTimeout(resolve, SCU.DURATION));
        props.states.setInitialState('HOME');
    };

    return (
        <Animated.View style={[
            queriedHeadlineStyles.viewQueryContainer,
            queriedHeadlineAnimatedStyles(props)]}>

            <TouchableOpacity onPress={() => f()}>
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