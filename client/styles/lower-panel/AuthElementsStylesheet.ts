import { StyleSheet } from 'react-native';

import { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

export const authElementsAnimatedStyles = (props: LSU.DisplayState) => {

    const animationValue = useDerivedValue(() => {
        return props.AuthElements
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

export const authElementsStyles = StyleSheet.create({
    viewAuthContent: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    viewButtonContainer: {
        flexDirection: 'row',
    },
    
    textInputAuth: {
        width: '75%',
        marginBottom: '10%',
        borderBottomColor: SCU.COLORS.LIGHT_GREEN,
        borderBottomWidth: 1,
        fontFamily: 'Poppins',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        color: SCU.COLORS.WHITE,
    },
    textButton: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        color: SCU.COLORS.WHITE,
    },
});