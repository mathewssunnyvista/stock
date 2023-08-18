


export default function Placeholder(props) {
    const { data } = props;
  
    console.log(data, "data");
  
    return (
      <Fragment>
        <div class="row">
          <div class="col-12">
            {data?.datasets && <Line options={options} data={data} />}
          </div>
        </div>
      </Fragment>
    );
  }