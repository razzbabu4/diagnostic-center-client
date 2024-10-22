import { useState } from "react";
import SingleTest from "../components/SingleTest";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from "react-router-dom";

const AllTest = () => {
    const axiosPublic = useAxiosPublic();
    const [searchValue, setSearchValue] = useState('');
    const [searchAllDate, setSearchAllDate] = useState([]);

    // pagination
    const { count } = useLoaderData();
    console.log(count)

    // dynamic pages 
    const [testPerPage, setTestPerPage] = useState(3);
    const numberOfPages = Math.ceil(count / testPerPage);

    const pages = [...Array(numberOfPages).keys()];
    console.log(pages)

    // current page
    const [currentPage, setCurrentPage] = useState(0);


    const { data: tests = [] } = useQuery({
        queryKey: ['tests', currentPage, testPerPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tests?page=${currentPage}&item=${testPerPage}`)
            return res.data;
        }
    });

    const handleSearch = async () => {
        const res = await axiosPublic.get(`/searchTestDate/${searchValue}`)
        setSearchAllDate(res.data)
    }

    const displayedTests = searchAllDate.length ? searchAllDate : tests;


    const handleTestPerPage = (e) => {
        const testNumber = e.target.value;
        setTestPerPage(testNumber)
        setCurrentPage(0)
    }

    const handlePrevPage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
                {
                    displayedTests.map(test => <SingleTest key={test._id} test={test}></SingleTest>)
                }
            </div>
            <div className="text-center">
                <button className="btn mr-2" onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page =>
                        <button
                            className={`btn mr-2 ${currentPage === page ? 'bg-teal-400 text-white' : undefined}`}
                            onClick={() => setCurrentPage(page)}
                            key={page}>
                            {page + 1}
                        </button>
                    )
                }
                <button className="btn mr-2" onClick={handleNextPage}>Next</button>
                <select value={testPerPage} onChange={handleTestPerPage}>
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                </select>

            </div>
        </div>
    );
};

export default AllTest;