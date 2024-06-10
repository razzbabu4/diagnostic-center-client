import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaCalendarDay, FaCheckToSlot } from 'react-icons/fa6';
import { FaDollarSign } from 'react-icons/fa';
import { useRef, useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const ViewDetailsTest = () => {
    const couponCode = useRef();
    const [discount, setDiscount] = useState(0);
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const { data: test = {}, refetch } = useQuery({
        queryKey: ['test'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tests/${id}`)
            return res.data;
        }
    })

    const handleDiscount = () => {
        const couponCode2 = couponCode.current.value.toLowerCase();
        console.log(couponCode2)
        if (couponCode2 === 'hello') {
            setDiscount(test.price - 20);
        }
        else {
            setDiscount(0)
        }
    }
    const finalPrice = discount > 0 ? discount : test.price;
    return (
        <div className='my-8'>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="p-6 lg:w-3/5" ><img className="rounded-lg" src={test.image} alt="test" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold">{test.name}</h2>
                    <span className="text-md font-bold mb-0">Description : {test.details}</span>
                    <div className="flex flex-col gap-8 my-6">
                        <div className="flex items-center gap-2 text-lg"><FaCalendarDay />Test Date: {test.date}</div>
                        <div className="flex items-center gap-2 text-lg"><FaDollarSign />Estimate Price: ${test.price}</div>
                        <div className="flex items-center gap-2 text-lg"><FaCheckToSlot /> Available Slots: {test.slots}</div>
                    </div>
                    <div className="card-actions gap-6 items-end flex-grow">
                        <button className="btn bg-[#1313134D]" onClick={() => document.getElementById('my_modal_3').showModal()}>Book Now</button>
                        {/* <Link to='/' className="btn bg-[#1313134D]">Book Now</Link> */}
                        <Link to='/' className="btn bg-[#1313134D]">Go back</Link>
                    </div>
                </div>
            </div>
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <input type="text" ref={couponCode} placeholder="Coupon code" className="input input-bordered w-full max-w-xs mr-2" />
                        <button onClick={handleDiscount} className='btn bg-teal-500 text-white'>Apply</button>
                    </div>
                    <p className='mb-2'>Price: ${test.price}</p>
                    <p className='mb-2'>Discounted price: ${discount}</p>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm finalPrice={finalPrice} test={test} refetch={refetch}></CheckoutForm>
                    </Elements>
                </div>
            </dialog>
        </div>
    );
};

export default ViewDetailsTest;