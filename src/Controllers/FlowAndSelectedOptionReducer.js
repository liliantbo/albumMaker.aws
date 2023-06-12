import SaveHandler from "../Aws/SaveHandler";
import { FLOW_BILLING, FLOW_NEW, FLOW_PROCESED, FLOW_PROCESS, OPTION_ALBUM, OPTION_BILL, OPTION_RESUME, TEMPLATE_BIRTHDAY, TEMPLATE_LOVE, THEME_DARK, THEME_LIGHT } from "./Properties";

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
            return saveAlbum(state);
        case 'newAlbum':
            return {
                ...state,
                flow: FLOW_NEW,
                selectedOption: OPTION_ALBUM,
                billing: {
                    name: '',
                    lastName: '',
                    identificationNumber: '',
                    telephone: '',
                    province: '',
                    city: '',
                    address: ''
                },
                shipping: {
                    copyFromBilling: false,
                    name: '',
                    lastName: '',
                    identificationNumber: '',
                    telephone: '',
                    province: '',
                    city: '',
                    address: ''
                },
                imageList: [null, null, null, null, null, null]
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
        case 'updateImageList':
            return {
                ...state,
                imageList: action.newImageList,
            };
        case 'updateBilling':
            return {
                ...state,
                billing: action.newBilling,
            };
        case 'updateShipping':
            return {
                ...state,
                shipping: action.newShipping,
            };
        default:
            return state;
    }
};

function saveAlbum(state){
    SaveHandler(state);
    return {
        ...state,
        flow: FLOW_PROCESED,
    };
}