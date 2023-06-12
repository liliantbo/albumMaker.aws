import React from 'react';
import BillingViewer from '../BillingAndShipping/BillingViewer';
import AlbumViewer from '../Album/AlbumViewer';
import ProcessCompleteMessage from './ProcessCompleteMessage';
//Contextos:
//para el control del estadoflujo (new, onBilling, onProcess, Proccessed)
//y para la opcion del menu donde se encuentra el usuario (album, bill, resume)
import { useFlow } from "../Controllers/FlowAndSelectedOptionContext";
import { processComplete } from '../Controllers/Actions';
import { FLOW_PROCESED } from '../Controllers/Properties';

export default function OrderResume() {

  //Uso de Contextos
  //contexto para el dispatch
  const { state, dispatch } = useFlow();
  const { flow } = state;
  const isProcessedFlow = flow === FLOW_PROCESED;
  const handleOnClick = () => {
    dispatch(processComplete());
  };
  return (
    <div className="d-flex flex-column">
      <main className="d-flex flex-column">
        <div className="d-flex flex-row justify-content-center my-1">
          <div className="w-50">
          <AlbumViewer />
          </div>
          <div className="w-50">
          <BillingViewer />
          </div>
        </div>
        {isProcessedFlow ?
          <ProcessCompleteMessage /> : (
            <div className="row">
              <button type="button" className="m-3 p3 
                  btn btn-primary w-25 mx-auto align-bottom scroll-to-top"
                onClick={() => handleOnClick()}>Finalizar Pedido</button>
            </div>
          )}
      </main>
    </div>
  );
}