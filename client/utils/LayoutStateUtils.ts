import * as SCU from './StyleConstUtils';

// All states for panel configuration
export type PanelState = 'SPLASH' | 'AUTH' | 'AUTH_INPUT' | 'HOME' | 'HOME_INPUT' | 'SORT';

// All components (showing/hidden)
export type DisplayState = {
    SplashImage: boolean,
    HeaderLarge: boolean,
    AuthElements: boolean,
    HeaderSmall: boolean,
    StoredHeadline: boolean,
    QueriedHeadline: boolean,
    PanelButtons: boolean,
    LinkInput: boolean,
    ExtraHeadlines: boolean,
    Categories: boolean,
    ListedHeadlines: boolean,
};

// All hook variables sent to components
export type ComponentProps = {
    states: {
        // animToggle: number,
        initialState: PanelState,
        targetState: PanelState,
        displayState: DisplayState,
        // setAnimToggle: React.Dispatch<React.SetStateAction<number>>,
        setInitialState: React.Dispatch<React.SetStateAction<PanelState>>,
        setTargetState: React.Dispatch<React.SetStateAction<PanelState>>,
        setDisplayState: React.Dispatch<React.SetStateAction<DisplayState>>,
    },
};

// Layout configurations
export let LayoutState = new Map();

LayoutState.set('SPLASH', {
    container: {
        color: SCU.COLORS.BLUE
    },
    upper: {
        height: SCU.HEIGHT * 1.00,
    },
    center: {
        height: SCU.HEIGHT * 0.00,
    },
    lower: {
        height: SCU.HEIGHT * 0.00,
        color: SCU.COLORS.DARK_GREEN,
    },
});

LayoutState.set('AUTH', {
    container: {
        color: SCU.COLORS.GREEN
    },
    upper: {
        height: SCU.HEIGHT * 0.52,
    },
    center: {
        height: SCU.HEIGHT * 0.00,
    },
    lower: {
        height: SCU.HEIGHT * 0.48,
        color: SCU.COLORS.DARK_GREEN,
    },
});

LayoutState.set('HOME', {
    container: {
        color: SCU.COLORS.GREEN
    },
    upper: {
        height: SCU.HEIGHT * 0.58,
    },
    center: {
        height: SCU.HEIGHT * 0.00,
    },
    lower: {
        height: SCU.HEIGHT * 0.42,
        color: SCU.COLORS.WHITE,
    },
});

// Component configurations
// None showing
export const HiddenDisplayState: DisplayState = {
    SplashImage: false,
    HeaderLarge: false,
    AuthElements: false,
    HeaderSmall: false,
    StoredHeadline: false,
    QueriedHeadline: false,
    PanelButtons: false,
    LinkInput: false,
    ExtraHeadlines: false,
    Categories: false,
    ListedHeadlines: false,
};

// PanelState === 'SPLASH' -> SplashImage showing
export const SplashDisplayState: DisplayState = {
    ...HiddenDisplayState,
    SplashImage: true,
};

// PanelState === 'Auth' -> SplashImage showing
export const AuthDisplayState: DisplayState = {
    ...HiddenDisplayState,
    HeaderLarge: true,
    AuthElements: true,
};