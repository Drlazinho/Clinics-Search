import React, { useState } from 'react'
import { Address, Clinic, ClinicInfo, ClinicPhoto, Title } from './styles'

import clinica from '../../assets/clinica.jpg'
import ReactStars from "react-rating-stars-component";

import Skeleton from '../Skeleton';


const ClinicCard = ({clinic, onClick}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return (
    <Clinic onClick={onClick}>
        <ClinicInfo>
            <Title>{clinic.name}</Title>
            <ReactStars count={5} isHalf value={clinic.rating} edit={false} activeColor="green"/>
            <Address>{clinic.vicinity || clinic.formatted_address}</Address>
        </ClinicInfo>
        <ClinicPhoto 
        imageLoaded={imageLoaded}
        src={clinic.photos ? clinic.photos[0].getUrl() : clinica}
        onLoad={() => setImageLoaded(true)} 
        alt="Foto da Clínica" 
        />
        {!imageLoaded && <Skeleton width="100px" height="100px" />}
    </Clinic>
    );    
};

export default ClinicCard;