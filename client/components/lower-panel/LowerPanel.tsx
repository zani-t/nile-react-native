import { ViewStyle } from 'react-native';
import React from 'react';

import Animated from 'react-native-reanimated';

interface LowerPanelProps {
    style: ViewStyle[];
    children: React.ReactNode;
};

const LowerPanel: React.FC<LowerPanelProps> = (props: LowerPanelProps) => {
    return (
        <Animated.View style={props.style}>
            {props.children}
        </Animated.View>
    );
};

export default LowerPanel;