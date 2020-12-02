import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useParams, withRouter } from 'react-router-dom';


import ProductRating from '../components/ProductRating/index';
import {currencyFormatter} from '../utils/currency';
import Button from '../components/Button/Button';
import Navbar from '../components/Navigation/navbar';

const StyledProducts = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    margin-top: 90px;
`;

const StyledCarousel = styled.div`
    height: auto; 
    background: #EEE; 
    margin: 10px 10px;
    @media (max-width: 700px){
        margin: 5px 5px;
    }
`;

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 240,
    },
  });

  

const Products = () => {
    const classes = useStyles();
    const [items, setItems] = useState([]);
    let { category } = useParams();

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    
    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        axios.get(`/api/products/category/${category}`).then(response => {
            setItems(response.data)
          });
    }, [])
    return (
        <div>
            <Navbar />
            <StyledProducts>
            <h2 style={{ marginLeft: '10px', textDecoration: 'underline' }}>Top 10 Clothing</h2>
            <div style={{ backgroundImage: 'linear-gradient(105deg, #17172b, #ffffff)' }}>   
            <Carousel
                 
                responsive={responsive}
                itemClass="carousel-item-padding-10-px"
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                ssr={true}
            >
                {
                    items.map((item, key) => {
                        return(
                            <StyledCarousel key={key}>
                        <Card>
                            <CardMedia 
                                className={classes.media}
                                image={item.image[0]}
                                title="Tipe 1"
                            />
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <h4>{item.name}</h4>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <h5 style={{ color: 'linear-gradient(105deg, #17172b, #ffffff' }}>{currencyFormatter(item.price)}</h5>
                                    </Grid>
                                </Grid>
                                
                                <Grid container>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <ProductRating text={item.rating} rating={item.rating} sold={item.sold} />
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <Link to={`/product/${item.name}`}>
                                            <Button text="Detail" float="right" />
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </StyledCarousel>
                        )
                    })
                }
                    
            </Carousel>
            </div>
            <h2 style={{ marginLeft: '10px', marginTop: '30px', textDecoration: 'underline' }}>All Clothing</h2>
            <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={2} md={2}>
                        <Card>
                            <CardMedia 
                                className={classes.media}
                                image="http://127.0.0.1:8000/image/clothing/clothing_1.jpg"
                                title="Tipe 1"
                            />
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <h4>Jackt Style with Blue Color</h4>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <h5 style={{ color: 'linear-gradient(105deg, #17172b, #ffffff' }}>{currencyFormatter(500000)}</h5>
                                    </Grid>
                                </Grid>
                                
                                <Grid container>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <ProductRating rating={4.6} sold={123} />
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <a href="http://127.0.0.1:8000/pants">
                                            <Button text="Detail" float="right" />
                                        </a>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                </Grid>

                <Grid item xs={6} sm={6} md={2} md={2}>
                        <Card>
                            <CardMedia 
                                className={classes.media}
                                image="http://127.0.0.1:8000/image/clothing/clothing_1.jpg"
                                title="Tipe 1"
                            />
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <h4>Jackt Style with Blue Color</h4>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <h5 style={{ color: 'linear-gradient(105deg, #17172b, #ffffff' }}>{currencyFormatter(500000)}</h5>
                                    </Grid>
                                </Grid>
                                
                                <Grid container>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <ProductRating rating={4.6} sold={123} />
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <a href="http://127.0.0.1:8000/pants">
                                            <Button text="Detail" float="right" />
                                        </a>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                </Grid>
            </Grid>
        </StyledProducts>
        </div>
        
    )
}


export default withRouter(Products);

