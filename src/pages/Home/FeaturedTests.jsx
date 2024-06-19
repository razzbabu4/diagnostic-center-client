import SingleTest from "../../components/SingleTest";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';


const FeaturedTests = () => {
    const axiosPublic = useAxiosPublic();

    const { data: tests = [] } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tests')
            return res.data;
        }
    });
    const sortedTests = [...tests].sort((a, b) => b.bookings - a.bookings);
    return (
        <div>
            <div className="container flex flex-col items-center mx-auto mb-4 md:p-10 md:px-12">
                <h1 className="p-4 text-4xl font-semibold leading-none text-center">Most Booked Services</h1>
                <p className="text-center w-2/3 mx-auto mt-4">At Health Quest Diagnostic Center, we are proud of the positive feedback we receive from our patients. Here are some testimonials that highlight our commitment to quality care, patient comfort, and reliable diagnostic services.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
                {
                    sortedTests.slice(0, 3).map(test => <SingleTest key={test._id} test={test}></SingleTest>)
                }
            </div>
        </div>
    );
};

export default FeaturedTests;