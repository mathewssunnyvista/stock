import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import React, { Fragment } from "react";

import "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

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
