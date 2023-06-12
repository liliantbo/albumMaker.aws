import React, { Children } from "react";
import backgroundImage from './happyBirthday.jpg';
export default function AlbumTemplateBirthday({ children }) {
    const imageArray = Children.toArray(children);
    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: `12cm`
    };
    return (
        <div className="d-flex flex-row mx-3 align-self-center 
        align-items-center col-8" style={divStyle}>
            <div className="d-flex flex-column w-50 ">
                    <div className="d-flex flex-row w-100 h-50 p-2">
                        {imageArray[0]}
                    </div>
                    <div className="d-flex flex-row w-100 h-50 px-2">
                        {imageArray[2]}
                    </div>
            </div>
            <div className="d-flex flex-column w-50 ">
                    <div className="d-flex flex-row w-100 h-50 p-2"> 
                        {imageArray[1]}
                    </div>
                    <div className="d-flex flex-row w-100 h-50 px-2">
                        {imageArray[3]}
                    </div>
            </div>

        </div>
    )
}