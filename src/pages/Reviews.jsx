

const Reviews = () => {
    return (
        <div className="my-8">
            <div className="flex flex-col max-w-3xl mx-auto p-8 shadow-sm rounded-xl lg:p-12 border">
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                    <div className="flex flex-col items-center py-6 space-y-3">
                        <span className="text-center">How was your experience?</span>
                        <div className="rating rating-lg">
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked />
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <textarea rows="3" placeholder="Message..." className="border p-4 rounded-md resize-none"></textarea>
                        <button className="btn py-4 my-8 border-none font-semibold rounded-md text-white dark:bg-teal-600">Leave feedback</button>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <a rel="noopener noreferrer" href="#" className="text-sm dark:text-gray-600">Maybe later</a>
                </div>
            </div>
        </div>
    );
};

export default Reviews;