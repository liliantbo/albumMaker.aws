import React from 'react';
import { ReactComponent as AlbumIcon } from './change-record-type.svg'
import { ReactComponent as BillIcon } from './identity.svg'
import { ReactComponent as ResumeIcon } from './finished.svg'

import { useFlow } from '../Controllers/FlowAndSelectedOptionContext';
import { goToAlbum, goToBill, goToResume } from '../Controllers/Actions';
import { OPTION_ALBUM, OPTION_BILL, OPTION_RESUME } from '../Controllers/Properties'

export default function SideBar({ children }) {

  const { state, dispatch } = useFlow();
  const { selectedOption } = state;
  const isAlbumSelected = selectedOption === OPTION_ALBUM;
  const isBillSelected = selectedOption === OPTION_BILL;
  const isResumeSelected = selectedOption === OPTION_RESUME;

  const goToAlbumHandler = () => {
    dispatch(goToAlbum());
  };

  const goToBillHandler = () => {
    dispatch(goToBill());
  };

  const goToResumeHandler = () => {
    dispatch(goToResume());
  };

  return (
    <>
      <aside>
        <ul className="nav flex-column d-flex justify-content-center bg-dark h-100">
          <li className="nav-item">
            <button
              className={`btn btn-dark btn-focus shadow-none ${isAlbumSelected ? 'bg-secondary' : ''}`}
              onClick={goToAlbumHandler}
            >
              <AlbumIcon className="icon" aria-hidden="true" />
              <span className="ms-2">Album</span>
            </button>

          </li>
          <li className="nav-item">
            <button
              className={`btn btn-dark btn-focus shadow-none  ${isBillSelected ? 'bg-secondary' : 'bg-dark'}`}
              href="#"
              onClick={goToBillHandler}
            >
              <BillIcon style={{ width: '52px', height: '52px' }} aria-hidden="true" />
              <span className="ms-2">Datos</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn btn-dark btn-focus shadow-none ${isResumeSelected ? 'bg-secondary' : 'bg-dark'}`}
              href="#"
              onClick={goToResumeHandler}
            >
              <ResumeIcon style={{ width: '52px', height: '52px' }} aria-hidden="true" />
              <span className="ms-2">Pedido</span>
            </button>
          </li>
        </ul>
      </aside>
      {children}
    </>
  );
}
