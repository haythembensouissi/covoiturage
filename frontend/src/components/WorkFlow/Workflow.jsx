import { CheckCircle2 } from "lucide-react";
import covoiturage from "../../assets/covoiturage.png";
import { checklistItems } from "../constants";
import "./Workflow.scss"; // Import the SCSS file

const Workflow = () => {
  return (
    <div className="workflow">
      <h2 className="workflow-title">
        Accelerate your{" "}
        <span className="gradient-text">Covoiturage</span>
      </h2>
      <div className="workflow-content">
        <div className="workflow-image">
          <img src={covoiturage} alt="Coding" />
        </div>
        <div className="workflow-checklist">
          {checklistItems.map((item, index) => (
            <div key={index} className="checklist-item">
              <div className="icon-container">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="checklist-title">{item.title}</h5>
                <p className="checklist-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
