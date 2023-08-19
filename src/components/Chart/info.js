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

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12 text-center">
          {message && (
            <p>
              <small>{`${message} ${info_text}`}</small>
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
}
