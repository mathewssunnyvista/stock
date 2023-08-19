import { Fragment } from "react";

export default function Info(props) {
  const { items } = props;

  let stocksWithNoData = items.map((item) => item.label);

  const message = stocksWithNoData
    ? stocksWithNoData.join(", ").toLowerCase()
    : undefined;

  return (
    <Fragment>
      <div class="row">
        <div class="col-lg-12 text-center">
          {message && (
            <p>
              <small>{`${message} stocks are not considered in this chart`}</small>
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
}
