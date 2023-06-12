import React, { useState, useEffect } from 'react';

import { BillingContext, ShippingContext } from "../BillingAndShipping/BillingAndShippingContext";
import { ImagesContext } from '../Album/ImagesContext';

import { useFlow } from '../Controllers/FlowAndSelectedOptionContext';
import { goToAlbum} from '../Controllers/Actions';
import {OPTION_ALBUM, OPTION_BILL,
        OPTION_RESUME, OPTION_CREATE,
        FLOW_PROCESED} from '../Controllers/Properties'

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

    const { state, dispatch }=useFlow();
    const { selectedOption, flow } = state;
    const isProcessedFlow = flow === FLOW_PROCESED;

    //control de imagenes cargadas por el usuario
    const [imageList, setImageList] = useState([null, null, null, null, null, null]);

    //control de datos de facturacion ingresados por el usuario
    const [billing, setBilling] = useState({
        "name": '',
        "lastName": '',
        "identificationNumber": '',
        "telephone": '',
        "province": '',
        "city": '',
        "address": ''
    });

    //control de datos de envio ingresados por el usuario
    const [shipping, setShipping] = useState({
        "copyFromBilling": false,
        "name": '',
        "lastName": '',
        "identificationNumber": '',
        "telephone": '',
        "province": '',
        "city": '',
        "address": ''
    });

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

    // Limpiar datos al cambiar a OPTION_CREATE
  useEffect(() => {
    if (selectedOption === OPTION_CREATE) {
      setBilling({
        name: '',
        lastName: '',
        identificationNumber: '',
        telephone: '',
        province: '',
        city: '',
        address: ''
      });
      setShipping({
        copyFromBilling: false,
        name: '',
        lastName: '',
        identificationNumber: '',
        telephone: '',
        province: '',
        city: '',
        address: ''
      });
      setImageList([null, null, null, null, null, null]);
      dispatch(goToAlbum());
    }
  }, [selectedOption, dispatch]);

    return (
        <>
            <BillingContext.Provider value={{ billing, setBilling }}>
                <ShippingContext.Provider value={{ shipping, setShipping }}>
                    <ImagesContext.Provider value={{ imageList, setImageList }}>
                        <main className="w-100 scrollable-div">
                            {!isProcessedFlow && <ProgressBar />}
                            {renderContent()}
                            </main>
                    </ImagesContext.Provider>
                </ShippingContext.Provider>
            </BillingContext.Provider>
        </>
    );
}
