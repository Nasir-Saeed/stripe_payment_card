import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import bgImg from '../img/credit-card-logos.png';

const supportedCountries = [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'Australia', code: 'AU' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'Austria', code: 'AT' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'Greece', code: 'GR' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Italy', code: 'IT' },
    { name: 'Japan', code: 'JP' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Malta', code: 'MT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Norway', code: 'NO' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Romania', code: 'RO' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
];

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('US');
    const [postalCode, setPostalCode] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPaymentProcessing(true);
        setError(null);

        const cardElement = elements.getElement(CardElement);

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: email,
                name: name,
                address: {
                    country: country,
                    postal_code: postalCode,
                },
            },
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            setPaymentProcessing(false);
            return;
        }

        const response = await fetch('https://pay.usdesigncentral.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 }),
        });

        const { clientSecret } = await response.json();

        if (!clientSecret) {
            setError('Failed to get client secret from the backend.');
            setPaymentProcessing(false);
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (result.error) {
            setError(result.error.message);
            setPaymentProcessing(false);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                setPaymentProcessing(false);
                alert('Payment Successful!');
                // Reset form fields
                setEmail('');
                setName('');
                setCountry('US');
                setPostalCode('');
                setAmount('');
                cardElement.clear();
            }
        }
    };

    const cardElementOptions = {
        hidePostalCode: true,
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <h1 className="paymentHeading">Enter Your Payments Details</h1>
            <div className="checkout-forms">
                {/* Amount */}
                <label>
                    Payment Amount
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </label>

                <div class="row">
                    <div class="col">
                        {/* Name on card */}
                        <label>
                            Name
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className='form-control'
                            />
                        </label>
                    </div>
                    <div class="col">
                        {/* Email */}
                        <label>
                            Email
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='form-control'

                            />
                        </label>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        {/* Country or Region */}
                        <label>
                            Country
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                className='form-control'

                            >
                                {supportedCountries.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </label>


                    </div>
                    <div class="col">
                        {/* Email */}
                        <label>
                            Postal Code
                            <input
                                type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                className='form-control'

                            />
                        </label>
                    </div>
                </div>
              
                {/* Card Information */}
                <label>
                    Card Information
                    <div className="card-element-wrapper mt-1">
                        <CardElement options={cardElementOptions} />
                    </div>
                </label>
                <img src={bgImg} alt='Form Image' />

                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={!stripe || paymentProcessing}>
                    {paymentProcessing ? 'Processing...' : 'Pay'}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;

