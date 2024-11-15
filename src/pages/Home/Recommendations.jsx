import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from '../../hooks/useAxiosPublic';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Recommendations.css';

// import required modules
import { Parallax, Pagination, Navigation } from 'swiper/modules';

const Recommendations = () => {
    const axiosPublic = useAxiosPublic();
    const { data: recommendations = [] } = useQuery({
        queryKey: ['recommendations'],
        queryFn: async () => {
            const res = await axiosPublic.get('/recommendations')
            return res.data;
        }
    });

    return (
        <section>
            <div className="container flex flex-col items-center mx-auto mb-4 md:p-10 px-2 md:px-12">
                <h1 className="p-4 text-2xl md:text-4xl font-semibold leading-none text-center"> Personalized Recommendation</h1>
                <p className="text-center md:w-2/3 mx-auto mt-4">At Health Quest Diagnostic Center, we understand that every patient is unique, and we are dedicated to providing personalized recommendations that include health tips, preventive measures, and suggested upcoming tests tailored to your specific health needs</p>
            </div>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                speed={600}
                parallax={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Parallax, Pagination, Navigation]}
                className="mySwiper"
            >
                <div
                    slot="container-start"
                    className="parallax-bg"
                    style={{
                        'background-image':
                            'url(https://img.freepik.com/premium-photo/abstract-texture-background_929505-162.jpg)',
                    }}
                    data-swiper-parallax="-23%"
                ></div>

                {
                    recommendations.map(recommendation =>
                        <SwiperSlide key={recommendation._id} >
                            <div className="title" data-swiper-parallax="-300">
                                {recommendation.type}
                            </div>
                            <div className="text" data-swiper-parallax="-100">
                                <ul className='space-y-4'>
                                    {recommendation.details.map(detail => <li key={detail.title}>
                                        <strong><span>{detail.title} :</span></strong>
                                        <span> {detail.description}</span>
                                    </li>)}
                                </ul>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </section>
    );
};

export default Recommendations;