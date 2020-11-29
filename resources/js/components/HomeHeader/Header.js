import React from 'react';
import styled from "styled-components";
import media from "styled-media-query";
import Grid from '@material-ui/core/Grid';

import Navbar from '../Navigation/navbar';
const background = 'http://127.0.0.1:8000/image/app/header.jpeg';

const StyledHeader = styled.div`
    color: white;
    background-image: url(${background});
    background-size: cover;                     
    background-repeat: no-repeat;
    height: 590px;
    box-shadow: 0 4px 2px -2px gainsboro;
    ${media.lessThan("medium")`
        background-position-x: -200px;
    `}
`;

const StyledContainer = styled.div`
    margin-top: 170px;
    display: flex;
    width: 100%;
`;



const Header = ({userName}) => {
    window.addEventListener('load', () => {
        let welcome = document.querySelector('.welcome');
        
        let subwelcome = document.querySelector('.subwelcome');
        if(document.querySelector('.welcome2')){
            let welcome2 = document.querySelector('.welcome2');
            welcome2.classList.add('showWelcome2');
        }
        welcome.classList.add('showWelcome');
        subwelcome.classList.add('showsubWelcome');
    })

    return (
        <StyledHeader>
            <span style={{ opacity: 0 }}>.</span>
            <Navbar />
            <StyledContainer>
                <Grid container>
                    <Grid item xs={5} sm={5} md={5} lg={5}>

                    </Grid>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <div className="welcome">
                            Welcome to My Shop :)
                        </div>
                        {
                            userName !== null &&
                            <div className="welcome2">
                                {userName}
                            </div>
                        }
                        <div className="subwelcome">
                            You'll get cool & stylish clothes here!
                        </div>
                    </Grid>
                </Grid>
            </StyledContainer>
        </StyledHeader>
            
    )
}

export default Header;