import { ViewStyle } from 'react-native';
import React from 'react';

import Animated from 'react-native-reanimated';

interface CenterPanelProps {
    style?: ViewStyle[];
    children?: React.ReactNode;
};

const CenterPanel: React.FC<CenterPanelProps> = (props: CenterPanelProps) => {
    return (
        <Animated.View style={props.style}>
            {props.children}
        </Animated.View>
    );
};

export default CenterPanel;