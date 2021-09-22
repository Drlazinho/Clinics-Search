import React, { useState } from 'react';
import TextField, { Input } from '@material/react-text-field';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.svg';
import clinica from '../../assets/clinica.jpg';
import { Carousel, CarouselTitle, Container, Search, Wrapper, ModalTitle, ModalContent } from './styles';
import MaterialIcon from '@material/react-material-icon';
import { Card, ClinicCard, Modal, Map, Loader, Skeleton } from '../../components'

const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const { clinics, clinicSelected } = useSelector((state) => state.clinics)

    const settings = {
        dots: false,
        infinite: true,
        speed: 400,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true
    };

    function handleKeyPress(e) {
        if (e.key === 'Enter'){
            setQuery(inputValue);
        }
    }

    function handleOpenModal(placeId) {
        setPlaceId(placeId);
        setModalOpened(true);
    }

    return (
        <Wrapper>
            <Container>
                <Search>
                    <img src={logo} alt="Logo da clinica" />
                    <TextField
                    label='Pesquisar clínicar'
                    outlined
                    trailingIcon={<MaterialIcon role="button" icon="search"/>}>
                        <Input 
                        value={inputValue} 
                        onKeyPress={handleKeyPress} 
                        onChange={(e) => setInputValue(e.target.value)} />
                    </TextField>
                    {clinics.length > 0 ? (
                        <>
                            <CarouselTitle>Perto da sua casa</CarouselTitle>
                            <Carousel {...settings}>
                                {clinics.map((clinic) => (
                                    <Card 
                                    key={clinic.place_id}
                                    photo={clinic.photos ? clinic.photos[0].getUrl() : clinica}
                                    title={clinic.name}
                                    />
                                ))}
                            </Carousel>

                        </>

                    ) : ( <Loader/> )}

                </Search>
                {clinics.map((clinic) => (
                    <ClinicCard 
                    onClick={() => handleOpenModal(clinic.place_id)} 
                    clinic={clinic} />
                ))}
            </Container>
            <Map query={query} placeId={placeId}/> 
            <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
                {clinicSelected ? (
                    <>
                        <ModalTitle>{clinicSelected?.name}</ModalTitle>
                        <ModalContent>{clinicSelected?.formatted_phone_number}</ModalContent>
                        <ModalContent>{clinicSelected?.formatted_address}</ModalContent>
                        <ModalContent>{clinicSelected?.opening_hours?.open_now ? 'Aberto Agora :-)' : 'Fechado neste momento :-('}
                        </ModalContent>
                    </>
                ) : (
                    <>
                        <Skeleton width="10px" height="10px"/>
                        <Skeleton width="10px" height="10px"/>
                        <Skeleton width="10px" height="10px"/>
                        <Skeleton width="10px" height="10px"/>
                    </>
                )}
            </Modal>          
        </Wrapper>

    )
}

export default Home;