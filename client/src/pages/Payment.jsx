// import React, { useState } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';



// const Payment = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//                 billing_details: {
//                     name: 'John Doe',
//                 },
//             },
//         });
//         setLoading(false);
//         if (paymentIntent) {
//             // Payment successful
//         } else if (error) {
//             // Payment failed
//         }
//     };
//     return (
//         <form onSubmit={handleSubmit} className='min-h-screen'>
//             <CardElement />
//             <button type="submit" disabled={!stripe || loading}>Pay</button>
//         </form>
//     )
// }

// export default Payment