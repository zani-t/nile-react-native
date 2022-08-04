import * as SCU from './StyleConstUtils';

export interface Article {
    title: string,
    source: string,
    category?: string,
    image: string,
    url: string,
}

// All states for panel configuration
export type PanelState = 'SPLASH' | 'AUTH' | 'AUTH_INPUT' | 'QUERY' | 'HOME' | 'HOME_INPUT' | 'SORT';

// All states from home page input
export type InputState = 'SET_LINK' | 'SET_CATEGORY' | 'ERROR';

// All components (showing/hidden)
export type DisplayState = {
    SplashImage: boolean,
    HeaderLarge: boolean,
    AuthElements: boolean,
    HeaderSmall: boolean,
    StoredHeadline: boolean,
    StoredHeadlineText: boolean,
    QueryContainer: boolean,
    QueriedHeadline: boolean,
    PanelButtons: boolean,
    LinkInput: boolean,
    LinkInputMode: InputState,
    ExtraHeadlines: boolean,
    Categories: boolean,
    ListedHeadlines: boolean,
};

// All hook variables sent to components
export type ComponentProps = {
    states: {
        initialState: PanelState,
        targetState: PanelState,
        displayState: DisplayState,
        articles: Article[],
        queriedArticle: Article | null,
        setInitialState: React.Dispatch<React.SetStateAction<PanelState>>,
        setTargetState: React.Dispatch<React.SetStateAction<PanelState>>,
        setDisplayState: React.Dispatch<React.SetStateAction<DisplayState>>,
        setArticles: React.Dispatch<React.SetStateAction<Article[]>>,
        setQueriedArticle: React.Dispatch<React.SetStateAction<Article | null>>,
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

LayoutState.set('AUTH_INPUT', {
    container: {
        color: SCU.COLORS.GREEN
    },
    upper: {
        height: SCU.HEIGHT * 0.20,
    },
    center: {
        height: SCU.HEIGHT * 0.00,
    },
    lower: {
        height: SCU.HEIGHT * 0.78,
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

LayoutState.set('HOME_INPUT', {
    container: {
        color: SCU.COLORS.GREEN
    },
    upper: {
        height: SCU.HEIGHT * 0.37,
    },
    center: {
        height: SCU.HEIGHT * 0.00,
    },
    lower: {
        height: SCU.HEIGHT * 0.63,
        color: SCU.COLORS.WHITE,
    },
});

LayoutState.set('QUERY', {
    container: {
        color: SCU.COLORS.GREEN
    },
    upper: {
        height: SCU.HEIGHT * 0.13,
    },
    center: {
        height: SCU.HEIGHT * 0.00,
    },
    lower: {
        height: SCU.HEIGHT * 0.87,
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
    StoredHeadlineText: false,
    QueryContainer: false,
    QueriedHeadline: false,
    PanelButtons: false,
    LinkInput: false,
    LinkInputMode: 'SET_LINK',
    ExtraHeadlines: false,
    Categories: false,
    ListedHeadlines: false,
};

// PanelState === 'SPLASH'
export const SplashDisplayState: DisplayState = {
    ...HiddenDisplayState,
    SplashImage: true,
};

// PanelState === 'Auth'
export const AuthDisplayState: DisplayState = {
    ...HiddenDisplayState,
    HeaderLarge: true,
    AuthElements: true,
};

// PanelState === 'AuthInput'
export const AuthInputDisplayState: DisplayState = {
    ...HiddenDisplayState,
    AuthElements: true,
};

// PanelState === 'Home'
export const HomeDisplayState: DisplayState = {
    ...HiddenDisplayState,
    HeaderSmall: true,
    StoredHeadline: true,
    StoredHeadlineText: true,
    PanelButtons: true,
    LinkInput: true,
    ExtraHeadlines: true,
};

// PanelState === 'HomeInput'
export const HomeInputDisplayState: DisplayState = {
    ...HiddenDisplayState,
    HeaderSmall: true,
    StoredHeadlineText: true,
    PanelButtons: true,
    LinkInput: true,
    ExtraHeadlines: true,
};

// PanelState === 'Query'
export const QueryDisplayState: DisplayState = {
    ...HiddenDisplayState,
    HeaderSmall: true,
    QueryContainer: true,
    PanelButtons: true,
    LinkInput: true,
    ExtraHeadlines: true,
};