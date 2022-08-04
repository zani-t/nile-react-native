import { StyleSheet } from 'react-native';
import { interpolate, useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

export const queriedHeadlineAnimatedStyles = (props: LSU.ComponentProps) => {

    // when target state === query -> height goes up
    // when queried headline on -> opacity goes up

    const opacityValue = useDerivedValue(() => {
        return props.states.displayState.QueriedHeadline
            ? withTiming(1, { duration: SCU.DURATION })
            : withTiming(0, { duration: SCU.DURATION });
    }, [props]);
    
    const heightValue = useDerivedValue(() => {
        return props.states.displayState.QueryContainer
            ? withTiming(1, { duration: 800 })
            : withTiming(0, { duration: 800 });
    }, [props]);

    const animationOutput = useAnimatedStyle(() => {
        return {
            opacity: opacityValue.value,
            height: interpolate(
                heightValue.value,
                [0, 1],
                [0, SCU.HEIGHT * 0.87 * 0.52],
            ),
        };
    });

    return animationOutput;

};

export const queriedHeadlineStyles = StyleSheet.create({
    viewQueryContainer: {
        paddingHorizontal: '7%',
    },
    viewImageContainer: {
        marginTop: '4%',
        shadowColor: 'rgba(0, 0, 0, 0.9)',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 12,
    },

    imageQuery: {
        width: '100%',
        aspectRatio: 1.6,
        borderRadius: 12,
    },

    textConfirm: {
        marginTop: '3%',
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        color: SCU.COLORS.GREEN,
    },
    textQueryHeadline: {
        fontFamily: 'Poppins-Light',
        fontSize: 13,
    },
});