import React, { useState, useEffect } from 'react';
import {currencyFormatter} from '../../utils/currency';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from "react-router-dom";

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

function ShoppingCart({ children, stock, quantity, price, userId, productId, userAccessToken }) {
    const [quan, setQuantity] = useState(1);
    const [pric, setPrice] = useState(null);
    const [click, setClick] = useState(false);

    const history = useHistory();

    useEffect(() => {
        setQuantity(quantity);
        setPrice(price)
    })

    const handleOnClick = () => {
        setClick(true);
        let formData = new FormData();
        formData.append('user_id', userId);
        formData.append('product_id', productId);
        formData.append('quantity', quantity);
        formData.append('stock', stock - quantity);

        fetch('/api/shopping_cart/',
            {
                body: formData,
                method: "post",
                headers: {
                    'Authorization' : 'Bearer '+ userAccessToken
                }
            })
            .then(res => {
                setClick(false);
                history.push('/my_shopping_cart');
            })
    }

    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                    {
                        click === true &&
                        <LinearProgress />
                    }
                <StyledChart>{ currencyFormatter(pric*quan)}   
                
                    {
                        pric*quan !== 0 &&
                        <span onClick={handleOnClick} style={{ textDecoration: 'none', color: 'gray', cursor: 'pointer' }}>| Add to Cart <ShoppingCartIcon /></span> 
                    }

                </StyledChart>
            </div>
        </div>
    )
}

export default ShoppingCart