import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    font-weight: bold;
    @media only screen and (max-width: 768px){
        font-size: 20vw;
    }
    @media only screen and (max-width: 1200px){
        font-size: 4vw;
    }
    color:black;
    text-decoration: underline;
`;

const SubHeader = styled.div`
    font-size:3vw;
    color: blue;
    text-decoration: underline;

`;

// /* Extra small devices (phones, 600px and down) */
// @media only screen and (max-width: 600px) {...}

// /* Small devices (portrait tablets and large phones, 600px and up) */
// @media only screen and (min-width: 600px) {...}

// /* Medium devices (landscape tablets, 768px and up) */
// @media only screen and (min-width: 768px) {...}

// /* Large devices (laptops/desktops, 992px and up) */
// @media only screen and (min-width: 992px) {...}

// /* Extra large devices (large laptops and desktops, 1200px and up) */
// @media only screen and (min-width: 1200px) {...}

export {Header, SubHeader} 