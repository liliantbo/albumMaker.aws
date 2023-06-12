import { React, useContext, useRef} from "react";

import { useFlow } from "../Controllers/FlowAndSelectedOptionContext";
import { ImagesContext } from './ImagesContext';
import { albumComplete } from '../Controllers/Actions';

import AlbumTemplate from './AlbumTemplate';

export default function AlbumEditor() {
    const { dispatch } = useFlow();
    const { imageList, setImageList } = useContext(ImagesContext);

    const albumCompleteHandler = () => {
        dispatch(albumComplete());
    };

    //Control de carga y control de posicion de imagenes
    let dragItem = useRef();
    let dragOverItem = useRef();

    const dragStart = (e, index) => {
        dragItem.current = index;
    };

    const dragEnter = (e, index) => {
        dragOverItem.current = index;
        e.preventDefault();
    };

    const drop = (e, index) => {
        let nuevaLista = [...imageList];
        if (dragItem.current !== undefined && dragItem.current !== null &&
            dragOverItem.current !== undefined && dragOverItem.current !== null) {
            const itemArrastrado = nuevaLista[dragItem.current];
            nuevaLista[dragItem.current] = nuevaLista[dragOverItem.current];
            nuevaLista[dragOverItem.current] = itemArrastrado
            setImageList(nuevaLista);
        } else {
            const file = e.dataTransfer.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    nuevaLista[index] = reader.result;
                    setImageList(nuevaLista);
                };
                reader.readAsDataURL(file);
            }
        }
        dragItem.current = null;
        dragOverItem.current = null;
        e.preventDefault();
    };

     //la renderizacion de las imagenes depende del template que estemos utilizando
    //Este proyecto actualmente consta de solo un template para album
    //y las imagenes se envian a dicho template como children
    return (
        <div className="d-flex flex-column wm-50">
            <AlbumTemplate>
                {
                    imageList.map((item, index) => {
                        return (
                            <div
                                className="d-flex align-items-center justify-content-center 
                                    border border-dark rounded d-inline-block w-100"
                                style={{ height: '5cm' }}
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)}
                                onDragEnd={(e) => drop(e, index)}
                                key={index}
                                onDragOver={(e) => dragEnter(e, index)}
                                onDrop={(e) => drop(e, index)}
                                draggable
                            >
                                {item? (
                                    <img src={item} alt="Uploaded" className="img-fluid h-100"/>
                                ) : (
                                    <div className="text-center">
                                        <i className="bi bi-cloud-arrow-up-fill fs-1"></i>
                                        <p className="mt-2">Arrastra y suelta imagen aqui</p>
                                    </div>
                                )}
                            </div>
                        )
                    })

                }
            </AlbumTemplate>
            <div className="row">
                <button type="button" className="m-3 p3 
                btn btn-primary w-25 mx-auto align-bottom"
                    onClick={albumCompleteHandler}>Continuar</button>
            </div>
        </div>
    );
};