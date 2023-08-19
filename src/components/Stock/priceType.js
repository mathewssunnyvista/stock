import { SelectButton } from "primereact/selectbutton";
import React, { Fragment } from "react";
import { priceTypeOptions } from "../../utils/constants";

export default function PriceType(props) {
  const { value, onChange } = props;
  return (
    <Fragment>
      <div className="row m-3">
        <div className="col-2">Price Type</div>
        <div className="col-4">
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
