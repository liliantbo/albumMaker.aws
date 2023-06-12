import { useContext, useState } from "react";
import { BillingContext, ShippingContext } from "./BillingAndShippingContext";
import provinciasCantones from "../Controllers/provincias.json"
export default function BillingForm() {
  const { billing, setBilling } = useContext(BillingContext)
  const { shipping, setShipping } = useContext(ShippingContext)
  const [isChecked, setIsChecked] = useState(false);
  const provinciasData = provinciasCantones;
  const cantonesKeys = Object.keys(provinciasData[9].cantones);

  function handleChange(evt) {
    const { target } = evt;
    const { id, value } = target;
    const newBilling = {
      ...billing,
      [id]: value,
    };
    setBilling(newBilling);
    if (isChecked) {
      let newShipping = { ...billing };
      newShipping.copyFromBilling = value;
      setShipping(newShipping);
    }

  }

  function handleChangeShipping(evt) {
    const { target } = evt;
    const { name, value } = target;
    let newShipping = null;
    let newIsChecked = isChecked;
    if (name === "copyFromBilling") {
      newIsChecked = !isChecked
      setIsChecked(newIsChecked)
    }
    if (newIsChecked) {
      newShipping = { ...billing };
      newShipping.copyFromBilling = value;
    } else {
      newShipping = {
        ...shipping,
        [name]: value,
      };
    }
    setShipping(newShipping);
  }
  const isRequired = true;

  return (
    <>
      <div className="d-flex flex-column mt-2">
        <div className="col-12">
          <p><strong>Datos de facturación</strong></p>
        </div>
        <div className="d-flex flex-wrap justify-content-between col-12">
          <div className="pe-2">
            <label htmlFor="name">*Nombre:</label>
            <input className="w-100 form-control"
              type="text"
              id="name"
              value={billing.name}
              onChange={handleChange}
              required={isRequired}
              autoFocus={true}
            />
          </div>
          <div className="pe-2">
            <label htmlFor="identificationNumber">*CI/RUC:</label>
            <input className="w-100 form-control"
              type="text"
              id="identificationNumber"
              value={billing.identificationNumber}
              onChange={handleChange}
              required={isRequired}
            />
          </div>
          <div className="pe-2">
            <label htmlFor="telephone">*Teléfono:</label>
            <input className="w-100 form-control"
              type="text"
              id="telephone"
              value={billing.telephone}
              onChange={handleChange}
              required={isRequired}
            />
          </div>
          <div className="pe-2">
            <label htmlFor="city">*Ciudad:</label>
            <input className="w-100 form-control"
              list="cityListOptions"
              id="city"
              value={billing.city}
              onChange={handleChange}
              required={isRequired}
              placeholder="Escriba para buscar..."
            />
            <datalist id="cityListOptions">
              {cantonesKeys.map((cantonKey) => {
                const provincia = provinciasData[9];
                const canton = provincia.cantones[cantonKey];
                return (
                  <option key={cantonKey} value={canton.canton}>
                    {canton.canton}
                  </option>
                );
              })}
            </datalist>
          </div>
        </div>
        <div className="col-12">
          <div className="pe-2">
            <label htmlFor="address">*Dirección:</label>
            <textarea className="w-100 form-control"
              id="address"
              value={billing.address}
              onChange={handleChange}
              required={isRequired}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column mt-2">
        <div className="col-12">
          <p><strong>Datos de Envío</strong></p>
        </div>
        <div className="col-12">
          <div className="align-self-start d-flex flex-row justify-content-start">
            <input className="me-1"
              type="checkbox"
              id="copyFromBilling"
              name="copyFromBilling"
              value={shipping.copyFromBilling}
              onChange={handleChangeShipping}
            />
            <label htmlFor="copyFromBilling">Usar los mismos datos de facturación</label>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-between col-12">
          <div className="pe-2">
            <label className="form-label m-0" htmlFor="nameS">*Nombres:</label>
            <input
              type="text"
              id="nameS"
              name="name"
              value={shipping.name}
              onChange={handleChangeShipping}
              disabled={isChecked}
              readOnly={isChecked}
              className="w-100 form-control"
              required={isRequired}
            />
          </div>
          <div className="pe-2">
            <label htmlFor="identificationNumberS">CI/RUC:</label>
            <input
              type="text"
              id="identificationNumberS"
              name="identificationNumber"
              value={shipping.identificationNumber}
              onChange={handleChangeShipping}
              disabled={isChecked}
              readOnly={isChecked}
              className="w-100 form-control"
            />
          </div>
          <div className="pe-2">
            <label htmlFor="telephoneS">*Teléfono:</label>
            <input
              type="text"
              id="telephoneS"
              name="telephone"
              value={shipping.telephone}
              onChange={handleChangeShipping}
              disabled={isChecked}
              readOnly={isChecked}
              className="w-100 form-control"
              required={isRequired}
            />
          </div>
          <div className="pe-2">
            <label htmlFor="city">*Ciudad:</label>
            <input
              list="cityListOptions"
              id="cityS"
              name="city"
              value={shipping.city}
              onChange={handleChangeShipping}
              disabled={isChecked}
              readOnly={isChecked}
              className="w-100 form-control"
              required={isRequired}
              placeholder="Escriba para buscar..."
            />
            <datalist id="cityListOptions">
              {cantonesKeys.map((cantonKey) => {
                const provincia = provinciasData[9];
                const canton = provincia.cantones[cantonKey];
                return (
                  <option key={cantonKey} value={canton.canton}>
                    {canton.canton}
                  </option>
                );
              })}
            </datalist>
          </div>
        </div>
        <div className="col-12">
          <div>
            <label htmlFor="addressS">*Dirección:</label>
            <textarea
              id="addressS"
              name="address"
              value={shipping.address}
              onChange={handleChangeShipping}
              disabled={isChecked}
              readOnly={isChecked}
              className="w-100 form-control"
              required={isRequired}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}
