import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';

import {
    appStyles,
    viewContainerAnimatedStyles,
    viewUpperAnimatedStyles,
    viewUpperConditionalStyles,
    viewLowerAnimatedStyles,
    viewLowerConditionalStyles,
} from './styles/app-stylesheet';

import {
    _appStyles,
    _viewContainerAnimatedStyles,
    _viewUpperAnimatedStyles,
    _viewUpperConditionalStyles,
    _viewLowerAnimatedStyles,
    _viewLowerConditionalStyles,
} from './styles/new-app-stylesheet';

import UpperPanel from './components/upper-panel/UpperPanel';
import SplashImage from './components/SplashImage';
import HeaderLarge from './components/upper-panel/HeaderLarge';
import HeaderSmall from './components/upper-panel/HeaderSmall';

import LowerPanel from './components/lower-panel/LowerPanel';
import AuthElements from './components/lower-panel/AuthElements';
import PanelButtons from './components/lower-panel/PanelButtons';
import LinkInput from './components/lower-panel/LinkInput';
import { AuthProvider } from './context/AuthContext';

export type AppState = 'SPLASH' | 'AUTH' | 'HOME' | 'CONFIRM' | 'SORT';
export type KeyboardState = 'OFF' | 'TRANSITION' | 'AUTH' | 'LINK'
export type LinkInputDisplay = 'DEFAULT' | 'BAD_LINK' | 'CONFIRM'
export type AppDisplay = {
    HeaderLarge: boolean;
    HeaderSmall: boolean;
    AuthElements: boolean,
    PanelButtons: boolean,
    LinkInput: boolean,
    LinkInputType: LinkInputDisplay;
}

export default function App() {

    const [appState, setAppState] = useState<AppState>('SPLASH');
    const [keyboardState, setKeyboardState] = useState<KeyboardState>('OFF');
    const [appDisplay, setAppDisplay] = useState<AppDisplay>({
        HeaderLarge: false,
        HeaderSmall: false,
        AuthElements: false,
        PanelButtons: false,
        LinkInput: false,
        LinkInputType: 'DEFAULT',
    });
    const [toggleState, setToggleState] = useState(0);

    const getStates = async () => {
        return {
            appState: appState,
            appStateController: setAppState,
            keyboardState: keyboardState,
            keyboardStateController: setKeyboardState,
            appDisplay: appDisplay,
            appDisplayController: setAppDisplay,
            toggleState: toggleState,
            toggleStateController: setToggleState,
        };
    };

    return (

        <AuthProvider
            appStateController={setAppState}
            appDisplayController={setAppDisplay}
            keyboardStateController={setKeyboardState} >

            <Animated.View
                style={[appStyles.viewContainer,
                viewContainerAnimatedStyles({
                    states: getStates(),
                    initialState: [appState, keyboardState],
                })]}>

                <UpperPanel
                    style={[appStyles.viewPanelUpper,
                    viewUpperAnimatedStyles({
                        states: getStates(),
                        initialState: [appState, keyboardState],
                    }),
                    viewUpperConditionalStyles({ appState: appState })]}>

                    {appState === 'SPLASH' &&
                        <SplashImage appStateControl={setAppState} />}
                    {appState === 'AUTH' &&
                        <HeaderLarge appDisplayControl={appDisplay} />}
                    {appState === 'HOME' &&
                        <HeaderSmall appDisplayControl={appDisplay} />}

                </UpperPanel>

                {
                    // panelbuttons calls appdisplaycontroller to display components
                }

                <LowerPanel
                    style={[appStyles.viewPanelLower,
                    viewLowerAnimatedStyles({
                        states: getStates(),
                        initialState: [appState, keyboardState],
                    }),
                    viewLowerConditionalStyles({ appState: appState })]}>

                    {appState === 'AUTH' &&
                        <AuthElements states={getStates} />}
                    {appState === 'HOME' &&
                        <>
                            <PanelButtons
                                states={getStates()} />
                            <LinkInput
                                states={getStates()} />
                        </>}

                </LowerPanel>
                <StatusBar style="light" />
            </Animated.View>
        </AuthProvider>

    );

};