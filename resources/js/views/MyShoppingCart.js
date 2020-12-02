import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from "react-multi-carousel";
import styled from "styled-components";
import CardMedia from '@material-ui/core/CardMedia';
import {currencyFormatter} from '../utils/currency';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AddIcon from '@material-ui/icons/Add';
import { Link, withRouter, useParams } from 'react-router-dom';

import AddAddress from './AddAddress'
import Navbar from '../components/Navigation/navbar';

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
      maxHeight: 250
    },
    media: {
      height: 250,
    },
  });

const MyShoppingCart = () => {
    const [carts, setCarts] = useState([]);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [userAddress, setUserAddress] = useState([]);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        let state = localStorage["appState"];
        
        let AppState = JSON.parse(state);

        setUser(AppState.user);

        axios.get(`/api/shopping_cart/${AppState.user.id}`, {
            headers: { 'Authorization' : 'Bearer '+ AppState.user.access_token}
        }).then(response => {
            const cartData = response.data;
            setCarts(cartData);
            
            if(cartData.length > 0){
                axios.get(`/api/user_address/${AppState.user.id}`)
                .then(response => {
                    setUserAddress(response.data);
                })
            }
        });

    },[]);

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
        <div>
            <Navbar />
            <div style={{ marginTop: '90px' }} >
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
                                            <hr></hr>
                                            <Grid container>
                                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                                    <div style={{ marginLeft: '20px'}}><StyledText>Total Weight</StyledText></div>
                                                </Grid>
                                                <Grid item xs={8} sm={8} md={8} lg={8}>
                                                    <h4 style={{ marginLeft: '50px'}}>{cart.weight} gram</h4>
                                                </Grid>
                                            </Grid>
                                            </div>
                                            
                                        </Grid>
                                    </Grid>
                                </Card>
                                </div>
                            )
                        })
                    }
                    <div style={{ backgroundColor: ' #17172b', padding: '2px' }}>
                        <center>
                            <h3 style={{ color: 'grey', marginTop: '10px' }}>
                                <a style={{ color: 'grey', cursor: 'pointer' }} onClick={handleOpen}><AddIcon /> Add A Destination Address</a> 
                            </h3>
                        </center>
                    </div>
                    
                    {
                        userAddress.map((list, key) => {
                            return (
                                <div key={key} style={{ marginTop: '20px'}}>
                                    <Card style={{ padding: '10px' }}>
                                        <Grid container>
                                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                                <center>-</center>
                                            </Grid>
                                            <Grid item xs={11} sm={11} md={11} lg={11}>
                                                <Grid container>
                                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <h5>
                                                    {list.address}, {list.RT_RW}
                                                    </h5>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <h5>
                                                        {list.kelurahan_desa}, {list.kecamatan}, {list.provinsi}
                                                    </h5>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <h5>
                                                        Postal Code: {list.postal_code}
                                                    </h5>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <h5>
                                                        Phone Number: {list.phone_number}
                                                    </h5>
                                                    </Grid>
                                                </Grid>
                                            
                                            
                                            
                                           
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </div>
                            )
                        })
                    }
                    <br />
                    {/* <div style={{ backgroundColor: ' #17172b', padding: '2px' }}>
                        <center>
                            <h3 style={{ color: 'grey' }}>
                                <a style={{ color: 'grey', cursor: 'pointer' }} href="#">Buy <LocalMallIcon /> </a> 
                                    or 
                                <a style={{ color: 'grey' }} href="#" > Remove</a>
                            </h3>
                        </center>
                    </div> */}
                </StyledCart>
            </div>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
            <Fade in={open}>
                <div className={classes.paper}>
                <AddAddress />
                </div>
            </Fade>
            </Modal>
        </div>
    )
}

export default withRouter(MyShoppingCart);