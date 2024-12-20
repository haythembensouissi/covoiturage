import { testimonials } from "../../components/constants";
import "./Testimonials.scss"; // Import du fichier SCSS

const Testimonials = () => {
  return (
    <div className="testimonials">
      <h2 className="title">What People are saying</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-content">
              <p>{testimonial.text}</p>
              <div className="user-info">
                <img className="user-image" src={testimonial.image} alt="" />
                <div>
                  <h6 className="user-name">{testimonial.user}</h6>
                  <span className="user-company">{testimonial.company}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
