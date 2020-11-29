import React, { useState, useEffect } from 'react';
import {currencyFormatter} from '../../utils/currency';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styled from 'styled-components'

var style = {
    backgroundColor: '#17172b',
    borderTop: "1px solid #E7E7E7",
    color: 'white',
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '30px',
  width: '100%',
}

const StyledChart = styled.span`
    font-size: 28px;
    @media(max-width : 700px){
        font-size: 20px;
    }
`;

function NotLoginYet({ children, text }) {

    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                <StyledChart><a style={{ textDecoration: 'none', color: 'gray' }} href="http://127.0.0.1:8000/login/">Login</a> to buy this</StyledChart>
            </div>
        </div>
    )
}

export default NotLoginYet;