import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';

import { app_styles,
    view_container_animated_styles,
    view_top_animated_styles,
    view_top_conditional_styles,
    view_bottom_animated_styles,
    view_bottom_conditional_styles,
} from './styles/app-stylesheet';

import TopPanel from './components/TopPanel';
import SplashImage from './components/SplashImage';
import HeaderLarge from './components/HeaderLarge';
import HeaderSmall from './components/HeaderSmall';

import BottomPanel from './components/BottomPanel';
import AuthElements from './components/AuthElements';
import PanelButtons from './components/PanelButtons';
import LinkInput from './components/LinkInput';

export type AppState = 'SPLASH' | 'AUTH' | 'HOME' | 'CONFIRM' | 'SORT';

export default function App() {

    const [appState, setAppState] = useState<AppState>('SPLASH');

    return (

        <Animated.View
            style={[app_styles.view_container,
            view_container_animated_styles({ appState: appState })]}>
            <TopPanel
                style={[app_styles.view_panel_top,
                view_top_animated_styles({ appState: appState }),
                view_top_conditional_styles({ appState: appState })]}>
                {appState === 'SPLASH' &&
                    <SplashImage appStateControl={setAppState} />}
                {appState === 'AUTH' &&
                    <HeaderLarge appStateControl={setAppState} />}
                {appState === 'HOME' &&
                    <HeaderSmall appStateControl={setAppState} />}
            </TopPanel>
            <BottomPanel
                style={[app_styles.view_panel_bottom,
                view_bottom_animated_styles({ appState: appState }),
                view_bottom_conditional_styles({ appState: appState })]}>
                {appState === 'AUTH' &&
                    <AuthElements appStateControl={setAppState} />}
                {appState === 'HOME' &&
                    <><PanelButtons appStateControl={setAppState} />
                    <LinkInput appStateControl={setAppState} /></>}
            </BottomPanel>
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