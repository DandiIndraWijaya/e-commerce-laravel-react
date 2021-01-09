import React, {Component, useEffect} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import FlashMessage from 'react-flash-message';

const Pay = ({ totalPrice }) => {
    
    useEffect(() => {
        const paypalButton = document.getElementById("paypal-button");
        if(paypalButton){
        
            paypal.Button.render({
                // Configure environment
                env: 'sandbox',
                client: {
                  sandbox: 'AUC8t8XY6oQc1kztTfl49iwK_O7xlY80eK4ZN27WGTux6v2SRDGRtK_QCuyQSv17f3zOIlPjKmSCTRGI'
                },
                // Customize button (optional)
                locale: 'en_US',
                style: {
                  size: 'small',
                  color: 'gold',
                  shape: 'pill',
                },
            
                // Enable Pay Now checkout flow (optional)
                commit: true,
            
                // Set up a payment
                payment: function(data, actions) {
                  return actions.payment.create({
                    transactions: [{
                      amount: {
                        total: totalPrice,
                        currency: 'USD'
                      }
                    }]
                  });
                },
                // Execute the payment
                onAuthorize: function(data, actions) {
                  return actions.payment.execute().then(function() {
                    // Show a confirmation message to the buyer
                    window.alert('Thank you for your purchase!');
                  });
                }
              }, '#paypal-button');
            }
    })
    
    

    return (
        <div className="content">
            <div className="container">
                <center>
                <div id="paypal-button"></div>
                fsfsadadwa
                </center>
                
            </div>
        </div>
    )
}

export default withRouter(Pay);