import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentPage from './components/PaymentPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import './App.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

console.log('Stripe Publishable Key:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <>
    <Navbar/>
    <Elements stripe={stripePromise}>
      <PaymentPage />
    </Elements>
    <Footer/>
    </>
  );
}

export default App;
