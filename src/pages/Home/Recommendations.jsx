import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Recommendations = () => {
    const axiosPublic = useAxiosPublic();
    const { data: recommendations = [] } = useQuery({
        queryKey: ['recommendations'],
        queryFn: async () => {
            const res = await axiosPublic.get('/recommendations')
            return res.data;
        }
    })
    return (
        <section>
            <div className="container flex flex-col items-center mx-auto mb-4 md:p-10 md:px-12">
                <h1 className="p-4 text-4xl font-semibold leading-none text-center"> Personalized Recommendation</h1>
                <p className="text-center w-2/3 mx-auto mt-4">At Health Quest Diagnostic Center, we understand that every patient is unique, and we are dedicated to providing personalized recommendations that include health tips, preventive measures, and suggested upcoming tests tailored to your specific health needs</p>
            </div>
            <div className="carousel w-full text-white" style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/abstract-texture-background_929505-162.jpg)', backgroundSize: 'cover' }}>
                {
                    recommendations.map(recommendation =>
                        <div key={recommendation._id} className="carousel-item w-full">
                            <div className='my-8 mx-4 relative'>
                                <h1 className='text-3xl font-semibold mb-4'>{recommendation.type}</h1>
                                <ul>
                                    {recommendation.details.map(detail => <li key={detail.title}>
                                        <strong><span>{detail.title} :</span></strong>
                                        <span> {detail.description}</span>
                                    </li>)}
                                </ul>
                            </div>

                        </div>)
                }

            </div>
        </section>
    );
};

export default Recommendations;