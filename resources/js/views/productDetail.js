import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom'
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Button from '../components/Button/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, withRouter, useParams } from 'react-router-dom';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';

import Navbar from '../components/Navigation/navbar';
import NotLoginYet from '../components/NotLoginYet/notLoginYet'
import ShoppingCart from '../components/ShoppingCart/shoppingCart'
import ProductRating from '../components/ProductRating/index';
import {currencyFormatter} from '../utils/currency';
// import Button from '../components/Button/Button';


const StyledCarousel = styled.div`
    height: auto; 
    background: #EEE; 
    margin: 10px 10px;
    @media (max-width: 700px){
        margin: 5px 5px;
    }
`;

const StyledDetail = styled.div`
    padding: 5px;
`;

const StyledText = styled.span`
    font-size: 20px;
    @media(max-widh: 700px){
        font-size: 2pt;
    }
`;

const StyledTopDetail =styled.div`
    margin-left: 30px;
    @media(max-width: 700px){
        margin-left: 15px;
    }
`;

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 420,
    },
  });

const ProductDetail = () => {
    const classes = useStyles();
    const [product, setProduct] = useState({});
    const [image, setImage] = useState([]);
    const [num, setNum] = useState(2.2);
    const [clicks ,setClicks] = useState(1);
    const [show ,setShow] = useState(true);
    const [dec, setDec] = useState(false);
    const [inc, setInc] = useState(true);
    const [rating, setRating] = useState(0)
    const [usersRated, setUsersRated] = useState(0);
    const [price, setPrice] = useState(0);
    const [productId, setProductId] = useState(0);
    const [stock, setStock] = useState(0);
    const [userEmail, setUserEmail] = useState('');

    const { productName } = useParams();

    const checkIncr = () => {
        if(clicks === product.quantity - 1){
            setInc(false)
        
          }else{
            setInc(true)
          }
          if(clicks === 2){
            setDec(false)
          }else{
            setDec(true)
          }
    }
  const IncrementItem = () => {
    // checkIncr()
    if(clicks + 1 > product.quantity){
        setClicks(product.quantity)
        
    }else{
      setClicks(clicks + 1 );
    }
  }
  const DecreaseItem = () => {
    // checkIncr()
    if(clicks - 1 < 1){
      setDec(false);
    }else{
      setClicks(clicks - 1 );
    }
  }
  useEffect(() =>{
    
    if(clicks === product.quantity){
        setInc(false)
    
      }else{
        setInc(true)
      }
      if(clicks === 1){
        setDec(false)
      }else{
        setDec(true)
      }
      if(clicks === 0){
        setInc(false);
        setDec(false);
    }
  })

    useEffect(() => {
        let state = localStorage["appState"];
        if (state) {
          let AppState = JSON.parse(state);
          setUserEmail(AppState.user.email);
        } 
        axios.get(`/api/product/${productName}`).then(response => {
            const product = response.data;
            let im = [];
            product.image.map((img, key) => {
                im.push(img) 
            })
            setImage(im);
            setProduct(product);
            setRating(product.rating);
            setUsersRated(product.users_rated);
            setPrice(product.price);
            setProductId(product.id);
            setStock(product.quantity);
            if(product.quantity === 0){
                setClicks(0);
            }
        });
        
    }, []);
    const fetchItems = async (id) => {
        
        const data = await fetch(
            'http://127.0.0.1:8000/api/product/' + id
        );

        const product = await data.json();
       
        let im = [];
        product.image.map((img, key) => {
            im.push(img) 
        })
        setImage(im);
        setProduct(product);
        setRating(product.rating);
        setUsersRated(product.users_rated);
        setPrice(product.price);
        setProductId(product.id);
        setStock(product.quantity);
        if(product.quantity === 0){
            setClicks(0);
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
        <div>
            <Navbar />
            <div style={{ marginTop: '90px' }}>
                <h2 style={{ marginLeft: '10px', textDecoration: 'underline' }}>Product Detail</h2>
                <Card>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Carousel 
                                responsive={responsive}
                                itemClass="carousel-item-padding-10-px"
                            >
                                {
                                    image.map((img, key) => {
                                        return (
                                            <StyledCarousel key={key}>
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
                            <StyledDetail>
                            <h2 style={{marginTop: '10px', marginLeft: '10px'}}>{product.name}</h2>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <h4 style={{ marginLeft: '10px', marginTop: '5px' }}><ProductRating text={rating} rating={rating} sold={false}/></h4>
                                </div>

                                <div>
                                    <StyledTopDetail><StyledText><span style={{ color: 'grey' }}><FiberManualRecordRoundedIcon  /></span>  {product.sold} Sold</StyledText></StyledTopDetail>
                                </div>

                                <div>
                                    <StyledTopDetail><StyledText>{product.seen} <VisibilityIcon /></StyledText></StyledTopDetail>
                                </div>
                            </div>
                            <hr></hr>
                            
                            </StyledDetail>
                            <Grid container>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <div style={{ marginLeft: '20px'}}><StyledText>Price</StyledText></div>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <h3 style={{ marginLeft: '50px'}}>{currencyFormatter(price)}</h3>
                                </Grid>
                            </Grid>
                                <hr></hr>
                            <Grid container>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                <div style={{ marginLeft: '20px'}}><StyledText>Stock</StyledText></div>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <h3 style={{ marginLeft: '50px'}}>{product.quantity}</h3>
                                </Grid>
                            </Grid>
                            <hr></hr>
                            <Grid container>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                <div style={{ marginLeft: '20px'}}><StyledText>Quantity</StyledText></div>
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} lg={1}>
                                    <div style={{ width: '20px' }}>
                                        <div style={{ marginLeft: '50px'}}> 
                                        <div style={{ display: 'flex', boxSizing: 'border-box' }}>
                                            <div >
                                            {
                                                dec === true &&
                                                <button style={{ borderRadius: '8px' , padding: '0px 10px', border: 'unset', outline: 'unset', backgroundColor: 'grey', marginRight: '10px' }} onClick={DecreaseItem}>
                                                <h2 >{'<'}</h2>
                                                </button> || <button style={{ opacity: 0.5, borderRadius: '8px' , padding: '0px 10px', border: 'unset', outline: 'unset', backgroundColor: 'grey', marginRight: '10px' }} >
                                                <h2 >{'<'}</h2>
                                                </button> 
                                            }
                                            
                                            </div>
                                            
                                            <div>
                                            { <h3 style={{ marginTop: '5px' }}>{'   ' + clicks + '   ' }</h3> }
                                            </div>

                                            <div>
                                            {
                                                inc === true && 
                                                <button style={{ borderRadius: '8px' , padding: '0px 10px', border: 'unset', outline: 'unset', backgroundColor: 'grey', marginLeft: '10px' }} onClick={IncrementItem}>
                                                <h2 >{'>'}</h2>
                                                </button> || <button style={{opacity: 0.5, borderRadius: '8px' , padding: '0px 10px', border: 'unset', outline: 'unset', backgroundColor: 'grey', marginLeft: '10px' }} >
                                                <h2 >{'>'}</h2>
                                                </button>
                                            }
                                            
                                            </div>
                                            

                                            
                                        </div>
                                        
                                        </div>
                                    </div>
                                    
                                </Grid>
                            </Grid>
                            <hr></hr>

                           

                        </Grid>
                        <StyledDetail>
                            <h5>{product.description}</h5>
                            <br/>
                        </StyledDetail>
                            
                    </Grid>
                </Card>
            </div>
            {
                userEmail === 0 &&
                <NotLoginYet /> || <ShoppingCart stock={stock} productId={productId} userEmail={userEmail} quantity={clicks} price={product.price} />
            }
        </div>
        
    )
}


export default ProductDetail;

if (document.getElementById('product-detail')) {
    ReactDOM.render(<ProductDetail />, document.getElementById('product-detail'));      
}


