import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import FlashMessage from 'react-flash-message';

const AddAddress = () => {


    return (
        <div className="content">
            <div className="container">
                <center>
                    <h3>Add a Destination</h3>
                </center>
            </div>
        </div>
    )
}

export default withRouter(AddAddress);