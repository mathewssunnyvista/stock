import React, { Fragment } from "react";
import { Stock,Chart } from "..";

export default function Dashboard() {
  return (
    <Fragment>
      <Stock />
      <Chart />
    </Fragment>
  );
}
