import SingleTest from "../components/SingleTest";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';


const AllTest = () => {
    const axiosPublic = useAxiosPublic();
    const { data: tests = [] } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tests')
            return res.data;
        }
    })
    return (
        <div className="my-6">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
                {
                    tests.map(test => <SingleTest key={test._id} test={test}></SingleTest>)
                }
            </div>
        </div>
    );
};

export default AllTest;