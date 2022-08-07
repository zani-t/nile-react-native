import { StyleSheet } from 'react-native';
import { interpolate, useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

export const storedHeadlineAnimatedStyles = (props: LSU.DisplayState) => {

    const animationValue = useDerivedValue(() => {
        return props.StoredHeadline
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

export const viewContainerAnimatedStyles = (props: LSU.DisplayState) => {

    const animationValue = useDerivedValue(() => {
        return props.StoredHeadlineText
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

export const storedHeadlineStyles = StyleSheet.create({
    viewStoredContainer: {
        paddingHorizontal: '6%',
        justifyContent: 'center',
    },
    viewImageContainer: {
        marginTop: '2%',
        shadowColor: 'rgba(0, 0, 0, 0.9)',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 12,
    },
    viewTextContainer: {
        marginTop: '3%',
    },

    imageStored: {
        width: '100%',
        aspectRatio: 1.6,
        resizeMode: 'cover',
        borderRadius: 12,
    },

    textStoredHeadlineUpper: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 2,
        color: SCU.COLORS.WHITE,
    },
    textStoredHeadlineLower: {
        transform: [{ translateY: -3 }],
        fontFamily: 'Poppins-Light',
        fontSize: 13,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
        color: SCU.COLORS.WHITE,
    },
});