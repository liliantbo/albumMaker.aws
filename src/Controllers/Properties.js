//valores que puede tomar el estado flow
export const FLOW_NEW = 'new';
export const FLOW_BILLING ='onBilling';
export const FLOW_PROCESS='onProcess';
export const FLOW_PROCESED='processed';
export const FLOW_SAVED='processedAndSaved';

//valores que puede tomar es estados selectedOption
export const OPTION_ALBUM='album';
export const OPTION_BILL='bill';
export const OPTION_RESUME='resume';
export const OPTION_CREATE='createNewAlbum';

//valores que puede tomar el tema
export const THEME_LIGHT='light';
export const THEME_DARK='dark';

//modelos de template
export const TEMPLATE_BIRTHDAY='birthday';
export const TEMPLATE_LOVE='love';

//messajes de exito
export const MESSAGE_PROCESSED='Album no almacenado en AWS';
export const MESSAGE_SAVED='Album almacenado en AWS exitosamente';