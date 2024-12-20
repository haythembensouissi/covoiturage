import { useCookies } from "react-cookie";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import CountUp from "react-countup";
import Login from "../login/login";
import HeroSection from "../../components/HeroSection/HeroSection";
import Footer from "../../components/footer/Footer";
import Pricing from "../../components/Pricing/Pricing";
import Testimonials from "../../components/testimonials/Testimonials";
import Workflow from "../../components/WorkFlow/Workflow";
import covoiturage from "../../assets/covoiturage.png"
function HomePage() {

  const [cookies] = useCookies();
  const token = cookies.token;

  return (
    <div>
      {token ? (
        <div className="homePage">
          {/* Main Content */}
          <div className="textContainer">
            <div className="wrapper">
              <h1 className="title">Find easy rides with trusted partners</h1>
              <p className="description">
              Connect with trusted riders and drivers through our carpooling platform. Save money, reduce emissions, and enjoy a convenient way to share your journey. Together, we make travel easier and more eco-friendly
              </p>
              <covoiturage/>

              {/* Search Bar */}
              <SearchBar />

              {/* Statistics Section */}
              <div className="boxes">
                <div className="box">
                  <h2 className="statNumber">
                    <CountUp end={16} duration={5} delay={2} />
                  </h2>
                  <p>Years of Experience</p>
                </div>
                <div className="box">
                  <h2 className="statNumber">
                    <CountUp end={200} duration={5} delay={2} />
                  </h2>
                  <p>Award Gained</p>
                </div>
                <div className="box">
                  <h2 className="statNumber">
                    <CountUp end={2000} duration={5} delay={2} />
                  </h2>
                  <p>Rides</p>
                </div>
              </div>

            </div>
          </div>
        
          {/* Hero Section */}
          <HeroSection />

          {/* Pricing Section */}
          <div className="section">
            <Pricing />
          </div>

          {/* Testimonials */}
          <div className="section">
            <Testimonials />
          </div>

          {/* Workflow */}
          <div className="section">
            <Workflow />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default HomePage;
