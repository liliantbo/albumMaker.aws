import React from 'react';
import { ReactComponent as CreateNewAlbumIcon } from './document-new.svg'
import { ReactComponent as ToogleThemeIcon } from './theme-light-dark.svg'
import './App.css';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useFlow } from './Controllers/FlowAndSelectedOptionContext';
import { newAlbum, changeTheme } from './Controllers/Actions';

import AlbumFooter from './AlbumFooter';
import AlbumBody from './AlbumBody/BodyOptions';
import BodyMain from './AlbumBody/BodyMain';

export default function AlbumMaker() {
  const { state, dispatch } = useFlow();
  const { theme } = state;

  const newAlbumHandler = () => {
    dispatch(newAlbum());
  };
  const changeThemeHandler = () => {
    dispatch(changeTheme());
  };

  const newAlbumTooltip = (
    <Tooltip id="newAlbumTooltip">Nuevo Album</Tooltip>
  );

  const changeThemeTooltip = (
    <Tooltip id="changeThemeTooltip">Cambiar tema</Tooltip>
  );

  return (
    <div className={`App ${theme}`}>
      <header className="d-flex flex-row bg-primary bd-highlight mb-3" style={{ height: '10vh' }}>
        <div className="me-auto p-2 bd-highlight">
          <p className="logo text-light">Album Maker</p>
        </div>
        <ul className="nav flex-row d-flex p-2 bd-highlight 
        justify-content-end align-items-stretch">
          <li className="nav-item me-3">
            <OverlayTrigger placement="bottom" overlay={newAlbumTooltip}>
              <button className="btn btn-primary btn-focus shadow-none"
                onClick={newAlbumHandler}>
                <CreateNewAlbumIcon aria-hidden="true" />
              </button>
            </OverlayTrigger>
          </li>
          <li className="nav-item me-3">
            <OverlayTrigger placement="bottom" overlay={changeThemeTooltip}>
              <button className="btn btn-primary btn-focus shadow-none"
                onClick={changeThemeHandler}>
                <ToogleThemeIcon aria-hidden="true" />
              </button>
            </OverlayTrigger>
          </li>
        </ul>
      </header >
      <div className="d-flex flex-row " style={{ height: '80vh' }}>
        <AlbumBody>
          <BodyMain />
        </AlbumBody>
      </div>
      <AlbumFooter />
    </div >
  );
}
