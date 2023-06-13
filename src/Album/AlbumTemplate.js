import React from "react";
import { useFlow } from "../Controllers/FlowAndSelectedOptionContext";
import AlbumTemplateBirthday from './AlbumTemplateBirthday'
import AlbumTemplateLove from "./AlbumTemplateLove";
import { FLOW_PROCESED, OPTION_ALBUM, 
    TEMPLATE_BIRTHDAY, TEMPLATE_LOVE } from "../Controllers/Properties";
import { changeToBirthdayTemplate, changeToLoveTemplate } from "../Controllers/Actions";

export default function AlbumTemplate({ children }) {
    const { state, dispatch } = useFlow();
    const { template, flow, selectedOption } = state;
    const isBirthdayTemplate = template === TEMPLATE_BIRTHDAY;
    const isLoveTemplate = template === TEMPLATE_LOVE;
    const isProcessedFlow = flow === FLOW_PROCESED;
    const isAlbumSelected = selectedOption === OPTION_ALBUM;

    const changeTemplateHandler = (option) => {
        switch (option) {
            case TEMPLATE_BIRTHDAY:
                return dispatch(changeToBirthdayTemplate());
            case TEMPLATE_LOVE:
                return dispatch(changeToLoveTemplate())
            default:
                return dispatch(changeToBirthdayTemplate());

        }
    };

    return (
        <div className="d-flex flex-column w-100">
            {(!isProcessedFlow && isAlbumSelected) ? (
                <div className="d-flex flex-row mx-3">
                    <p className="me-1">Elija su template</p>
                    <div className="me-2">
                        <input type="radio"
                            id="inlineRadio1"
                            value={TEMPLATE_BIRTHDAY}
                            checked={isBirthdayTemplate}
                            onChange={() => changeTemplateHandler(TEMPLATE_BIRTHDAY)} 
                            />
                        <label htmlFor="inlineRadio1">Birthday</label>
                    </div>
                    <div className="me-2">
                        <input type="radio"
                            id="inlineRadio2"
                            value={TEMPLATE_LOVE}
                            checked={isLoveTemplate}
                            onChange={() => changeTemplateHandler(TEMPLATE_LOVE)} />
                        <label className="form-check-label" htmlFor="inlineRadio2">Love</label>
                    </div>
                </div>
            ) : ""}
            <>
                {isBirthdayTemplate && <AlbumTemplateBirthday>{children}</AlbumTemplateBirthday>}
                {isLoveTemplate && <AlbumTemplateLove>{children}</AlbumTemplateLove>}
            </>
        </div>
    )

}
