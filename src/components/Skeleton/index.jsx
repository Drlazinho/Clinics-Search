import React from 'react';
import styled, { keyframes } from 'styled-components';

const KeyFrameLoading = keyframes`
    0% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
`;

const LoadingSkeleton = styled.div`
    background-color: gray;
    border-radius: 6px;
    margin-bottom: 10px;
    min-widht: ${(props) => props.widht};
    height: ${(props) => props.height};
    animation: ${KeyFrameLoading} 500 ms infinite alternate;
`;

export default ({ widht, height}) => <LoadingSkeleton widht={widht} height={height} />;