import { Fragment } from "react";
import Icon from "../../assets/images/chartIcon.svg";
import { placeholder_text } from "../../utils/constants";
export default function Placeholder() {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12 text-center">
          <p className="placeholder-glow">
            <span className="placeholder col-12 bg-light">
              <img src={Icon} alt="chart Icon" />
              <p>{placeholder_text}</p>
            </span>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
