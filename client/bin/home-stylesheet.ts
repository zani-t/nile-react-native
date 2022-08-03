import { Dimensions, StyleSheet } from "react-native";
import { useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import Colors from "./Colors";

interface HomeStylesheetProps {
    componentDisplayed: boolean;
}

const DUR_MS = 750;
const { height, width } = Dimensions.get('window');

export const home_animated_styles = (props: HomeStylesheetProps) => {
    const animation_value = useDerivedValue(() => {
        return props.componentDisplayed === true ?
            withTiming(1, { duration: DUR_MS }) : withTiming(0, { duration: DUR_MS });
    }, [props]);
    const animation_output = useAnimatedStyle(() => {
        return {
            opacity: animation_value.value,
        };
    });
    return animation_output;
};

export const home_styles = StyleSheet.create({
    view_header_small: {
        height: '18%',
        paddingLeft: '5%',
    },
    view_header_inline: {
        flexDirection: 'row',
    },
    view_button_container: {
        flexDirection: 'row',
        paddingTop: '5%',
        paddingLeft: '7%',
    },
    view_link_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '6%',
        marginTop: '6%',
        marginBottom: '2%',
        paddingHorizontal: '4%',
        height: '13%',
        width: '88%',
        borderRadius: 10,
        backgroundColor: '#eeeeee',
    },

    text_header: {
        marginLeft: '1%',
        fontFamily: 'Poppins-SemiBoldItalic',
        textAlignVertical: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        color: Colors.gold,
    },
    text_header_topleft: {
        marginRight: '3%',
        fontSize: 32,
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 4,
    },
    text_header_topright: {
        paddingTop: '2%',
        transform: [{ translateX: -4 }],
        fontSize: 20,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    text_header_bottom: {
        fontSize: 10,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        transform: [{ translateY: -7 }],
    },

    text_input_link: {
        width: '100%',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        color: '#b7b7b7',
    },

    icon: {
        marginRight: '6%'
    },
    icon_settings: {
        transform: [{ translateY: -1 }],
    },
    icon_enter_link: {
        justifyContent: 'center',
        transform: [{ translateX: -18 }],
    },
});