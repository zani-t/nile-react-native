import { StyleSheet, ViewStyle } from 'react-native';

import { interpolate, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import * as LSU from '../utils/LayoutStateUtils';
import * as SCU from '../utils/StyleConstUtils';

export const viewCenterAnimatedStyles = (props: LSU.ComponentProps) => {

    // Panel initial & target params
    const initial = {
        height: LSU.LayoutState.get(props.states.initialState).center.height,
    };
    const target = {
        height: LSU.LayoutState.get(props.states.targetState).center.height,
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
        };
    });

    return animationOutput;
    
};

export const viewCenterConditionalStyles = (props: LSU.PanelState) => {

    let conditionalStyle: ViewStyle = {};
    if (props === 'SORT') {
        conditionalStyle.justifyContent = 'flex-end';
    };
    return conditionalStyle;

};

export const centerPanelStyles = StyleSheet.create({
    viewCenter: {
        backgroundColor: SCU.COLORS.DARK_GREEN,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
});