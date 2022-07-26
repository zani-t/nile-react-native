import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';

import {
    app_styles,
    view_container_animated_styles,
    view_upper_animated_styles,
    view_upper_conditional_styles,
    view_lower_animated_styles,
    view_lower_conditional_styles,
} from './styles/app-stylesheet';

import UpperPanel from './components/upper-panel/UpperPanel';
import SplashImage from './components/SplashImage';
import HeaderLarge from './components/upper-panel/HeaderLarge';
import HeaderSmall from './components/upper-panel/HeaderSmall';

import LowerPanel from './components/lower-panel/LowerPanel';
import AuthElements from './components/lower-panel/AuthElements';
import PanelButtons from './components/lower-panel/PanelButtons';
import LinkInput from './components/lower-panel/LinkInput';

export type AppState = 'SPLASH' | 'AUTH'| 'HOME' | 'CONFIRM' | 'SORT';
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

    return (

        <Animated.View
            style={[app_styles.view_container,
            view_container_animated_styles({ appState: appState })]}>
            <UpperPanel
                style={[app_styles.view_panel_upper,
                view_upper_animated_styles({
                    appState: appState,
                    keyboardState: keyboardState,
                }),
                view_upper_conditional_styles({ appState: appState })]}>

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
                style={[app_styles.view_panel_lower,
                view_lower_animated_styles({
                    appState: appState,
                    keyboardState: keyboardState,
                }),
                view_lower_conditional_styles({ appState: appState })]}>

                {appState === 'AUTH' &&
                    <AuthElements
                        appStateController={setAppState}
                        appDisplayControl={appDisplay}
                        appDisplayController={setAppDisplay}
                        keyboardStateController={setKeyboardState}/>}
                {appState === 'HOME' &&
                    <>
                        <PanelButtons
                            appStateController={setAppState}
                            appDisplayControl={appDisplay}
                            appDisplayController={setAppDisplay} />
                        <LinkInput
                            appStateController={setAppState}
                            appDisplayControl={appDisplay}
                            appDisplayController={setAppDisplay} />
                    </>}

            </LowerPanel>
            <StatusBar style="light" />
        </Animated.View>

    );

};











/*
 * top panel - splash image, yw large, yw small, stored headline
 * center panel - category list
 * bottom panel - auth input, control buttons, queried headline, text input, extra articles, all articles
 */

// animation method - fade elements, change state, show new elements

// permanent - container, above panel

// splash - container blue, splash image
// auth - container green, panel up, panel green, header, inputs
// home - panel down, panel white, stored article, panel buttons, enter link, other articles
// confirm - panel up, queried article
// categories - panel down, inner panel up, categories, articles

// all components
// *splash image

// *yw header 1
// *auth elements (email, password, buttons* - contact mongo)

// *yw header 2
// stored headline (photo, text)* - go to web
// panel buttons* - refresh[/contact mongo], log out, trigger categories
// txt input* - contact django & trigger confirm stg 1 // set category, contact mongo, trigger home
// extra articles* - go to web
// queried headline (photo, text)* - trigger confirm stg 2, change txt input properties
// category list
// article list (text*) - [rearrange/renamea articles/partially reload list]
// home button - trigger home, contact mongo