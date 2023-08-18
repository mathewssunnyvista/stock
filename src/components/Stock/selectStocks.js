import React, { Fragment } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function SelectStocks(props) {
  const { value, isLoading, onChange, options } = props;
  return (
    <Fragment>
      <div class="row m-3">
        <div class="col-2">Stocks</div>
        <div class="col-4">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            value={value}
            isLoading={isLoading}
            onChange={onChange}
            isOptionDisabled={() => value.length >= 3}
            className="basic-multi-select"
            classNamePrefix="select"
            options={options}
          />
        </div>
      </div>
    </Fragment>
  );
}
