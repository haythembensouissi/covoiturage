import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../constants";
import "./Pricing.scss";
const Pricing = () => {
  return (
    <div className="pricing">
      <h2 className="pricing-title">Pricing</h2>
      <div className="pricing-cards">
        {pricingOptions.map((option, index) => (
          <div key={index} className="pricing-card">
            <div className="pricing-card-content">
              <p className="plan-title">
                {option.title}
                {option.title === "Pro" && (
                  <span className="most-popular">(Most Popular)</span>
                )}
              </p>
              <p className="plan-price">
                <span className="price-amount">{option.price}</span>
                <span className="price-period">/Month</span>
              </p>
              <ul className="features-list">
                {option.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <CheckCircle2 />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="subscribe-button">
                Subscribe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
