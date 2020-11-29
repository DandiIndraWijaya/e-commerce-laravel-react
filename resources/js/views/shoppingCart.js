import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from "react-multi-carousel";
import styled from "styled-components";
import CardMedia from '@material-ui/core/CardMedia';
import {currencyFormatter} from '../utils/currency';
import LocalMallIcon from '@material-ui/icons/LocalMall';

const StyledCarousel = styled.div`
    height: auto; 
    background: #EEE; 
    margin: 10px 10px;
    @media (max-width: 700px){
        margin: 5px 5px;
    }
`;

const StyledText = styled.span`
    font-size: 20px;
    @media(max-widh: 700px){
        font-size: 1pt;
    }
`;

const StyledCart = styled.div`
    margin: auto;
    width: 75%;
    @media(max-width: 700px){
        width: 90%;
    }
`;

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 210,
    },
  });

const ShoppingCart = () => {
    const [email, setEmail] = useState('');
    const [carts, setCarts] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        const userEmail = document.querySelector('#shopping_cart').dataset.email;
        fetchData(userEmail);
    },[]);

    const fetchData = async (userEmail) => {
        console.log(userEmail)
        const data = await fetch(
            `http://127.0.0.1:8000/api/shopping_cart/${userEmail}`
        )

        const dataCart = await data.json();
        if(dataCart){
            setCarts(dataCart);
            setEmail(userEmail);
            
        }
    }


    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <div style={{ marginTop: '20px' }} >
            <StyledCart>
                <h2 style={{ textDecoration: 'underline' }}>My Shopping : 
                {
                    carts !== [] &&
                    carts.length || ''
                }
                </h2>
                {
                    carts.map((cart, key) => {
                        return(
                            <div key={key} style={{ marginTop: '20px' }}>
                                <Card >
                                <Grid container >
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <Carousel 
                                            responsive={responsive}
                                            itemClass="carousel-item-padding-10-px"
                                        >
                                            {
                                                cart.image.map((img, k) => {
                                                    return (
                                                        <StyledCarousel key={k}>
                                                            <CardMedia
                                                                className={classes.media}
                                                                image={img}
                                                            />
                                                        </StyledCarousel>
                                                    )
                                                })
                                            }
                                            
                                        </Carousel>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <div style={{ marginTop: '10px' }}>
                                            <Grid container>
                                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                                <div style={{ marginLeft: '20px'}}><StyledText>Name</StyledText></div>
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}>
                                                <h3 style={{ marginLeft: '50px'}}>{cart.name}</h3>
                                            </Grid>
                                        </Grid>
                                            <hr></hr>
                                        <Grid container>
                                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                                <div style={{ marginLeft: '20px'}}><StyledText>Quantity</StyledText></div>
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}>
                                                <h4 style={{ marginLeft: '50px'}}>{cart.quantity}</h4>
                                            </Grid>
                                        </Grid>
                                        <hr></hr>
                                        <Grid container>
                                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                                <div style={{ marginLeft: '20px'}}><StyledText>Total Price</StyledText></div>
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}>
                                                <h4 style={{ marginLeft: '50px'}}>{currencyFormatter(cart.price * cart.quantity)}</h4>
                                            </Grid>
                                        </Grid>
                                        </div>
                                        
                                    </Grid>
                                </Grid>
                                <div style={{ backgroundColor: ' #17172b', padding: '2px' }}>
                                    <center>
                                        <h3 style={{ color: 'grey' }}>
                                            <a style={{ color: 'grey', cursor: 'pointer' }} href={`http://127.0.0.1:8000/purchase/${cart.cart_id}/price/${cart.price * cart.quantity}`}>Buy <LocalMallIcon /> </a> 
                                            or 
                                            <a style={{ color: 'grey' }} href={`http://127.0.0.1:8000/my_shopping_cart/delete/${cart.cart_id}`} > Remove</a>
                                        </h3>
                                    </center>
                                </div>
                            </Card>
                            </div>
                        )
                    })
                }
            </StyledCart>
        </div>
    )
}

export default ShoppingCart;