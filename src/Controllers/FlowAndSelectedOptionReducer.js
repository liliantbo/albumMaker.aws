import { FLOW_BILLING, FLOW_NEW, FLOW_PROCESED, FLOW_PROCESS, OPTION_ALBUM, OPTION_BILL, OPTION_CREATE, OPTION_RESUME, TEMPLATE_BIRTHDAY, TEMPLATE_LOVE, THEME_DARK, THEME_LIGHT } from "./Properties";

export function FlowAndSelectedOptionReducer(state, action) {
    switch (action.type) {
        case 'goToAlbum':
            return {
                ...state,
                selectedOption: OPTION_ALBUM,
            };
        case 'goToBill':
            return {
                ...state,
                selectedOption: OPTION_BILL,
            };
        case 'goToResume':
            return {
                ...state,
                selectedOption: OPTION_RESUME,
            };
        case 'albumComplete':
            return {
                ...state,
                flow: FLOW_BILLING,
                selectedOption: OPTION_BILL,
            };
        case 'billingComplete':
            return {
                ...state,
                flow: FLOW_PROCESS,
                selectedOption: OPTION_RESUME,
            };
        case 'processComplete':
            return {
                ...state,
                flow: FLOW_PROCESED,
            };
        case 'newAlbum':
            return {
                ...state,
                flow: FLOW_NEW,
                selectedOption: OPTION_CREATE,
            };
        case 'goToNewAlbum':
            return {
                ...state,
                flow: FLOW_NEW,
                selectedOption: OPTION_ALBUM,
            };
        case 'changeTheme':
            const newTheme = state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
            return {
                ...state,
                theme: newTheme,
            };
        case 'birthdayTemplate':
            return {
                ...state,
                template: TEMPLATE_BIRTHDAY,
            };
        case 'loveTemplate':
            return {
                ...state,
                template: TEMPLATE_LOVE,
            };
        default:
            return state;
    }
};