import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentPage from './components/PaymentPage/PaymentPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
// import './App.css';

const stripePromise = loadStripe('');


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
