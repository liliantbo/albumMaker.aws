import React, { createContext, useReducer, useContext } from 'react';
import { FlowAndSelectedOptionReducer } from './FlowAndSelectedOptionReducer';
import { FLOW_NEW, OPTION_ALBUM, TEMPLATE_BIRTHDAY, THEME_LIGHT } from './Properties';

export const FlowContext = createContext();

const initialState = {
  flow: FLOW_NEW,
  selectedOption: OPTION_ALBUM,
  theme: THEME_LIGHT,
  template:TEMPLATE_BIRTHDAY,
  billing:{
    "name": '',
    "lastName": '',
    "identificationNumber": '',
    "telephone": '',
    "province": '',
    "city": '',
    "address": ''
  },
  shipping:{
    "copyFromBilling": false,
    "name": '',
    "lastName": '',
    "identificationNumber": '',
    "telephone": '',
    "province": '',
    "city": '',
    "address": ''
},
imageList:[null, null, null, null, null, null]
};

export default function FlowAndSelectedOptionContext({ children }) {
  const [state, dispatch] = useReducer(FlowAndSelectedOptionReducer, initialState);
  console.log("Context :: Flow :: "+ state.flow);
  
  return (
    <FlowContext.Provider value={{ state, dispatch }}>
          {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  return useContext(FlowContext);
}
