import React from 'react';
import CheckoutForm from './CheckoutForm';
import './PaymentPage.css';

const PaymentPage = () => {
  return (
    <div className="payment-page">
      {/* <div className="image-column">
        
      </div> */}
      <div className="form-column">

        <CheckoutForm />
      </div>
    </div>
  );
};

export default PaymentPage;
