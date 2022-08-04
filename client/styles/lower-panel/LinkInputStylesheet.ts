import { StyleSheet } from 'react-native';
import { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

export const linkInputAnimatedStyles = (props: LSU.DisplayState) => {

    const opacityValue = useDerivedValue(() => {
        return props.LinkInput
            ? withTiming(1, { duration: SCU.DURATION })
            : withTiming(0, { duration: SCU.DURATION });
    }, [props]);

    const borderWidthValue = useDerivedValue(() => {
        return props.LinkInputMode === 'SET_LINK'
            ? withTiming(0, { duration: SCU.DURATION })
            : withTiming(1, { duration: SCU.DURATION });
    });

    const borderColorValue = useDerivedValue(() => {
        switch (props.LinkInputMode) {
            case 'ERROR':
                return withTiming(0, { duration: SCU.DURATION });
            case 'SET_LINK':
                return withTiming(1, { duration: SCU.DURATION });
            case 'SET_CATEGORY':
                return withTiming(2, { duration: SCU.DURATION });
        };
    }, [props]);

    const animationOutput = useAnimatedStyle(() => {
        return {
            opacity: opacityValue.value,
            borderWidth: borderWidthValue.value,
            borderColor: interpolateColor(
                borderColorValue.value,
                [0, 1, 2],
                [SCU.COLORS.LIGHT_RED, SCU.COLORS.GRAY, SCU.COLORS.LIGHT_GREEN],
            ),
        };
    });

    return animationOutput;

};

export const linkInputStyles = StyleSheet.create({
    viewLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '6%',
        marginTop: '4%',
        marginBottom: '2%',
        paddingHorizontal: '4%',
        height: SCU.HEIGHT * 0.37 * 0.14,
        width: '88%',
        borderRadius: 10,
        backgroundColor: SCU.COLORS.GRAY,
    },

    textInputLink: {
        width: '100%',
        paddingRight: '10%',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.03)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        color: '#222',
    },

    iconEnterLink: {
        justifyContent: 'center',
        transform: [{ translateX: -18 }],
    },
})