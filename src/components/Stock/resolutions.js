import Select from "react-select";
import React, { Fragment } from "react";
import { resolutionOptions } from "../../utils/constants";

export default function Resolutions(props) {
  const { value, onChange } = props;
  return (
    <Fragment>
      <div class="row m-3">
        <div class="col-2">Resolution</div>
        <div class="col-4">
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
