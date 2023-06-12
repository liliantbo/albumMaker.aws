import { useFlow } from "../Controllers/FlowAndSelectedOptionContext";
import { billingComplete } from '../Controllers/Actions';

import BillingAndShippingForm from './BillingForm';
import { FLOW_BILLING } from "../Controllers/Properties";

export default function BillingAndShipping() {
  const { state, dispatch } = useFlow();
  const {flow}=state;
  const isBillingFlow=flow===FLOW_BILLING;

  const handleSubmit = (e) => {
    dispatch(billingComplete());
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="d-flex justify-content-center my-2">
        <div className="col-10">
          <form onSubmit={handleSubmit}>
            <BillingAndShippingForm />
            <div className="row">
              <button type="submit" className={`m-3 p3 
                btn w-25 mx-auto align-bottom ${isBillingFlow?"btn-primary":"btn-secondary"}`}
                disabled={!isBillingFlow}
              >Resumen del Pedido</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
