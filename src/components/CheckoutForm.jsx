
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css'
import { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2'

const CheckoutForm = ({ finalPrice, test, refetch}) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (finalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: finalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, finalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        // payment confirm
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error', confirmError);
        } else {
            console.log('Payment intent success', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log(paymentIntent.id)
                setTransactionId(paymentIntent.id)

                // now saved the payment data in the database
                const reservation = {
                    testId: test._id,
                    email: user.email,
                    price: finalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    details: test.details,
                    status: 'pending'
                }
                const res = await axiosSecure.post('/reservation', reservation)
                console.log('reservation saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your appointment has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-primary' type="submit" disabled={!stripe || !clientSecret}>
                Pay ${finalPrice}
            </button>
            <p className='text-red-600'>{error}</p>
            {transactionId && <p className='text-green-600'>Your transaction id: {transactionId}</p>}
        </form>
    );
};



export default CheckoutForm;