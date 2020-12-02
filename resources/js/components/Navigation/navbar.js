import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Link, withRouter, useHistory} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Login from '../../views/Login/Login'

const StyledLogo = styled.span`
    margin: 20px;
    font-weight: bold;
    font-size: 20px;
    &:focus {
        outline: none;
        box-shadow: none;
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));  

const Navbar = () => {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedId] = useState(false);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [carts, setCarts] = useState({});
    const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    useEffect(() => {
        let state = localStorage["appState"];
        let AppState = JSON.parse(state);
        if (AppState.isLoggedIn === true) {
          setIsLoggedId(AppState.isLoggedIn);
          setUser(AppState.user);
          // this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
          axios.get(`/api/shopping_cart/${AppState.user.id}`, {
            headers: { 'Authorization' : 'Bearer '+ AppState.user.access_token}
          }).then(response => {
              const cartData = response.data;
              setCarts(cartData);
          });
        }
        
      }, []);

    const logout = () => {
        axios.get("/api/auth/logout",
        {headers: { 'Authorization' : 'Bearer '+ user.access_token}}).then(response => {
            let appState = {
              isLoggedIn: false,
              user: {}
            };
            localStorage["appState"] = JSON.stringify(appState);
            history.push('/');
          });
        
    }

    return (
      <div>
        <AppBar style={{ background: `linear-gradient(105deg, #17172b, #ffffff)` }} position="fixed">
                <ToolBar >
                    <StyledLogo className={classes.title}>
                      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                        Ecommerce
                      </Link> 
                    </StyledLogo>
                    {
                        !isLoggedIn ? <Button onClick={handleOpen} color="default">Login</Button> : 
                        <div>
                          <Link to="/my_shopping_cart" style={{ textDecoration: 'none'}}>
                            <Button color="default" >
                              <ShoppingCartIcon />({carts.length})
                            </Button>
                          </Link>
                          <Button color="default" onClick={logout}>Logout</Button>
                        </div>
                    }
                </ToolBar>
          </AppBar>
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
              <Login />
            </div>
          </Fade>
        </Modal>
      </div>
            
    )
}

export default withRouter(Navbar);