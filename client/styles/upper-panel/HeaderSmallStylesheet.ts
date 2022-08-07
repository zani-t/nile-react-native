import { StyleSheet } from 'react-native';
import { useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

export const headerSmallAnimatedStyles = (props: LSU.DisplayState) => {

    const animationValue = useDerivedValue(() => {
        return props.HeaderSmall
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

export const headerSmallStyles = StyleSheet.create({
    viewHeaderSmall: {
        height: SCU.HEIGHT * 0.58 * .19,
        paddingLeft: '5%',
    },
    viewHeaderInline: {
        flexDirection: 'row',
    },

    textHeader: {
        marginLeft: '1%',
        fontFamily: 'Poppins-SemiBoldItalic',
        textAlignVertical: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        color: SCU.COLORS.GOLD,
    },
    textHeaderTopLeft: {
        marginRight: '3%',
        fontSize: 32,
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 4,
    },
    textHeaderTopRight: {
        paddingTop: '2%',
        transform: [{ translateX: -4 }],
        fontSize: 20,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    textHeaderBottom: {
        fontSize: 10,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        transform: [{ translateY: -7 }],
    },
});