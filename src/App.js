import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import FlowAndSelectedOptionContext from './Controllers/FlowAndSelectedOptionContext';

//componentes comunes para todos
import AlbumMaker from './AlbumMaker';

function App() {

  return (
    <FlowAndSelectedOptionContext>
      <AlbumMaker/>
    </FlowAndSelectedOptionContext>
  );
}

export default App;
