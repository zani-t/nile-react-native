import { StyleSheet } from 'react-native';
import { useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';

export const panelButtonsAnimatedStyles = (props: LSU.DisplayState) => {

    const animationValue = useDerivedValue(() => {
        return props.PanelButtons
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

export const panelButtonsStyles = StyleSheet.create({
    viewButtonContainer: {
        flexDirection: 'row',
        paddingTop: '5%',
        paddingLeft: '7%',
    },

    icon: {
        marginRight: '6%'
    },
    iconSettings: {
        transform: [{ translateY: -1 }],
    },
})