import { ViewStyle } from 'react-native';
import React from 'react';

import Animated from 'react-native-reanimated';

interface TopPanelProps {
    style: ViewStyle[];
    children: any
};

const TopPanel: React.FC<TopPanelProps> = (props: TopPanelProps) => {
    return (
        <Animated.View style={props.style}>
            {props.children}
        </Animated.View>
    );
};

export default TopPanel;