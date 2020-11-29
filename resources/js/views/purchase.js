import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from "react-multi-carousel";
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

const StyledPurchase = styled.div`
    margin: auto;
    width: 75%;
    @media(max-width: 700px){
        width: 90%;
    }
`;

const StyledAddress = styled.div`
    display: flex;
    width: 100%;
    @media (max-width: 700px){
        flex-direction: column;
    }
`;

const StyledAddressLabel = styled.h5`
    margin-top: 3px;
    color: white; 
    float:right; 
    margin-right: 20px;
    @media (max-width: 700px){
        float: left;
        margin-left: 10px;
    }
`;

const StyledAddressInput = styled.input`
    margin-top: 3px;
    width: 90%;
    @media(max-width: 700px){
        margin-left: 10px;
    }
`;

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 280,
    },
  });

const Purchase = () => {
    const [userEmail, setUserEmail] = useState('');
    const [purchases, setPurchases] = useState([]);
    const [images, setImages] = useState([]);

    const classes = useStyles();
    useEffect(() => {
        const email = document.querySelector('#purchase').dataset.email;
        fetchData(email);
    }, []);

    const fetchData = async (email) => {
        const data = await fetch(
            `http://127.0.0.1:8000/api/purchase/${email}`
        )

        const purchaseData = await data.json();
        if(purchaseData){
            setUserEmail(email);
            setPurchases(purchaseData);
            setImages(purchaseData.image)
            console.log(purchaseData);
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
        <div style={{ marginTop: '20px' }}>
            <StyledPurchase>
            <h2 style={{ textDecoration: 'underline' }}>My Purchase : 
                {
                    purchase !== [] &&
                    purchase.length || ''
                }
                </h2>
                {
                    purchases.map((purchase, key) => {
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
                                                purchase.image.map((img, k) => {
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
                                                <h3 style={{ marginLeft: '50px'}}>{ purchase.name}</h3>
                                            </Grid>
                                        </Grid>
                                            <hr></hr>
                                        <Grid container>
                                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                                <div style={{ marginLeft: '20px'}}><StyledText>Quantity</StyledText></div>
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}>
                                                <h3 style={{ marginLeft: '50px'}}>{ purchase.quantity }</h3>
                                            </Grid>
                                        </Grid>
                                        <hr></hr>
                                        <Grid container>
                                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                                <div style={{ marginLeft: '20px'}}><StyledText>Total Price</StyledText></div>
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}>
                                                <h3 style={{ marginLeft: '50px'}}>{currencyFormatter(purchase.price)}</h3>
                                            </Grid>
                                        </Grid>
                                        <hr></hr>
                                        <Grid container>
                                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                                <div style={{ marginLeft: '20px'}}><StyledText>Status</StyledText></div>
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}>
                                                    {
                                                        purchase.status === 0 &&
                                                        <h5 style={{ marginLeft: '50px'}}><span>Not Commit Yet </span>
                                                        <br></br>
                                                        <span style={{opacity: 0.2}}> Commited </span>
                                                        <br></br>
                                                        <span style={{opacity: 0.2}}> Delivered by Admin</span>
                                                        </h5>
                                                    }
                                                    {
                                                        purchase.status === 1 &&
                                                        <h5 style={{ marginLeft: '50px'}}>
                                                        <span style={{opacity: 0.2}}>Not Commit Yet </span>
                                                        <br></br>
                                                        <span > Commited </span>
                                                        <br></br>
                                                        <span style={{opacity: 0.2}}> Delivered by Admin</span>
                                                        </h5>
                                                    }

                                                    {
                                                        purchase.status === 2 &&
                                                        <h5 style={{ marginLeft: '50px'}}>
                                                        <span style={{opacity: 0.2}}>Not Commit Yet </span>
                                                        <br></br>
                                                        <span style={{opacity: 0.2}}> Commited </span>
                                                        <br></br>
                                                        <span > Delivered by Admin</span>
                                                        </h5>
                                                    }
                                            </Grid>
                                        </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div style={{ backgroundColor: ' #17172b', padding: '2px' }}>
                                    <Grid column container>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <StyledAddress>
                                                    <div style={{ flexGrow: 1 }}>
                                                        <StyledAddressLabel>Your Address : </StyledAddressLabel>
                                                    </div>
                                                    <div style={{ flexGrow: 2 }}>
                                                        <StyledAddressInput type="text" />
                                                    </div>
                                            </StyledAddress>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    d
                                        </Grid>
                                    </Grid>
                                </div>
                            </Card>
                            </div>
                        )
                    })
                }
            </StyledPurchase>
        </div>
    )
}


if (document.getElementById('purchase')) {
    ReactDOM.render(<Purchase />, document.getElementById('purchase'));      
}