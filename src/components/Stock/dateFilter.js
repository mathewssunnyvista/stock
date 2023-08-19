import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import React, { Fragment } from "react";

export default function DateFilter(props) {
  const { value, onChange } = props;

  return (
    <Fragment>
      <div class="row m-3">
        <div class="col-2">Date</div>
        <div class="col-4">
          <DateTimeRangePicker onChange={onChange} value={value} />
        </div>
      </div>
    </Fragment>
  );
}
