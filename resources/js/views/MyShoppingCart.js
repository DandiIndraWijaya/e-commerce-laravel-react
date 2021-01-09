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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import AddIcon from '@material-ui/icons/Add';
import { Link, withRouter, useParams } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import AddAddress from './AddAddress';
import Pay from './Pay';
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

const SetyledAddress  = styled.div`
    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
`;

const StyledDelete = styled.div`
    color: red;
    &:hover{
        cursor: pointer;
    }
`;

const StyledCourier = styled.div`

    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
`;

const StyledTotal = styled.div`
    color: #17172b;
    margin-top: 20px;
`;

const useStyles = makeStyles(theme =>({
    root: {
      maxWidth: 345,
      maxHeight: 250
    },
    media: {
      height: 250,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

const MyShoppingCart = () => {
    const [carts, setCarts] = useState([]);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [openPay, setOpenPay] = useState(false);
    const [userAddress, setUserAddress] = useState([]);
    const [addressId, setAddressId] = useState(0);
    const classes = useStyles();
    const [courier, setCourier] = useState('jne');
    const [weight, setWeight] = useState(0);
    const [cityId, setCityId] = useState(0);
    const [costs, setCosts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [courierSelected, setCourierSelected] = useState('');
    const [courierPrice, setCourierPrice] = useState(0);

    const handleChange = (event) => {

        setCourier(event.target.value);
        axios.post(`/api/check_ongkir`, {
            headers: { 'Authorization' : 'Bearer '+ user.access_token},
            city_destination: cityId,
            courier: event.target.value,
            weight: weight
        })
        .then(response => {
            console.log(response.data[0].costs);
            let totalPriceData = 0;
            carts.map(data => {
                totalPriceData += data.price * data.quantity;
            })
            
            setTotalPrice(totalPriceData);
            setCosts(response.data[0].costs);
        })
    };

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenPay = () => {
        setOpenPay(true)
    }

    const handleClosePay = () => {
        setOpenPay(false);
    }

    const handleOnCheck = () => {
        axios.post(`/api/check_ongkir`, {
            headers: { 'Authorization' : 'Bearer '+ user.access_token},
            city_destination: cityId,
            courier: courier,
            weight: weight
        })
        .then(response => {
            
            console.log(response.data)
        })
    }

    function deleteItem(e){
        console.log(carts)
        console.log(e);
    }

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

            let weightData = 0;
            let totalPriceData = 0;
            cartData.map(data => {
                weightData += data.weight;
                totalPriceData += data.price * data.quantity;
            })

            setTotalPrice(totalPriceData)
            setWeight(weightData);

            if(cartData.length > 0){
                axios.get(`/api/user_address/${AppState.user.id}`)
                .then(response => {
                    setUserAddress(response.data);
                    setAddressId(response.data[0].id);
                    setCityId(response.data[0].user_city_id);

                    axios.post(`/api/check_ongkir`, {
                        headers: { 'Authorization' : 'Bearer '+ user.access_token},
                        city_destination: response.data[0].user_city_id,
                        courier: 'jne',
                        weight: weightData
                    })
                    .then(response => {
                        console.log(response.data[0].costs);
                        setCosts(response.data[0].costs);
                    })
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
                                                <Grid item xs={7} sm={7} md={7} lg={7}>
                                                    <h3 style={{ marginLeft: '50px'}}>{cart.name}</h3>
                                                </Grid>
                                                <Grid item xs={1} sm={1} md={1} lg={1}>
                                                    <div onClick={() => {
                                                        axios.delete(`/api/shopping_cart/${cart.cart_id}`, {
                                                            headers: { 'Authorization' : 'Bearer '+ user.access_token}
                                                        })
                                                        .then(response => {
                                                            let cartsAfterDelete= carts.filter(function(item) {
                                                                return item.cart_id != cart.cart_id
                                                            })

                                                            let totalPriceAfterDelete = totalPrice - cart.price * cart.quantity;
                                                            setTotalPrice(totalPriceAfterDelete);
                                                            setCarts(cartsAfterDelete);
                                                        })
                                                        
                                                    }} >
                                                        <StyledDelete>
                                                            <DeleteForeverIcon />
                                                        </StyledDelete>
                                                    </div>
                                                    
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
                                            <hr></hr>
                                            
                                            </div>
                                            
                                        </Grid>
                                    </Grid>
                                </Card>
                                </div>
                            )
                        })
                    }
                    <div style={{ backgroundColor: '#17172b', padding: '2px' }}>
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
                                         <Card style={{ padding: '10px' }} onClick={() => {
                                        setAddressId(list.id);
                                        setCityId(list.user_city_id);
                                        axios.post(`/api/check_ongkir`, {
                                            headers: { 'Authorization' : 'Bearer '+ user.access_token},
                                            city_destination: list.user_city_id,
                                            courier: courier,
                                            weight: weight
                                        })
                                        .then(response => {
                                            setCosts(response.data[0].costs);
                                            setTotalPrice(totalPrice - courierPrice);
                                            setCourierPrice(0);
                                            setCourierSelected('');
                                        })
                                    }}>
                                        <SetyledAddress >
                                        <Grid container>
                                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                                {
                                                    list.id === addressId &&
                                                    <center><CheckCircleIcon /></center>
                                                    ||
                                                    <center><CheckBoxOutlineBlankIcon /></center>
                                                }
                                               
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
                                        </SetyledAddress >
                                    </Card>
                                    </div>
                            )
                        })
                    }

                    <Grid container>
                        <Grid item xs={3} sm={3} lg={3} md={3}>
                            <FormControl className={classes.formControl}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Courier
                            </InputLabel>
                            <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={courier}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            >
                            <MenuItem value="jne">JNE</MenuItem>
                            <MenuItem value="tiki">TIKI</MenuItem>
                            <MenuItem value="pos">POS</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                    </Grid>

                    <Grid>
                        {
                            costs.map((c, key )=> {
                                return(
                                    <StyledCourier key={key} style={{ marginTop: '5px'}} onClick={()=>{
                                        
                                        if(courierSelected !== `${c.service} | ${c.description}`){
                                            let totalPriceAfterSetCourier = totalPrice - courierPrice + c.cost[0].value;
                                            setTotalPrice(totalPriceAfterSetCourier);
                                            setCourierPrice(c.cost[0].value)
                                            
                                        }else{
                                            return;
                                        }

                                        setCourierSelected(`${c.service} | ${c.description}`)
                                        
                                    }}>
                                        <Card style={{ padding: '10px' }} key={key}>
                                            <Grid container>
                                                <Grid item xs={11} sm={11} lg={3} md={3}>
                                                    {c.service} | {c.description}
                                                </Grid>
                                                <Grid item xs={11} sm={11} lg={1} md={1}>
                                                    {c.cost[0].etd}
                                                    {
                                                        courier == 'jne' &&
                                                        <span> Day</span>
                                                    }

                                                    {
                                                        courier == 'tiki' &&
                                                        <span> Day</span>
                                                    }
                                                </Grid>
                                                <Grid item xs={11} sm={11} lg={3} md={3}>
                                                    {currencyFormatter(c.cost[0].value)}
                                                </Grid>
                                                <Grid item xs={1} sm={1} lg={1} md={1}>
                                                {
                                                    courierSelected === `${c.service} | ${c.description}` &&
                                                    <center><CheckCircleIcon /></center>
                                                    ||
                                                    <center><CheckBoxOutlineBlankIcon /></center>
                                                }
                                                </Grid> 
                                            </Grid>
                                        </Card>
                                    </StyledCourier>
                                )
                            })
                        }
                    </Grid>

                    <Grid container>
                        <Grid item>
                            <StyledTotal>
                                <h3>Total : {currencyFormatter(totalPrice)}</h3>
                            </StyledTotal>
                        </Grid>
                    </Grid>
                    <button onClick={handleOpenPay}>Pay</button>
                    
                    <br />
                    <br />
                </StyledCart>
            </div>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClosePay}
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

            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openPay}
            onClose={handleClosePay}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
            <Fade in={openPay}>
                <div className={classes.paper}>
                <Pay totalPrice={totalPrice} />
                </div>
            </Fade>
            </Modal>
        </div>
    )
}

export default withRouter(MyShoppingCart);