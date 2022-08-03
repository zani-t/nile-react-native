import { StyleSheet, ViewStyle } from 'react-native';

import { interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

export const viewLowerAnimatedStyles = (props: LSU.ComponentProps) => {

    // Panel initial & target params
    const initial = {
        height: LSU.LayoutState.get(props.states.initialState).lower.height,
        color: LSU.LayoutState.get(props.states.initialState).lower.color,
    };
    const target = {
        height: LSU.LayoutState.get(props.states.targetState).lower.height,
        color: LSU.LayoutState.get(props.states.targetState).lower.color,
    };

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
            backgroundColor: interpolateColor(
                animationValue.value,
                [0, 1],
                [initial.color, target.color],
            ),
        };
    });

    return animationOutput;

};

export const viewLowerConditionalStyles = (props: LSU.PanelState) => {

    let conditionalStyle: ViewStyle = {};
    switch (props) {
        case 'AUTH':
            conditionalStyle.paddingTop = '12%';
        default:
            return conditionalStyle;
    }

};

export const lowerPanelStyles = StyleSheet.create({
    viewLower: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
});