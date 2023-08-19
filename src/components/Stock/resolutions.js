import Select from "react-select";
import React, { Fragment } from "react";
import { resolutionOptions } from "../../utils/constants";

export default function Resolutions(props) {
  const { value, onChange } = props;
  return (
    <Fragment>
      <div className="row m-3">
        <div className="col-2">Resolution</div>
        <div className="col-4">
          <Select
            value={value}
            onChange={onChange}
            classNamePrefix="select"
            options={resolutionOptions}
          />
        </div>
      </div>
    </Fragment>
  );
}
