import React, { useEffect } from 'react';

import Animated from 'react-native-reanimated';
import { headerLargeAnimatedStyles, headerLargeStyles } from '../../styles/upper-panel/HeaderLargeStylesheet';

import * as LSU from './../../utils/LayoutStateUtils';

const HeaderLarge: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    return (
        <Animated.Text
            style={[headerLargeStyles.textHeaderLarge,
                headerLargeAnimatedStyles(props.states.displayState)]}>
            YW</Animated.Text>
    );

};

export default HeaderLarge;