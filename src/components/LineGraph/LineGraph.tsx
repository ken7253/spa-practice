import React, { ReactNode } from "react";
import "./LineGraph.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  children?: ReactNode;
  showDataId?: (number | string)[];
}

const LineGraph: React.FC<Props> = (props: Props) => {
  const options: Highcharts.Options = {
    title: {
      text: "テスト",
    },
    series: [
      {
        name: "test",
        type: "line",
        data: [1, 2, 3],
      },
      {
        name: "test2",
        type: "line",
        data: [10, 5, 30],
      },
    ],
  };

  return (
    <>
      <div className="controller">{props.children}</div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default LineGraph;
