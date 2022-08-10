import { StyleSheet } from 'react-native';

import { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

export const headerLargeAnimatedStyles = (props: LSU.DisplayState) => {

    const animationValue = useDerivedValue(() => {
        return props.HeaderLarge
            ? withTiming(1, { duration: SCU.DURATION })
            : withTiming(0, { duration: SCU.DURATION });
    }, [props]);

    const animationOutput = useAnimatedStyle(() => {
        return {
            opacity: animationValue.value,
        };
    });

    return animationOutput;

};

export const headerLargeStyles = StyleSheet.create({
    textHeaderLarge: {
        width: '100%',
        fontSize: 72,
        fontFamily: 'Poppins-SemiBoldItalic',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 5, height: 6 },
        textShadowRadius: 10,
        color: SCU.COLORS.GOLD,
    },
});