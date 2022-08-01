import React, { ReactNode, useEffect, useState } from "react";
import "./LineGraph.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import type { Result } from "../../types/prefectures";

interface Response {
  label: string;
  data: {
    year: number;
    value: number;
  }[];
}

interface chartData {
  name: string;
  data: number[];
}

interface Props {
  children?: ReactNode;
  title?: string;
  showDataId?: (number | string)[];
  prefectures?: Result[];
}

const LineGraph: React.FC<Props> = (props: Props) => {
  const [graph, setGraph] = useState<chartData[]>();

  const options: Highcharts.Options = {
    title: {
      text: props.title,
    },
    series: graph?.map((population) => {
      return {
        name: population.name,
        type: "line",
        data: population.data,
      };
    }),
  };

  useEffect(() => {
    if (!props.showDataId) return;
    const requestURL =
      "http://localhost:8888/.netlify/functions/get-population";
    const APIData = props.showDataId?.map((value) => {
      return fetch(`${requestURL}?prefCode=${value}`);
    });

    const converter = async (): Promise<chartData[]> => {
      const fullResponse = await Promise.all(APIData);
      const jsonList = await Promise.all(
        fullResponse.map((value) => value.json())
      );
      const formed = jsonList.map((value: unknown) => {
        return {
          name: value.label,
          data: value.data.map((v) => v.value),
        };
      });

      return formed;
    };
    void converter().then((v) => {
      setGraph(v);
    });
  }, [props.showDataId]);

  return (
    <>
      <div className="controller">{props.children}</div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default LineGraph;
