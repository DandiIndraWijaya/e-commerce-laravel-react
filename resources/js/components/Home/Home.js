import React, {Component, useEffect, useState} from 'react'
import Header from '../HomeHeader/Header';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Button from '../Button/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Link} from 'react-router-dom';

const StyledCategory = styled.div`
    width: 100%;
    padding: 20px;
    margin-top: 10px;
`;

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 240,
    },
  });

const StyledButton = styled.button`
float: right;
  border: unset;
  outline: unset;
  border-radius: 50px;
  background-color: gainsboro;
  color : black;
  padding: 5px;
  &:focus {
        outline: none;
        box-shadow: none;
    }
`;

const Home = () => {
  const classes = useStyles();
    const [userName, setUserName] = useState(null);
    const [isLoggedIn, setIsLoggedId] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            setIsLoggedId(AppState.isLoggedIn);
            setUser(AppState.user);
            // this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }, []);
    return (
        <div>
            {/* <Header userData={user} userIsLoggedIn={isLoggedIn}/> */}
            <Header userName={user.name} />
            <StyledCategory>
            <h2 style={{ textDecoration: 'underline' }}>Our Product</h2>
                <Grid spacing={2} container>

                <Grid item xs={6} sm={6} md={3} lg={3}>
                        <Card>
                            <CardMedia 
                                className={classes.media}
                                image="http://127.0.0.1:8000/image/app/clothing.jpg"
                                title="Clothing"
                            />
                            <CardContent>
                            <Grid container>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <h4>Clothing</h4>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <Link to='products/clothing'>
                                            <Button float="right" text="See More" />
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        <Card>
                            <CardMedia 
                                className={classes.media}
                                image="http://127.0.0.1:8000/image/app/pants.jpg"
                                title="Celana"
                            />
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <h4>Pants</h4>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <a href="http://127.0.0.1:8000/pants">
                                            <Button float="right" text="See More" />
                                        </a>
                                    </Grid>
                                </Grid>
                                
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        <Card>
                            <CardMedia 
                                className={classes.media}
                                image="http://127.0.0.1:8000/image/app/shoes.jpg"
                                title="Shoes"
                            />
                            <CardContent>
                            <Grid container>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <h4>Shoes</h4>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <Button float="right" text="See More" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    

                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        <Card>
                            <CardMedia 
                                className={classes.media}
                                image="http://127.0.0.1:8000/image/app/slippers.jpg"
                                title="Celana"
                            />
                            <CardContent>
                            <Grid container>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <h4>Slippers</h4>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} >
                                        <Button float="right" text="See More" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </StyledCategory>
        </div>
    )
}

// class Home extends Component {
//   constructor() {
//     super();
//     this.state = {
//       isLoggedIn: false,
//       user: {}
//     }
//   }
//   // check if user is authenticated and storing authentication data as states if true
//   componentWillMount() {
//     let state = localStorage["appState"];
//     if (state) {
//       let AppState = JSON.parse(state);
//       this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
//     }
//   }
// render() {
//     return (
//       <div>
//         <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
//         <Footer/>
//       </div>
//       )
//     }
//   }
export default Home