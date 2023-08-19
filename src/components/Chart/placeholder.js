import { Fragment } from "react";
import Icon from "../../assets/images/chartIcon.svg";
export default function Placeholder() {
  return (
    <Fragment>
      <div class="row">
        <div class="col-lg-12 text-center">
          <p class="placeholder-glow">
            <span class="placeholder col-12 bg-light">
              <img src={Icon} />
              <p>No data for curent period</p>
            </span>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
