import React from 'react';

import { useFlow } from '../Controllers/FlowAndSelectedOptionContext';
import {
    OPTION_ALBUM, OPTION_BILL,
    OPTION_RESUME, OPTION_CREATE,
    FLOW_PROCESED,
    FLOW_SAVED
} from '../Controllers/Properties'

//componente de barra de progreso
import ProgressBar from "../ProgressBar"

//compontentes de Album
import AlbumEditor from '../Album/AlbumEditor';
import AlbumViewer from '../Album/AlbumViewer';

//coponentes de Facturacion
import BillingAndShipping from '../BillingAndShipping/BillingAndShipping';
import BillingViewer from '../BillingAndShipping/BillingViewer';

//componentes de Pedido
import OrderResume from '../Resume/OrderResume';

export default function Main() {

    const { state } = useFlow();
    const { selectedOption, flow} = state;
    const isProcessedFlow = flow === FLOW_PROCESED || flow === FLOW_SAVED;

    //renderizar de acuerdo al estado del flujo 
    //y a la opcion del menu donde se encuentra el usuario
    const renderContent = () => {
        switch (selectedOption) {
            case OPTION_ALBUM:
                return isProcessedFlow ? <AlbumViewer /> : <AlbumEditor />;
            case OPTION_BILL:
                return isProcessedFlow ? <BillingViewer /> : <BillingAndShipping />;
            case OPTION_RESUME:
                return <OrderResume />;
            case OPTION_CREATE:
                return <AlbumEditor />;
            default:
                return null;
        }
    };

    return (
        <>
            <main className="w-100 scrollable-div pb-1">
                {!isProcessedFlow && <ProgressBar />}
                {renderContent()}
            </main>
        </>
    );
}
