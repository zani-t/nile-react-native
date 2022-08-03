import { StyleSheet } from 'react-native';
import { useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

export const linkInputAnimatedStyles = (props: LSU.DisplayState) => {

    const animationValue = useDerivedValue(() => {
        return props.LinkInput
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

export const linkInputStyles = StyleSheet.create({
    viewLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '6%',
        marginTop: '6%',
        marginBottom: '2%',
        paddingHorizontal: '4%',
        height: '13%',
        width: '88%',
        borderRadius: 10,
        backgroundColor: SCU.COLORS.GRAY,
    },

    textInputLink: {
        width: '100%',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        color: SCU.COLORS.LIGHT_GRAY,
    },
    
    iconEnterLink: {
        justifyContent: 'center',
        transform: [{ translateX: -18 }],
    },
})