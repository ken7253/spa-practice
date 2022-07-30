import React from "react";
import "./LineGraph.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineGraph: React.FC = () => {
  const options: Highcharts.Options = {
    title: {
      text: 'テスト',
    },
    series: [
      {
        name: "test",
        type: "line",
        data: [1, 2, 3]
      },
      {
        name: "test2",
        type: "line",
        data: [10, 5, 30],
      }
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default LineGraph;
