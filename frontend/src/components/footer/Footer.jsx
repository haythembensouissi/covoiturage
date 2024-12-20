import { resourcesLinks, platformLinks, communityLinks } from "../constants/index";
import "./footer.SCSS"; // Import the SCSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h3>Platform</h3>
          <ul>
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h3>Community</h3>
          <ul>
            {communityLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
