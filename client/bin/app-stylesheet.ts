import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import { AppState, KeyboardState } from './App';
import Colors from './Colors';

interface MainStylesheetProps {
    states: any,
    initialState: any[];
}

interface ConditionalStylesheetProps {
    appState: AppState;
}

const DUR_MS = 750;
const { height, width } = Dimensions.get('window');

const panelHeights = {
    splash: {
        sharedValue: 0,
        upper: height * 1.00,
        center: height * .00,
        lower: height * .00,
    },
    auth: {
        sharedValue: 1,
        upper: height * .52,
        center: height * .00,
        lower: height * .48,
    },
    home: {
        sharedValue: 2,
        upper: height * .58,
        center: height * .00,
        lower: height * .42,
    },
    confirm_sort: {
        sharedValue: 3,
        upper: height * .18,
        center: height * .27,
        lower: height * .55,
    },

    key_auth: {
        sharedValue: 0,
        upper: height * .20,
        center: height * .00,
        lower: height * .78,
    }
}

const stateValues = {
    splash: {
        height: {
            upper: height * 1.00,
            center: height * .00,
            lower: height * .00,
        },
        colors: {
            upper: Colors.blue,
            center: Colors.dark_green,
            lower: Colors.dark_green,
        },
    },
    auth: {
        keyboardOff: {
            height: {
                upper: height * .52,
                center: height * .00,
                lower: height * .48,
            },
        },
        keyboardOn: {
            upper: height * .20,
            center: height * .00,
            lower: height * .78,
        },
        colors: {
            upper: Colors.green,
            center: Colors.dark_green,
            lower: Colors.dark_green,
        },
    },
    home: {
        keyboardOff: {
            height: {
                upper: height * .58,
                center: height * .00,
                lower: height * .42,
            },
        },
        keyboardOn: {
            height: {
                upper: height * .58,
                center: height * .00,
                lower: height * .42,
            },
        },
        colors: {
            upper: Colors.green,
            center: Colors.dark_green,
            lower: Colors.white,
        },
    }
}

export const viewContainerAnimatedStyles = (props: MainStylesheetProps) => {
    const animationValue = useDerivedValue(() => {
        return props.states.appState === 'SPLASH' ? withTiming(0) : withTiming(1);
    }, [props]);
    const animationOutput = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                animationValue.value,
                [0, 1],
                [Colors.blue, Colors.green]
            ),
        };
    });
    return animationOutput;
};

export const viewUpperAnimatedStyles = (props: MainStylesheetProps) => {
    const animationValue = useDerivedValue(() => {
        switch (props.states.appState) {
            case 'SPLASH':
                return panelHeights.splash.sharedValue;
            case 'AUTH':
                switch (props.states.keyboardState) {
                    case 'AUTH':
                        return withTiming(panelHeights.key_auth.sharedValue, { duration: DUR_MS });
                    default:
                        return withTiming(panelHeights.auth.sharedValue, { duration: DUR_MS });
                }
            case 'HOME':
                return withTiming(panelHeights.home.sharedValue, { duration: DUR_MS });
            default:
                return withTiming(panelHeights.confirm_sort.sharedValue, { duration: DUR_MS });
        }
    }, [props]);

    const animationOutput = useAnimatedStyle(() => {
        return props.states.keyboardState === 'OFF' ? {
            height: interpolate(
                animationValue.value,
                [panelHeights.splash.sharedValue,
                panelHeights.auth.sharedValue,
                panelHeights.home.sharedValue,
                panelHeights.confirm_sort.sharedValue],
                [panelHeights.splash.upper,
                panelHeights.auth.upper,
                panelHeights.home.upper,
                panelHeights.confirm_sort.upper]),
        } : {
            height: interpolate(
                animationValue.value,
                [panelHeights.key_auth.sharedValue,
                panelHeights.auth.sharedValue],
                [panelHeights.key_auth.upper,
                panelHeights.auth.upper]
            ),
        }
    });
    return animationOutput;
};

export const viewUpperConditionalStyles = (props: ConditionalStylesheetProps) => {
    let conditionalStyle: ViewStyle = {};
    switch (props.appState) {
        case 'SPLASH':
            conditionalStyle.marginTop = '5%';
            break;
        case 'AUTH':
            conditionalStyle.justifyContent = 'center';
            break;
    }
    return conditionalStyle;
};

///////////////////////////////////////////////////////////////////////////

export const viewLowerAnimatedStyles = (props: MainStylesheetProps) => {

    /*
     * toggle begins at 0
     * when state changes -> set toggle to opposite
     * get new toggle value, interpolate from old to new, old state to new state
     */

    const animationValue = useDerivedValue(() => {
        const toggleValue = props.states.toggleState ? Math.abs(props.states.toggleState - 1) : 0;
        return withTiming(toggleValue, { duration: DUR_MS });
    }, [props]);

    const animationOutput = useAnimatedStyle(() => {
        // beginning state, AUTH, OFF
        // OFF changes -> find state != beginning state?
        // interpolate between corresponding values

        // Determine changed state : AUTH, OFF -> AUTH, AUTH
        let oldBgColor = null;
        let newBgColor = null;
        let oldHeight = 0;
        let newHeight = 0;
        if (props.states.keyboardState !== props.initialState[1]) {
            if (props.initialState[1] === 'OFF') {
                oldHeight = stateValues.auth.keyboardOff.height.lower;
            }
            if (props.states.keyboardState === 'AUTH') {
                newHeight = stateValues.auth.keyboardOn.lower;
            }
        }

        let final_value: ViewStyle = {
            /*backgroundColor: interpolateColor(
                animationValue.value,
                [props.toggleState, animationValue.value],
                [oldBgColor, newBgColor],
            ),*/
            height: interpolate(
                animationValue.value,
                [props.states.toggleState, animationValue.value],
                [oldHeight, newHeight],
            )
        }

        return final_value;
    });

    /*const animationValue = useDerivedValue(() => {
        switch (props.appState) {
            case 'SPLASH':
                return panelHeights.splash.sharedValue;
            case 'AUTH':
                switch (props.keyboardState) {
                    case 'AUTH':
                        return withTiming(panelHeights.key_auth.sharedValue, { duration: DUR_MS });
                    default:
                        return withTiming(panelHeights.auth.sharedValue, { duration: DUR_MS });
                }
            case 'HOME':
                return withTiming(panelHeights.home.sharedValue, { duration: DUR_MS });
            default:
                return withTiming(panelHeights.confirm_sort.sharedValue, { duration: DUR_MS });
        }
    }, [props]);

    const animationOutput = useAnimatedStyle(() => {
        let final_value: ViewStyle = {
            backgroundColor: interpolateColor(
                animationValue.value,
                [0, 1, 2, 3],
                [Colors.dark_green,
                Colors.dark_green,
                Colors.white,
                Colors.white]
            )
        }
        final_value.height = props.keyboardState === 'OFF' ?
            interpolate(
                animationValue.value,
                [panelHeights.splash.sharedValue,
                panelHeights.auth.sharedValue,
                panelHeights.home.sharedValue,
                panelHeights.confirm_sort.sharedValue],
                [panelHeights.splash.lower,
                panelHeights.auth.lower,
                panelHeights.home.lower,
                panelHeights.confirm_sort.lower]) :
            interpolate(
                animationValue.value,
                [panelHeights.key_auth.sharedValue,
                panelHeights.auth.sharedValue],
                [panelHeights.key_auth.lower,
                panelHeights.auth.lower]);
        return final_value;
    });*/
    props.states.toggleStateController(animationValue.value);
    return animationOutput;
};

//////////////////////////////////////////////////////////////////////////////

export const viewLowerConditionalStyles = (props: ConditionalStylesheetProps) => {
    let conditionalStyle: ViewStyle = {};
    switch (props.appState) {
        case 'AUTH':
            conditionalStyle.paddingTop = '12%';
        default:
            return conditionalStyle;
    }
};

export const appStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    viewPanelUpper: {
        width: '100%',
        marginTop: '12%',
    },
    viewPanelCenter: {
        backgroundColor: 'blue',
    },
    viewPanelLower: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    }
});