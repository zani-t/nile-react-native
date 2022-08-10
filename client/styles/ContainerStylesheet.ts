import { StyleSheet } from 'react-native';

import { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import * as LSU from './../utils/LayoutStateUtils';
import * as SCU from './../utils/StyleConstUtils';

export const viewContainerAnimatedStyles = (props: LSU.ComponentProps) => {

    // Container initial & target params
    const initial = { backgroundColor: LSU.LayoutState.get(props.states.initialState).container.color, };
    const target = { backgroundColor: LSU.LayoutState.get(props.states.targetState).container.color, };

    // If new target set -> return 1
    const animationValue = useDerivedValue(() => {
        return props.states.initialState === props.states.targetState
            ? withTiming(0, { duration: SCU.DURATION })
            : withTiming(1, { duration: SCU.DURATION });
    }, [props]);

    // Interpolate container background color
    const animationOutput = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                animationValue.value,
                [0, 1],
                [initial.backgroundColor, target.backgroundColor],
            ),
        };
    });

    return animationOutput;
};

export const containerStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
});