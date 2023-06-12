import React, { createContext, useReducer, useContext } from 'react';
import { FlowAndSelectedOptionReducer } from './FlowAndSelectedOptionReducer';
import { FLOW_NEW, OPTION_ALBUM, TEMPLATE_BIRTHDAY, THEME_LIGHT } from './Properties';

export const FlowContext = createContext();

const initialState = {
  flow: FLOW_NEW,
  selectedOption: OPTION_ALBUM,
  theme: THEME_LIGHT,
  template:TEMPLATE_BIRTHDAY
};

export default function FlowAndSelectedOptionContext({ children }) {
  const [state, dispatch] = useReducer(FlowAndSelectedOptionReducer, initialState);
  console.log("el state dentro del context es " 
  + state + " "+ state.flow +" "+ state.selectedOption + " theme "+state.theme)

  return (
    <FlowContext.Provider value={{ state, dispatch }}>
          {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  return useContext(FlowContext);
}
