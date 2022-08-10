import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import Animated from 'react-native-reanimated';

import AxiosDynamic from '../../utils/AxiosDynamic';
import * as LSU from './../../utils/LayoutStateUtils';

const Categories: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    useEffect(() => {
        async function openingSequence() {
            props.states.setDisplayState(LSU.SortDisplayState);
        };
        openingSequence();
    }, []);

    useEffect(() => console.log(props.states.displayState), [props])

    return(
        <Animated.View>
            <Text>hi</Text>
        </Animated.View>
    );

}

export default Categories;