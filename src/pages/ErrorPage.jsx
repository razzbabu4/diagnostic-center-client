
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <section className="flex items-center h-screen p-16 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl text-gray-600 dark:text-gray-400">
                        <span className="sr-only">Error</span>{error.status}
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">{error.data}</p>
                    <p className="mt-4 mb-8 text-gray-400 dark:text-gray-600"><i>{error.statusText || error.message}</i></p>
                    <Link to='/' className="border p-4 rounded-lg bg-green-200">Go Back to Home</Link>

                </div>
            </div>
        </section>
    );
}

export default ErrorPage