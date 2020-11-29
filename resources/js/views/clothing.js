import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, withRouter } from 'react-router-dom';

import ProductRating from '../components/ProductRating/index';
import {currencyFormatter} from '../utils/currency';
import Button from '../components/Button/Button';

const StyledClothing = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
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

  

const Clothing = () => {
    const classes = useStyles();
    const [items, setItems] = useState([]);

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
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    
    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        const data = await fetch(
            'http://127.0.0.1:8000/api/products/category/1'
        );

        const items = await data.json();
        setItems(items);
    }
    return (
        <StyledClothing>
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
                                        <ProductRating text={item.rating} rating={item.rating} sold={item.users_rated} />
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <a href={`http://127.0.0.1:8000/product_detail/${item.id}`}>
                                            <Button text="Detail" float="right" />
                                        </a>
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
        </StyledClothing>
        
    )
}


export default withRouter(Clothing);

