import React, { Fragment } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function SelectStocks(props) {
  const { value, isLoading, onChange, options } = props;
  return (
    <Fragment>
      <div className="row m-3">
        <div className="col-2">Stocks</div>
        <div className="col-4">
          <Select
            data-testid="stock-selector"
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
