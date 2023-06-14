import { React } from "react";
import {useFlow} from './Controllers/FlowAndSelectedOptionContext';
import { FLOW_BILLING, FLOW_NEW, FLOW_PROCESED, 
    FLOW_PROCESS, FLOW_SAVED, OPTION_ALBUM, OPTION_BILL, 
    OPTION_RESUME } from "./Controllers/Properties";

export default function ProgressBar() {
    const { state }=useFlow();
    const {flow, selectedOption}=state;
    const isNewFlow = flow === FLOW_NEW;
    const isBillingFlow= flow === FLOW_BILLING;
    const isProcessFlow=flow === FLOW_PROCESS;
    const isProcessedFlow=flow === FLOW_PROCESED || flow === FLOW_SAVED;
    const isAlbumSelected=flow === OPTION_ALBUM;
    const isBillSelected=selectedOption===OPTION_BILL;
    const isResumeSelected=selectedOption===OPTION_RESUME;
    return (
            <div className="position-relative m-4">
                <div className="progress" style={{ height: '1px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: isNewFlow ? '0%' : (isBillingFlow ?'50%':'100%')}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <button type="button" className={`position-absolute top-0 start-0 translate-middle btn btn-sm rounded-pill ${isBillingFlow || isProcessFlow||isProcessedFlow ? 'btn-success' : (isAlbumSelected?'btn-primary':'btn-secondary')}`} style={{ width: '2rem', height: '2rem' }}>1</button>
                <button type="button" className={`position-absolute top-0 start-50 translate-middle btn btn-sm rounded-pill ${isProcessFlow || isProcessedFlow ? 'btn-success' :  (isBillSelected?'btn-primary':'btn-secondary')}`}  style={{ width: '2rem', height: '2rem' }}>2</button>
                <button type="button" className={`position-absolute top-0 start-100 translate-middle btn btn-sm rounded-pill ${isProcessedFlow ? 'btn-success' :  (isResumeSelected?'btn-primary':'btn-secondary')}`} style={{ width: '2rem', height: '2rem' }}>3</button>
            </div>
    )
}