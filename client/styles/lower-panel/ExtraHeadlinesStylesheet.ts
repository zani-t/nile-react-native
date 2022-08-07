import { StyleSheet } from 'react-native';
import { useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

export const extraHeadlinesAnimatedStyles = (props: LSU.DisplayState) => {

    const animationValue = useDerivedValue(() => {
        return props.ExtraHeadlines
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

export const extraHeadlineStyles = StyleSheet.create({
    viewHeadlineContainer: {
        marginTop: '1%',
        paddingHorizontal: '7%',
    },

    textHeadline: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        marginTop: '1%',
    },
    textHeadlineCategory: {
        fontFamily: 'Poppins-Bold',
    },
});