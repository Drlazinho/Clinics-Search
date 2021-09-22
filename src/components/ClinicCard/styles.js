import styled from "styled-components";

export const Clinic = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    padding: 16px;
    background-color: #ffffff;
    border-left: 5px solid transparent;
    :hover{
        background-color: ${(props) => props.theme.colors.border};
        border-left-color: ${(props) => props.theme.colors.primary};
    };
`;

export const ClinicInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.span`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props)=> props.theme.colors.text};
    font-size: 24px;
    font-weight: bold;
    line-height: 29px;
`;

export const Address = styled.span`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props)=> props.theme.colors.text};
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 19px;
`;

export const ClinicPhoto = styled.img`
    display: ${(props) => (props.imageLoaded ? 'block' : 'none')};
    width: 100px;
    height: 100px;
    border-radius: 6px;
    object-fit: cover;
`;