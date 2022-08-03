import { ViewStyle } from 'react-native';
import React from 'react';

import Animated from 'react-native-reanimated';

interface UpperPanelProps {
    style?: ViewStyle[];
    children?: React.ReactNode;
};

const UpperPanel: React.FC<UpperPanelProps> = (props: UpperPanelProps) => {
    return (
        <Animated.View style={props.style}>
            {props.children}
        </Animated.View>
    );
};

export default UpperPanel;