
import Banner from "./Banner";
import PatientsReviews from "./PatientsReviews";
import Recommendations from "./Recommendations";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PatientsReviews/>
            <Recommendations/>
        </div>
    );
};

export default Home;