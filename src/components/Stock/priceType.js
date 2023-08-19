import { SelectButton } from "primereact/selectbutton";
import React, { Fragment } from "react";
import { priceTypeOptions } from "../../utils/constants";

// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";

export default function PriceType(props) {
  const { value, onChange } = props;
  return (
    <Fragment>
      <div class="row m-3">
        <div class="col-2">Price Type</div>
        <div class="col-4">
          <SelectButton
            value={value}
            onChange={onChange}
            optionLabel="label"
            options={priceTypeOptions}
          />
        </div>
      </div>
    </Fragment>
  );
}
