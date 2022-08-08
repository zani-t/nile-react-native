import { StyleSheet, ViewStyle } from 'react-native';

import { interpolate, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import * as LSU from '../utils/LayoutStateUtils';
import * as SCU from '../utils/StyleConstUtils';

export const viewUpperAnimatedStyles = (props: LSU.ComponentProps) => {

    // Panel initial & target params
    const initial = { height: LSU.LayoutState.get(props.states.initialState).upper.height, };
    const target = { height: LSU.LayoutState.get(props.states.targetState).upper.height, };

    // If new target set -> return 1
    const animationValue = useDerivedValue(() => {
        return props.states.initialState === props.states.targetState
            ? withTiming(0, { duration: SCU.DURATION })
            : withTiming(1, { duration: SCU.DURATION });
    });

    // Interpolate panel height
    const animationOutput = useAnimatedStyle(() => {
        return {
            height: interpolate(
                animationValue.value,
                [0, 1],
                [initial.height, target.height],
            ),
        };
    });

    return animationOutput;

};

export const viewUpperConditionalStyles = (props: LSU.PanelState) => {

    let conditionalStyle: ViewStyle = {};
    switch (props) {
        case 'SPLASH':
            conditionalStyle.marginTop = '5%';
            break;
        case 'AUTH':
        case 'AUTH_INPUT':
            conditionalStyle.justifyContent = 'center';
            break;
    }
    return conditionalStyle;
    
}

export const upperPanelStyles = StyleSheet.create({
    viewUpper: {
        width: '100%',
        marginTop: '11%',
        // justifyContent: 'center',
    },
});