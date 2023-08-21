import { isEmpty } from "lodash";
import { Fragment } from "react";
import { info_text } from "../../utils/constants";

export default function Info(props) {
  const { items } = props;

  let stocksWithNoData = !isEmpty(items)
    ? items.map((item) => item.label)
    : undefined;

  const message = stocksWithNoData
    ? stocksWithNoData.join(", ").toLowerCase()
    : undefined;

  // The Stock with no data info remain same if the userInteraction on Select/Price Type filter.
  // Date/Resolution Filter updats the stock data by triggering data API for the already selected stocks

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12 text-center text-black-50">
          {message && (
            <p>
              <small>{`"${message}" ${info_text}`}</small>
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
}
