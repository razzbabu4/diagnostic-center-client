import { useState } from "react";
import SingleTest from "../components/SingleTest";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './AllTest.css'
// import required modules
import { Pagination } from 'swiper/modules';


const AllTest = () => {
    const axiosPublic = useAxiosPublic();
    const [searchValue, setSearchValue] = useState('');
    const [searchAllDate, setSearchAllDate] = useState([]);

    const { data: tests = [] } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tests')
            return res.data;
        }
    });

    const handleSearch = async () => {
        const res = await axiosPublic.get(`/searchTestDate/${searchValue}`)
        setSearchAllDate(res.data)
    }

    const displayedTests = searchAllDate.length ? searchAllDate : tests;

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <div className="my-8">
            <div className="flex gap-2 my-6">
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="date"
                        value={searchValue}
                        onChange={(e) => {
                            const [year, month, day] = e.target.value.split('-');
                            setSearchValue(`${year}-${month}-${day}`);
                        }}
                        placeholder="Filter by date"
                    />
                </label>
                <button onClick={handleSearch} className="btn btn-accent">Search</button>
            </div>
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
                        {
                            displayedTests.slice(0, 6).map(test => <SingleTest key={test._id} test={test}></SingleTest>)
                        }
                    </div>
                </SwiperSlide>
                {displayedTests.length > 6 && <SwiperSlide>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
                        {
                            displayedTests.slice(6, 12).map(test => <SingleTest key={test._id} test={test}></SingleTest>)
                        }
                    </div>
                </SwiperSlide>}
            </Swiper>
        </div>
    );
};

export default AllTest;