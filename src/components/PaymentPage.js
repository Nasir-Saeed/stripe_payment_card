import React from 'react';
import CheckoutForm from './CheckoutForm';
import './PaymentPage.css';
import Image from './payment-img.jpg'

const PaymentPage = () => {
  return (
    <div className="payment-page">
      {/* <div className="image-column">
        
      </div> */}
      <div className="form-column">
      <img src={Image} alt="Payment" />
        <CheckoutForm />
      </div>
    </div>
  );
};

export default PaymentPage;
