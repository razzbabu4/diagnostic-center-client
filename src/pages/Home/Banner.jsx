import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';

const Banner = () => {
    const axiosPublic = useAxiosPublic();

    const { data: banners = [] } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosPublic.get('/banners')
            return res.data;
        }
    })
    return (
        <div className="md:mt-6">
            {
                banners.map(banner =>
                    <div key={banner._id}>
                        {
                            banner.isActive === 'true' &&
                            <div className="hero h-[600px]" style={{ backgroundImage: 'url(https://th.bing.com/th/id/R.1ce70f4bd346ea2dca0b723f4b348610?rik=8EnrkiEj%2fq%2flIA&pid=ImgRaw&r=0)', backgroundSize: 'contain' }}>
                                <div className="hero-overlay bg-opacity-80"></div>
                                <div className="flex flex-col md:justify-between md:flex-row gap-6">
                                    <div className='text-left text-white space-y-6 w-full px-4 md:pl-6'>
                                        <h1 className='text-3xl md:text-5xl font-bold'>{banner.title}</h1>
                                        <p>{banner.description}</p>
                                        <div className="w-full md:w-1/2 relative px-8 py-4 overflow-hidden font-semibold rounded bg-teal-600">
                                            {banner.couponCode}
                                            <span className="absolute top-0 right-0 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 dark:bg-violet-600">${banner.couponRate}</span>
                                        </div>
                                        <div>
                                            <Link to={'/allTest'}>
                                                <button className="btn bg-violet-500 border-none mr-5 uppercase text-white">All Test</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="w-full text-right">
                                        <img src={banner.image} alt="" />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Banner;