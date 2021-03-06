import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './views/Login/Login';

import Products from './views/Products';
import Register from './views/Register/Register';
import ProductDetail from './views/productDetail';
import MyShoppingCart from './views/MyShoppingCart';

import AdminProducts from './views/Admin/Index';
import AdminCategories from './views/Admin/Categories';
// import NotFound from './views/NotFound/NotFound'

import PrivateRoute from './PrivateRoute'
import Dashboard from './views/user/Dashboard/Dashboard';
const Main = props => (
<Switch>
  {/*User might LogIn*/}
  <Route exact path='/' component={Home}/>
  
  {/*User will LogIn*/}
  <Route path='/login' component={Login}/>
  <Route path='/register' component={Register}/>

  {/* User is LoggedIn*/}
  <PrivateRoute path='/dashboard' component={Dashboard}/>
  <PrivateRoute path='/my_shopping_cart' component={MyShoppingCart} />

  <Route path='/products/:category' component={Products}/>
  <Route path='/product/:productName' component={ProductDetail} />

  
  <Route exact path='/admin' component={AdminProducts} />
  <Route exact path='/admin/categories' component={AdminCategories} />
</Switch>
);
export default Main;