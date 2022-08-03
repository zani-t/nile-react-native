import React, { useState } from "react";

import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';

import { AuthProvider } from "./context/AuthContext";
import * as LSU from "./utils/LayoutStateUtils"; // LSU: LayoutStateUtilities
import UpperPanel from "./components/upper-panel/UpperPanel";
import CenterPanel from "./components/upper-panel/UpperPanel";
import LowerPanel from "./components/upper-panel/UpperPanel";
import SplashImage from "./components/upper-panel/SplashImage";
import { containerStyles, viewContainerAnimatedStyles } from "./styles/ContainerStylesheet";

export default function App() {

    // goal - begin from splash screen -> toggle, set app state to auth

    // when splash is finished -> toggle 0 to 1
    // interpolate: 0 = initial value, 1 = new value

    // const [animationToggle, setAnimationToggle] = useState(0);
    const [initialState, setInitialState] = useState<LSU.PanelState>('SPLASH');
    const [targetState, setTargetState] = useState<LSU.PanelState>('SPLASH');
    const [displayState, setDisplayState] = useState<LSU.DisplayState>(LSU.SplashDisplayState);

    const getStates = () => {
        return {
            states: {
                // animToggle: animationToggle,
                initialState: initialState,
                targetState: targetState,
                displayState: displayState,
                // setAnimToggle: setAnimationToggle,
                setInitialState: setInitialState,
                setTargetState: setTargetState,
                setDisplayState: setDisplayState,
            },
        };
    };

    return (
        <AuthProvider>
            <Animated.View style={[
                containerStyles.viewContainer,
                viewContainerAnimatedStyles(getStates())]}>
                <UpperPanel>
                    {initialState === 'SPLASH' &&
                        <SplashImage states={getStates().states} />}
                </UpperPanel>
                <CenterPanel>

                </CenterPanel>
                <LowerPanel>

                </LowerPanel>
            </Animated.View>
            <StatusBar style="light" />
        </AuthProvider>
    );
};