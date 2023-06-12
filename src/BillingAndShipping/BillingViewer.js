import { useContext } from "react";

import { useFlow } from '../Controllers/FlowAndSelectedOptionContext';
import { BillingContext, ShippingContext } from "./BillingAndShippingContext";
import {OPTION_BILL, THEME_DARK} from '../Controllers/Properties'

export default function BillingViewer() {
    const { billing } = useContext(BillingContext)
    const { shipping } = useContext(ShippingContext)
    const {state}=useFlow();
    const {selectedOption, theme}=state;
    const isBillSelected=selectedOption === OPTION_BILL;
    const isDarkTheme=theme===THEME_DARK;


    return (
        <div className="d-flex justify-content-center align-items-center">
          <div className={`d-flex ${isBillSelected? "flex-row" : "flex-column" }`}>
            <div>
              <div className={`card my-1 mx-1 text-start ${isDarkTheme?"text-white bg-dark":"text-dark bg-light"}`}>
                <div className="card-header">
                  <h3 className="card-title">Datos de Facturación</h3>
                </div>
                <div className="card-body">
                  <p class="card-text">Nombre: {billing.name} {billing.lastName}</p>
                  <p class="card-text">CI/RUC: {billing.identificationNumber}</p>
                  <p class="card-text">Teléfono: {billing.telephone}</p>
                  <p class="card-text">Dirección: {billing.province} 
                  {billing.city}-{billing.address}</p>
                </div>
              </div>
            </div>
            <div>
              <div className={`card my-1 mx-1 text-start ${isDarkTheme?"text-white bg-dark":"text-dark bg-light"}`}>
                <div className="card-header">
                  <h3 className="card-title">Datos de Envío</h3>
                </div>
                <div className="card-body">
                  <p class="card-text">Nombre: {shipping.name} {shipping.lastName}</p>
                  <p class="card-text">CI/RUC: {shipping.identificationNumber}</p>
                  <p class="card-text">Teléfono: {shipping.telephone}</p>
                  <p class="card-text">Dirección: {shipping.province} 
                  {shipping.city}-{shipping.address}</p>                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
