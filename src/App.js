import React, { useEffect, useRef } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentPage from './components/PaymentPage/PaymentPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ReCAPTCHA from 'react-google-recaptcha';


// import './App.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const RECAPTCHA_SITE_KEY = '6LeuzAAqAAAAAG4-lc2dCzdxvVtrQv1xjhnLH0UC'; // Replace with your actual site key


function App() {
  const recaptchaRef = useRef(null);

  useEffect(() => {
    recaptchaRef.current.execute();
  }, []);

  const handleReCAPTCHAChange = (token) => {
    if (token) {
      // Handle the verified token here
      console.log('reCAPTCHA token:', token);
      // You can now use this token as needed
    }
  };
  return (
    <>
      <Navbar />
      <Elements stripe={stripePromise}>
        <PaymentPage />
      </Elements>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={RECAPTCHA_SITE_KEY}
        size="invisible"
        onChange={handleReCAPTCHAChange}
      />
      <Footer />
    </>
  );
}

export default App;
