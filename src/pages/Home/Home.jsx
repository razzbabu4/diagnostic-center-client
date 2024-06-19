
import Banner from "./Banner";
import FeaturedTests from "./FeaturedTests";
import PatientsReviews from "./PatientsReviews";
import Recommendations from "./Recommendations";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedTests/>
            <PatientsReviews/>
            <Recommendations/>
        </div>
    );
};

export default Home;