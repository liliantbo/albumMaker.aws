import React, { Children } from "react";
import backgroundImage from './loveBackground.jpg';
export default function AlbumTemplateLove({ children }) {
    const imageArray = Children.toArray(children);
    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: `7cm`
    };
    return (
        <div className="d-flex flex-row mx-3 align-self-center 
        align-items-center col-8" style={divStyle}>
                <div className="d-flex flex-column w-50 p-2">
                    {imageArray[0]}
                </div>
                <div className="d-flex flex-column w-50 p-2">
                    {imageArray[1]}
                </div>
        </div>
    )
}