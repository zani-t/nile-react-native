import { ViewStyle } from 'react-native';
import React from 'react';

import Animated from 'react-native-reanimated';

interface BottomPanelProps {
    style: ViewStyle[];
    children: any;
};

const BottomPanel: React.FC<BottomPanelProps> = (props: BottomPanelProps) => {
    return (
        <Animated.View style={props.style}>
            {props.children}
        </Animated.View>
    );
};

export default BottomPanel;