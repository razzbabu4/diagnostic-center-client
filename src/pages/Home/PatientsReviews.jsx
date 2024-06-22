import profile from '../../../public/image.png'
const PatientsReviews = () => {
    return (
        <section className="my-8">
            <div className="container flex flex-col items-center mx-auto mb-4 md:p-10 px-2 md:px-12">
                <h1 className="p-4 text-2xl md:text-4xl font-semibold leading-none text-center">What our patients are saying</h1>
                <p className="text-center md:w-2/3 mx-auto mt-4">At Health Quest Diagnostic Center, we are proud of the positive feedback we receive from our patients. Here are some testimonials that highlight our commitment to quality care, patient comfort, and reliable diagnostic services.</p>
            </div>
            <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
                <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                    <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-gray-900">
                        <p className="relative px-6 py-1 text-lg italic text-center text-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-violet-400 dark:text-violet-600">
                                <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                            </svg>I had a wonderful experience at Health Quest. The staff was friendly and professional, and the facility was clean and modern. My MRI was quick and efficient, and the results were delivered faster than I expected. Highly recommend. Thank you, Health Quest!
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-violet-400 dark:text-violet-600">
                                <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                            </svg>
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-teal-500 text-gray-900 dark:text-gray-50">
                        <img src={profile} alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full" />
                        <p className="text-xl font-semibold leading-tight">Jhon D.</p>
                        <div className="rating mt-2">
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                    <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-gray-900">
                        <p className="relative px-6 py-1 text-lg italic text-center text-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-violet-400 dark:text-violet-600">
                                <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                            </svg>From the moment I walked in, I felt at ease. The reception staff was welcoming, and the technician who performed my ultrasound was very gentle and explained everything clearly. The whole process was smooth and stress-free. Thank you, Health Quest!
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-violet-400 dark:text-violet-600">
                                <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                            </svg>
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-teal-500 text-gray-900 dark:text-gray-50">
                        <img src={profile} alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full" />
                        <p className="text-xl font-semibold leading-tight">Michle P.</p>
                        <div className="rating mt-2">
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                    <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-gray-900">
                        <p className="relative px-6 py-1 text-lg italic text-center text-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-violet-400 dark:text-violet-600">
                                <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                            </svg>Health Quest Diagnostic Center is my go-to place for all my medical tests. They have the latest equipment and a highly skilled team. I appreciate their attention to detail and the way they make sure I understand my results. Truly exceptional service!
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-violet-400 dark:text-violet-600">
                                <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                            </svg>
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-teal-500 text-gray-900 dark:text-gray-50">
                        <img src={profile} alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full" />
                        <p className="text-xl font-semibold leading-tight">Maria S.</p>
                        <div className="rating mt-2">
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                    <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-gray-900">
                        <p className="relative px-6 py-1 text-lg italic text-center text-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-violet-400 dark:text-violet-600">
                                <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                            </svg>I recently had a series of blood tests done at Health Quest. The phlebotomist was excellent – I barely felt the needle! The results were available online within a day, which was very convenient. I am very satisfied with my experience here.
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-violet-400 dark:text-violet-600">
                                <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                            </svg>
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-teal-500 text-gray-900 dark:text-gray-50">
                        <img src={profile} alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full" />
                        <p className="text-xl font-semibold leading-tight">Lind G.</p>
                        <div className="rating mt-2">
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" defaultChecked />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-500" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PatientsReviews;