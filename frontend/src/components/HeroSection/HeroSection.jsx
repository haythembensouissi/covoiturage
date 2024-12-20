import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import "./HeroSection.scss";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <h1>
        Get a ride with  
        <span className="gradient-text"> Covoiturage</span>
      </h1>
      <p>
      Discover a smarter way to travel with our carpooling platform. Whether you're commuting or heading on a long journey, connect with reliable riders and drivers to share the road, save costs, and reduce your carbon footprint. Join us today and make every trip more convenient, affordable, and eco-friendly!
      </p>
      <div className="videos">
        <video autoPlay loop muted>
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video autoPlay loop muted>
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
