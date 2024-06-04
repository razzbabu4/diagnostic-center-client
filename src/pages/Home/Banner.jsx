
const Banner = () => {
    return (
        <div className="hero h-[600px]" style={{ backgroundImage: 'url(https://th.bing.com/th/id/R.1ce70f4bd346ea2dca0b723f4b348610?rik=8EnrkiEj%2fq%2flIA&pid=ImgRaw&r=0)', backgroundSize: 'contain' }}>
            <div className="hero-overlay bg-opacity-80"></div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className='text-white space-y-6 w-full md:w-1/2 px-4 md:pl-8'>
                    <h1 className='text-3xl md:text-6xl font-bold'>Affordable Price For Car Servicing</h1>
                    <p>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                    <div className="w-full md:w-1/2 relative px-8 py-4 overflow-hidden font-semibold rounded bg-teal-600">
                        DOC50
                        <span className="absolute top-0 right-0 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 dark:bg-violet-600">$59</span>
                    </div>
                    <div>
                        <button className="btn bg-violet-500 border-none mr-5 uppercase text-white">All Test</button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-right">
                    <img src="https://th.bing.com/th/id/R.8a162fd652b81f07a631d411555cb9a4?rik=fRws%2fT5WApaY9Q&pid=ImgRaw&r=0" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;