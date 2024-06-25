import React from 'react';
import CheckoutForm from '../CheckOutForm/CheckoutForm';
import './PaymentPage.css';
// import formImage from '../img/form-image.jpg'

const PaymentPage = () => {
  return (
    <div className="payment-page">
      <div className="col-lg-6">
      {/* <img src={formImage} alt='Form Image' width={500} height={200}/> */}
      </div>
      <div className="form-column">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default PaymentPage;
